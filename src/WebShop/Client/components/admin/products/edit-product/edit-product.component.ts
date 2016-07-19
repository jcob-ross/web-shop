import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { ApiService, Product, Tag, Category, Manufacturer } from '../../../shared';
import { ProductEditorState } from '../shared';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

const fieldRules = {
  name: { minLength: 3, maxLength: 100 },
  description: { minLength: 3, maxLength: 200 },
  imageUrl: { maxLength: 2500 }
};

function categoryValidator(control: FormControl): {[n: number]: boolean} {
  if (control.value < 0) {
    return {invalidCategory: true};
  }
}

function manufacturerValidator(control: FormControl): {[n: number]: boolean} {
  if (control.value < 0) {
    return {invalidManufacturer: true};
  }
}

@Component({
  selector: 'j-edit-product',
  templateUrl: './edit-product.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES ]
})
export class EditProductComponent implements OnInit, OnDestroy {
  errors: string[];
  categories: Category[];
  manufacturers: Manufacturer[];
  productSub: Subscription;
  categoriesSub: Subscription;
  showConfirmDelete: boolean = false;

  product: Product;

  // view helper for error messages
  fieldRules = fieldRules;

  form: FormGroup;

  id: FormControl;
  name: FormControl;
  description: FormControl;
  stockCount: FormControl;
  price: FormControl;
  currentPrice: FormControl;
  productNumber: FormControl;
  imageUrl: FormControl;
  newProduct: FormControl;
  promoActive: FormControl;
  manufacturerId: FormControl;
  parentCategoryId: FormControl;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private editorState: ProductEditorState) {
  }

  private createForm(product?: Product) {
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
    this.stockCount = new FormControl(0, Validators.compose([Validators.required, Validators.pattern('[0-9]+')]));
    this.price = new FormControl(0, Validators.compose([Validators.required, Validators.pattern('[0-9]+')]));
    this.currentPrice = new FormControl(0, Validators.compose([Validators.required, Validators.pattern('[0-9]+')]));
    this.productNumber = new FormControl('will be assigned');
    this.imageUrl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(fieldRules.imageUrl.maxLength),
    ]));
    this.newProduct = new FormControl(false, Validators.required);
    this.promoActive = new FormControl(false, Validators.required);
    this.manufacturerId = new FormControl(-1, Validators.compose([Validators.required, manufacturerValidator]));
    this.parentCategoryId = new FormControl(-1, Validators.compose([Validators.required, categoryValidator]));

    if (product !== null && typeof product !== 'undefined') {
      this.product = product;
      this.id.updateValue(product.id);
      this.name.updateValue(product.name);
      this.description.updateValue(product.description);
      this.stockCount.updateValue(product.stockCount);
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
      'stockCount': this.stockCount,
      'price': this.price,
      'currentPrice': this.currentPrice,
      'productNumber': this.productNumber,
      'imageUrl': this.imageUrl,
      'newProduct': this.newProduct,
      'promoActive': this.promoActive,
      'manufacturerId': this.manufacturerId,
      'parentCategoryId': this.parentCategoryId
    });
  }

  onFormSubmit(formValue: Product) {
    let id = this.id.value;
    if (id > 0) { 
      // updating product
      this.api.updateProduct(formValue)
        .subscribe((res: any) => {
          let prod = res.json();          
          this.editorState.currentProduct = prod;
          let updatedProductIndex = this.editorState.searchResult.findIndex(p => p.id === id);
          this.editorState.searchResult.splice(updatedProductIndex, 1, prod);
        }, (err: any) => this.addErrors(err));

    } else { 
      // creating product
      this.api.createProduct(formValue)
        .subscribe((res: any) => {
          let prod = res.json();
          this.editorState.currentProduct = prod;
          this.createForm(prod)
        }, (err) => {
          this.addErrors(err);
        });
    }
  }

  onDeleteClick(id: number) {
    this.showConfirmDelete = true;    
  }

  onConfirmOk() {
    this.showConfirmDelete = false;
    let id = this.id.value;
    this.api.deleteProduct(id)
      .subscribe((res: any) => {        
        this.onClearFormClick();
        let deletedProductIndex = this.editorState.searchResult.findIndex(p => p.id === id);
        this.editorState.searchResult.splice(deletedProductIndex, 1);
      }, (err: any) => this.addErrors(err));
  }

  onConfirmCancel() {
    this.showConfirmDelete = false;    
  }

  onCategorySelect(category: Category) {
    this.parentCategoryId.updateValue(category.id);
    this.manufacturers = category.manufacturers;
    this.manufacturerId.updateValue(-1);
  }

  onManufacturerSelect(man: Manufacturer) {
    this.manufacturerId.updateValue(man.id);
  }

  onClearFormClick() {
    this.editorState.clearCurrentProduct();
    this.createForm();
    this.fetchCategories();
  }

  ngOnInit() {
    if (! this.editorState.hasProduct) {
      this.createForm();
      this.fetchCategories();
    } else {
      let product = this.editorState.currentProduct;
      this.createForm(product);
    }
  }

  ngOnDestroy() {
    if (this.productSub && this.productSub.unsubscribe) {
      this.productSub.unsubscribe();
    }
    if (this.categoriesSub && this.categoriesSub.unsubscribe) {
      this.categoriesSub.unsubscribe();
    }
  }

  private fetchCategories() {
    this.api.getCategories(/*include manufacturers*/true, /*include tags*/false)
      .subscribe((res: any) => {
        this.categories = res.json();
        this.manufacturers = [];
      }, (err: any) => {
        return this.addErrors(err);
      });
  }

  private addErrors(errorResponse: any) {
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