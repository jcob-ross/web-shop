import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from 'ng-semantic';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/Observable/of';
import 'rxjs/add/Observable/throw';
import 'rxjs/add/operator/catch';

import { ApiService, Product, Tag, Category, Manufacturer } from '../../../shared';
import { AdminAppState } from '../../shared';

/**
 * Form validation helper
 */
const fieldRules = {
  name: { minLength: 3, maxLength: 100 },
  description: { minLength: 3, maxLength: 200 },
  imageUrl: { maxLength: 2500 }
};

/**
 * Category form control validation helper
 */
function categoryValidator(control: FormControl): {[n: number]: boolean} {
  if (control.value < 0) {
    return { invalidCategory: true };
  }
}

/**
 * Manufacturer form control validation helper
 */
function manufacturerValidator(control: FormControl): {[n: number]: boolean} {
  if (control.value < 0) {
    return { invalidManufacturer: true };
  }
}

@Component({
  selector: 'j-edit-product',
  templateUrl: './edit-product.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES, SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES ]
})
export class EditProductComponent implements OnInit, OnDestroy {
  private xhrSub: Subscription;
  private xhrNotificationTimeoutHandle = null;
  xhrNotificationVisible: boolean = false;
  xhrSucceeded: boolean = true;
  xhrNotificationMessage: string = '';
  xhrPending: boolean = false;

  errors: string[];
  categories: Category[];
  manufacturers: Manufacturer[];
  productSub: Subscription;
  categoriesSub: Subscription;
  showConfirmDelete: boolean = false;

  product: Product;

  // view helper for validation error messages
  fieldRules = fieldRules;

  form: FormGroup;

