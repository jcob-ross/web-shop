import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { ApiService } from '../../shared';
import { Subscription } from 'rxjs/Subscription';
import { Category, Manufacturer } from '../../shared/models';

@Component({
  selector: 'j-manufacturers',
  templateUrl: './manufacturers.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES ]
})
export class ManufacturersComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  errors: string[];

  categories: Category[] = null;
  selectedCategory: Category = null;
  selectedManufacturer: Manufacturer = null;

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
    this.name = new FormControl('', Validators.required);
    this.urlSegment = new FormControl('', Validators.required);
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

  onCategoryClick(category: Category) {
    this.onManufacturerClick(category, null);
  }

  onFormSubmit(formValue) {
    if (formValue.id >= 0) {
      this.api.updateManufacturer(formValue).subscribe((res: any) => {
        if (res.ok) {
          let updatedManufacturer: Manufacturer = res.json();
          let category = this.categories.find(c => c.id === updatedManufacturer.parentCategoryId);
          let manufacturerIndex = category.manufacturers.findIndex(m => m.id === updatedManufacturer.id);
          category.manufacturers[manufacturerIndex] = updatedManufacturer;
          this.onManufacturerClick(this.selectedCategory, updatedManufacturer);
        }
      }, (err: any) => this.addErrors(err));
    } else {
      this.api.createManufacturer(formValue).subscribe((res: any) => {
        if (res.ok) {
          let createdManufacturer: Manufacturer = res.json();
          let category = this.categories.find(c => c.id === createdManufacturer.parentCategoryId);
          category.manufacturers.push(createdManufacturer);
          this.onManufacturerClick(this.selectedCategory, createdManufacturer);
        }
      }, (err: any) => this.addErrors(err));
    }
  }

  onDeleteClick(id: number) {
    this.api.deleteManufacturer(id).subscribe((res: any) => {
      if (res.ok) {
        let idx = this.selectedCategory.manufacturers.findIndex(m => m.id === id);
        this.selectedCategory.manufacturers.splice(idx, 1);
        this.selectedCategory = null;
        this.selectedManufacturer = null;
        this.form = null;
      }
    }, (err: any) => this.addErrors(err));
  }

  addErrors(errorResponse) {
    this.errors = [];
    console.warn(errorResponse);
    for (let prop in errorResponse) {
      if (errorResponse.hasOwnProperty(prop)) {
        this.errors.push(errorResponse[prop]);
      }
    }
  }

  clearErrors(index: number) {
    if (typeof index === 'undefined') {
      this.errors = [];
    } else {
      this.errors.splice(index, 1);
    }
  }

  ngOnInit() {
    this.sub = this.api.getCategories(/* include manufacturers */true, /* include tags */false)
      .map(res => res.json())
      .subscribe(res => {
        this.categories = res;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}