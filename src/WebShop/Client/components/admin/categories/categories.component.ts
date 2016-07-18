import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FORM_DIRECTIVES, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { ApiService } from '../../shared';
import { Subscription } from 'rxjs/Subscription';
import { Category } from '../../shared/models';

@Component({
  selector: 'j-categories',
  templateUrl: './categories.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES ]
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  form: FormGroup;
  name: FormControl;

  categories: Category[];
  selectedCategory: Category;

  constructor(private api: ApiService, private fb: FormBuilder) {
  }

  onCategoryClick(item: Category) {
    this.selectedCategory = item;
  }

  onNewCategoryClick(category?: Category) {
    this.name = new FormControl('-', Validators.required);
    if (category !== null && typeof category !== 'undefined') {
      this.name.updateValue(category.name);
    }
    this.form = this.fb.group({
      'name': this.name
    });
  }

  onFormSubmit(formValue) {
    console.log(formValue);
  }

  ngOnInit() {
    this.sub = this.api.getCategories(/* include manufacturers */true, /* include tags */true)
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
        this.categories = res;
      });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}