import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from 'ng-semantic';

import { Subscription } from 'rxjs/Subscription';

import { ApiService, Category, Manufacturer } from '../../shared';


const fieldRules = {
  name: { minLength: 3, maxLength: 50 },
  urlSegment: { minLength: 3, maxLength: 50 }
};

@Component({
  selector: 'j-manufacturers',
  templateUrl: './manufacturers.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES, SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES ]
})
export class ManufacturersComponent implements OnInit, OnDestroy {
  private xhrSub: Subscription;
  private xhrNotificationTimeoutHandle = null;
  xhrNotificationVisible: boolean = false;
  xhrSucceeded: boolean = true;
  xhrNotificationMessage: string = '';
  xhrPending: boolean = false;

  categories: Category[] = null;
  selectedCategory: Category = null;
  selectedManufacturer: Manufacturer = null;
  showConfirmDelete: boolean = false;

  // view helper for error messages
  fieldRules = fieldRules;

  form: FormGroup;

  id: FormControl;
  name: FormControl;
  urlSegment: FormControl;
  showInMainMenu: FormControl;
  parentCategoryId: FormControl;

  constructor(private api: ApiService, private fb: FormBuilder) {
  }

  onManufacturerClick(category: Category, manufacturer: Manufacturer) {
    this.selectedManufacturer = manufacturer;
    this.selectedCategory = category;

    this.id = new FormControl(-1);
    this.name = new FormControl('', Validators.compose([
      Validators.required, 
      Validators.minLength(fieldRules.name.minLength),
      Validators.maxLength(fieldRules.name.maxLength),
    ]));
    this.urlSegment = new FormControl('', Validators.compose([
      Validators.required, 
      Validators.minLength(fieldRules.urlSegment.minLength),
      Validators.maxLength(fieldRules.urlSegment.maxLength),
    ]));
    this.showInMainMenu = new FormControl(false, Validators.required);
    this.parentCategoryId = new FormControl(category.id, Validators.required);

    if (manufacturer !== null && typeof manufacturer !== 'undefined') {
      this.id.updateValue(manufacturer.id);
      this.name.updateValue(manufacturer.name);
      this.urlSegment.updateValue(manufacturer.urlSegment);
      this.showInMainMenu.updateValue(manufacturer.showInMainMenu);
      this.parentCategoryId.updateValue(manufacturer.parentCategoryId);
    }

    this.form = this.fb.group({
      'id': this.id,
      'name': this.name,
      'urlSegment': this.urlSegment,
      'showInMainMenu': this.showInMainMenu,
      'parentCategoryId': this.parentCategoryId,
    });
  }

  onNewManufacturerClick(category: Category) {
    this.onManufacturerClick(category, null);
  }

  onFormSubmit(formValue) {
    this.ensureXhrCancelled();    
    this.xhrPending = true;

    if (formValue.id >= 0) {
      this.xhrSub = this.api.updateManufacturer(formValue).subscribe((res: any) => {
        let updatedManufacturer: Manufacturer = res.json();
        let category = this.categories.find(c => c.id === updatedManufacturer.parentCategoryId);
        let manufacturerIndex = category.manufacturers.findIndex(m => m.id === updatedManufacturer.id);
        category.manufacturers[manufacturerIndex] = updatedManufacturer;
        this.onManufacturerClick(this.selectedCategory, updatedManufacturer);
        this.xhrPending = false;
        this.notifyCompleted('Manufacturer updated');
      }, (err: any) => {
        this.notifyCompleted('Failed to update manufacturer', false);
        this.addErrors(err);
      });
    } else {
      this.xhrSub = this.api.createManufacturer(formValue).subscribe((res: any) => {
        let createdManufacturer: Manufacturer = res.json();
        let category = this.categories.find(c => c.id === createdManufacturer.parentCategoryId);
        category.manufacturers.push(createdManufacturer);
        this.onManufacturerClick(this.selectedCategory, createdManufacturer);
        this.xhrPending = false;
        this.notifyCompleted('Manufacturer created');
      }, (err: any) => {
        this.notifyCompleted('Failed to create manufacturer', false);
        this.addErrors(err);
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

    this.xhrSub = this.api.deleteManufacturer(id).subscribe((res: any) => {
      let idx = this.selectedCategory.manufacturers.findIndex(m => m.id === id);
      this.selectedCategory.manufacturers.splice(idx, 1);
      this.selectedCategory = null;
      this.selectedManufacturer = null;
      this.form = null;
      this.xhrPending = false;
      this.notifyCompleted('Manufacturer deleted');
    }, (err: any) => {
      this.notifyCompleted('Failed to delete manufacturer', false);
      this.addErrors(err);
    });
  }

  onConfirmDeleteCancel() {
    this.showConfirmDelete = false;
  }

  ngOnInit() {
    this.xhrPending = true;
    this.xhrSub = this.api.getCategories(/* include manufacturers */true, /* include tags */false)
      .map(res => res.json())
      .subscribe(res => {
        this.categories = res;
        this.xhrPending = false;
      }, (err: any) => this.addErrors(err));
  }

  ngOnDestroy() {
    this.ensureXhrCancelled();
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

  private addErrors(errorResponse) {
    console.warn(errorResponse);
    this.xhrPending = false;
  }
}