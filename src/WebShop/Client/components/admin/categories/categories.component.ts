import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Response } from '@angular/http';

import { Subscription } from 'rxjs/Subscription';

import { ApiService, Category } from '../../shared';

@Component({
  selector: 'j-categories',
  templateUrl: './categories.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES ]
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  errors: string[];

  categories: Category[];
  selectedCategory: Category;

  form: FormGroup;

  id: FormControl;
  name: FormControl;
  urlSegment: FormControl;
  imageUrl: FormControl;
  viewDisplayOrder: FormControl;


  constructor(private api: ApiService, private fb: FormBuilder) {
  }

  onCategoryClick(category: Category) {
    this.selectedCategory = category;

    this.id = new FormControl(-1);
    this.name = new FormControl('', Validators.required);
    this.urlSegment = new FormControl('', Validators.required);
    this.imageUrl = new FormControl('', Validators.required);
    this.viewDisplayOrder = new FormControl('', Validators.compose([Validators.required, Validators.pattern('[-]?[0-9]+')]));

    if (category !== null && typeof category !== 'undefined') {
      this.id.updateValue(category.id);
      this.name.updateValue(category.name);
      this.urlSegment.updateValue(category.urlSegment);
      this.imageUrl.updateValue(category.imageUrl);
      this.viewDisplayOrder.updateValue(category.viewDisplayOrder);
    }

    this.form = this.fb.group({
      'id': this.id,
      'name': this.name,
      'urlSegment': this.urlSegment,
      'imageUrl': this.imageUrl,
      'viewDisplayOrder': this.viewDisplayOrder
    });
  }

  onFormSubmit(formValue) {
    if (formValue.id >=0) {
      this.api.updateCategory(formValue).subscribe((res: any) => {
        if (res.ok) {
          let updatedCategory: Category = res.json();
          let categoryIndex = this.categories.findIndex(c => c.id === updatedCategory.id);
          this.categories[categoryIndex] = updatedCategory;
          this.onCategoryClick(this.categories[categoryIndex]);
        }
      }, (err: any) => this.addErrors(err));
    } else {
      this.api.createCategory(formValue).subscribe((res: Response) => {
        if (res.ok) {
          this.categories.push(res.json());
          this.onCategoryClick(this.categories[this.categories.length - 1]);
        }
      }, (err: any) => this.addErrors(err));
    }
  }

  onDeleteClick(id: number) {
    this.api.deleteCategory(id).subscribe((res: Response) => {
      if (res.ok) {
        this.categories.splice(this.categories.findIndex(c => c.id === id), 1);
        this.selectedCategory = null;
        this.form = null;
      }
      console.log(res);
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
    this.sub = this.api.getCategories(/* include manufacturers */false, /* include tags */false)
      .subscribe((res: Response) => {
        this.categories = res.json();
      }, (err: any) => {
        this.addErrors(err);
      });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}