  id: FormControl;
  name: FormControl;
  description: FormControl;
  stockQuantity: FormControl;
  price: FormControl;
  currentPrice: FormControl;
  productNumber: FormControl;
  imageUrl: FormControl;
  newProduct: FormControl;
  promoActive: FormControl;
  manufacturerId: FormControl; // todo: manufacturer select element
  parentCategoryId: FormControl;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private appState: AdminAppState) {
  }

  private createForm(product?: Product) {
    this.showConfirmDelete = false;
    this.product = null;
    this.id = new FormControl(-1);
    this.name = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(fieldRules.name.minLength),
      Validators.maxLength(fieldRules.name.maxLength)
    ]));
    this.description = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(fieldRules.description.minLength),
      Validators.maxLength(fieldRules.description.maxLength)
    ]));
    this.stockQuantity = new FormControl(0, Validators.compose([Validators.required, Validators.pattern('[0-9]+')]));
    this.price = new FormControl(0, Validators.compose([Validators.required, Validators.pattern('[0-9]+')]));
    this.currentPrice = new FormControl(0, Validators.compose([Validators.required, Validators.pattern('[0-9]+')]));
    this.productNumber = new FormControl('will be assigned');
    this.imageUrl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(fieldRules.imageUrl.maxLength),
    ]));
    this.newProduct = new FormControl(false);
    this.promoActive = new FormControl(false);
    this.manufacturerId = new FormControl(-1, Validators.compose([Validators.required, manufacturerValidator]));
    this.parentCategoryId = new FormControl(-1, Validators.compose([Validators.required, categoryValidator]));

    if (product !== null && typeof product !== 'undefined') {
      this.product = product;
      this.id.updateValue(product.id);
      this.name.updateValue(product.name);
      this.description.updateValue(product.description);
      this.stockQuantity.updateValue(product.stockCount);
      this.price.updateValue(product.price);
      this.currentPrice.updateValue(product.currentPrice);
      this.productNumber.updateValue(product.productNumber);
      this.imageUrl.updateValue(product.imageUrl);
      this.newProduct.updateValue(product.newProduct);
      this.promoActive.updateValue(product.promoActive);
      this.manufacturerId.updateValue(product.manufacturerId);
      this.parentCategoryId.updateValue(product.parentCategoryId);
    }

    this.form = this.fb.group({
      'id': this.id,
      'name': this.name,
      'description': this.description,
      'stockCount': this.stockQuantity,
      'price': this.price,
      'currentPrice': this.currentPrice,
      'productNumber': this.productNumber,
      'imageUrl': this.imageUrl,
      'newProduct': this.newProduct,
      'promoActive': this.promoActive,
      'manufacturerId': this.manufacturerId,
      'parentCategoryId': this.parentCategoryId,
    });
  }

  onFormSubmit(formValue: Product) {
    this.ensureXhrCancelled();
    this.showConfirmDelete = false;
    this.xhrPending = true;    
    let id = this.id.value;

    if (id > 0) { 
      // updating product
      this.xhrSub = this.api.updateProduct(formValue)
        .subscribe((res: any) => {
          let prod = res.json();
          this.product = prod;
          this.appState.currentProduct = prod;
          let updatedProductIndex = this.appState.productSearchResult.findIndex(p => p.id === id);
          this.appState.productSearchResult.splice(updatedProductIndex, 1, prod);          
          this.xhrPending = false;
          this.notifyCompleted('Product updated');
        }, (err: any) => {
          this.addErrors(err);
          this.notifyCompleted('Failed to update product', false, 4000);
        });

    } else { 
      // creating product
      this.xhrSub = this.api.createProduct(formValue)
        .subscribe((res: any) => {
          let prod = res.json();
          this.appState.currentProduct = prod;
          this.createForm(prod);
          this.xhrPending = false;
          this.notifyCompleted('Product created');
        }, (err) => {
          this.addErrors(err);
          this.notifyCompleted('Failed to create product', false, 4000);
        });
    }
  }

  onDeleteClick() {
    this.showConfirmDelete = true;
  }

  onConfirmDeleteOk() {
    this.ensureXhrCancelled();
    this.xhrPending = true;
    this.showConfirmDelete = false;
    let id = this.id.value;

    this.xhrSub = this.api.deleteProduct(id)
      .subscribe((res: any) => {
        this.onClearFormClick();
        let deletedProductIndex = this.appState.productSearchResult.findIndex(p => p.id === id);
        this.appState.productSearchResult.splice(deletedProductIndex, 1);
        this.xhrPending = false;
        this.notifyCompleted('Product deleted');
      }, (err: any) => {
        this.notifyCompleted('Failed to delete product', false);
        this.addErrors(err);
      });
  }

  onConfirmDeleteCancel() {
    this.showConfirmDelete = false;
  }

  onCategorySelect(category: Category) {
    if (category.id === this.parentCategoryId.value || category.manufacturers.length < 1) { return; }
    this.parentCategoryId.updateValue(category.id);
    this.manufacturers = category.manufacturers;
    this.manufacturerId.updateValue(-1);
  }

  onManufacturerSelect(man: Manufacturer) {
    this.manufacturerId.updateValue(man.id);
  }

  onClearFormClick() {
    this.appState.clearCurrentProduct();
    this.createForm();
    this.fetchCategories();
    this.notifyCompleted('Form cleared');
  }

  ngOnInit() {
    if (! this.appState.productSelected) {
      this.createForm();
      this.fetchCategories();
    } else {
      this.createForm(this.appState.currentProduct);
    }
  }

  ngOnDestroy() {
    if (this.productSub && this.productSub.unsubscribe) {
      this.productSub.unsubscribe();
    }
    if (this.categoriesSub && this.categoriesSub.unsubscribe) {
      this.categoriesSub.unsubscribe();
    }
    if (this.xhrNotificationTimeoutHandle) { 
      clearTimeout(this.xhrNotificationTimeoutHandle);
      this.xhrNotificationTimeoutHandle = null;
    }
  }

  private fetchCategories() {
    this.ensureXhrCancelled();
    this.xhrSub = this.api.getCategories(/*include manufacturers*/true, /*include tags*/false)
      .subscribe((res: any) => {
        this.categories = res.json();
        this.manufacturers = [];
      }, (err: any) => {
        return this.addErrors(err);
      });
  }

  private notifyCompleted(message: string, success: boolean = true, durationMs: number = 2500) {
    this.xhrNotificationVisible = true;
    this.xhrSucceeded = success;
    this.xhrNotificationMessage = message;

    if (this.xhrNotificationTimeoutHandle) { 
      clearTimeout(this.xhrNotificationTimeoutHandle);
      this.xhrNotificationTimeoutHandle = null;
    }
    this.xhrNotificationTimeoutHandle = setTimeout(() => {
        this.xhrNotificationVisible = false;
      }, durationMs);
  }

  private ensureXhrCancelled() {
    if (this.xhrSub && this.xhrSub.unsubscribe && !this.xhrSub.isUnsubscribed) {
      this.xhrSub.unsubscribe();
    }
  }

  private addErrors(errorResponse: any) {
    this.xhrPending = false;

    this.errors = [];
    if (errorResponse.constructor === Array) {
      this.errors = errorResponse;
      return;
    }

    for (let prop in errorResponse) {
      if (errorResponse.hasOwnProperty(prop)) {
        this.errors.push(errorResponse[prop]);
      }
    }
  }
}