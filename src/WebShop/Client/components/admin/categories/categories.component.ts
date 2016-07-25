import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from 'ng-semantic';

import { ApiService, Category } from '../../shared';

const fieldRules = {
  name: { minLength: 3, maxLength: 50 },
  urlSegment: { minLength: 3, maxLength: 50 },
  imageUrl: { maxLength: 10000 }
};

@Component({
  selector: 'j-categories',
  templateUrl: './categories.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES, SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES ],
  encapsulation: ViewEncapsulation.None,
  styles : [`
    img.ui.avatar.image { 
      border-radius: 0.25rem !important;
      -moz-border-radius: 0.25rem !important;
      -webkit-border-radius: 0.25rem !important;
    }
  `]
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private xhrSub: Subscription;
  private xhrNotificationTimeoutHandle = null;
  xhrNotificationVisible: boolean = false;
  xhrSucceeded: boolean = true;
  xhrNotificationMessage: string = '';
  xhrPending: boolean = false;

  categories: Category[];
  selectedCategory: Category;
  showConfirmDelete: boolean = false;

  // view helper for error messages
  fieldRules = fieldRules;

  form: FormGroup;

  id: FormControl;
  name: FormControl;
  urlSegment: FormControl;
  imageUrl: FormControl;
  viewDisplayOrder: FormControl;


  constructor(private api: ApiService, private fb: FormBuilder) {
  }

  onCreateNewCategory() {
    this.onCategoryClick(null);
  }

  onCategoryClick(category: Category) {
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
    this.imageUrl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(fieldRules.imageUrl.maxLength),
    ]));
    this.viewDisplayOrder = new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('[0-9]+')
    ]));

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
    this.ensureXhrCancelled();
    this.xhrPending = true;
    if (formValue.id >=0) {
      this.xhrSub = this.api.updateCategory(formValue).subscribe((res: any) => {
        let updatedCategory: Category = res.json();
        let categoryIndex = this.categories.findIndex(c => c.id === updatedCategory.id);
        this.categories[categoryIndex] = updatedCategory;
        this.onCategoryClick(this.categories[categoryIndex]);
        this.xhrPending = false;
        this.notifyCompleted('Category created');
      }, (err: any) => {
        this.notifyCompleted('Failed to create category', false);
        this.addErrors(err);
      });
    } else {
      this.xhrSub = this.api.createCategory(formValue).subscribe((res: Response) => {
        this.categories.push(res.json());
        this.onCategoryClick(this.categories[this.categories.length - 1]);
        this.xhrPending = false;
        this.notifyCompleted('Category updated');
      }, (err: any) => {
        this.notifyCompleted('Failed to update category', false);
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

    this.xhrSub = this.api.deleteCategory(id).subscribe((res: Response) => {
      this.categories.splice(this.categories.findIndex(c => c.id === id), 1);
      this.selectedCategory = null;
      this.form = null;
      this.xhrPending = false;
      this.notifyCompleted('Category deleted');
      this.onCategoryClick(null);
    }, (err: any) => {
      this.notifyCompleted('Failed to delete category', false);
      this.addErrors(err);
    });
  }

  onConfirmDeleteCancel() {
    this.showConfirmDelete = false;
  }

  ngOnInit() {
    this.xhrPending = true;
    this.xhrSub = this.api.getCategories(/* include manufacturers */false, /* include tags */false)
      .subscribe((res: Response) => {
        this.categories = res.json();
        this.xhrPending = false;
      }, (err: any) => {
        this.addErrors(err);
      });
  }

  ngOnDestroy() {
    if (this.xhrSub && !this.xhrSub.isUnsubscribed) {
      this.xhrSub.unsubscribe();
    }
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