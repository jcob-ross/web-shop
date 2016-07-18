import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { ApiService } from '../../shared';
import { Subscription } from 'rxjs/Subscription';
import { Category, Tag } from '../../shared/models';

@Component({
  selector: 'j-tags',
  templateUrl: './tags.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES ]
})
export class TagsComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  errors: string[];

  categories: Category[] = null;
  selectedCategory: Category = null;
  selectedTag: Tag = null;

  form: FormGroup;

  id: FormControl;
  name: FormControl;
  urlSegment: FormControl;
  showInMainMenu: FormControl;
  parentCategoryId: FormControl;

  constructor(private api: ApiService, private fb: FormBuilder) {
  }

  onTagClick(category: Category, tag: Tag) {
    this.selectedTag = tag;
    this.selectedCategory = category;

    this.id = new FormControl(-1);
    this.name = new FormControl('', Validators.required);
    this.urlSegment = new FormControl('', Validators.required);
    this.showInMainMenu = new FormControl(false, Validators.required);
    this.parentCategoryId = new FormControl(category.id, Validators.required);

    if (tag !== null && typeof tag !== 'undefined') {
      this.id.updateValue(tag.id);
      this.name.updateValue(tag.name);
      this.urlSegment.updateValue(tag.urlSegment);
      this.showInMainMenu.updateValue(tag.showInMainMenu);
      this.parentCategoryId.updateValue(tag.parentCategoryId);
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
    this.onTagClick(category, null);
  }

  onFormSubmit(formValue) {
    console.log(formValue);
    if (formValue.id >= 0) {
      this.api.updateTag(formValue).subscribe((res: any) => {
        if (res.ok) {
          let updatedTag: Tag = res.json();
          let category = this.categories.find(c => c.id === updatedTag.parentCategoryId);
          let tagIndex = category.tags.findIndex(m => m.id === updatedTag.id);
          category.tags[tagIndex] = updatedTag;
          this.onTagClick(this.selectedCategory, updatedTag);
        }
      }, (err: any) => this.addErrors(err));
    } else {
      this.api.createTag(formValue).subscribe((res: any) => {
        if (res.ok) {
          let createdTag: Tag = res.json();
          let category = this.categories.find(c => c.id === createdTag.parentCategoryId);
          category.tags.push(createdTag);
          this.onTagClick(this.selectedCategory, createdTag);
        }
      }, (err: any) => this.addErrors(err));
    }
  }

  onDeleteClick(id: number) {
    this.api.deleteTag(id).subscribe((res: any) => {
      if (res.ok) {
        let idx = this.selectedCategory.tags.findIndex(t => t.id === id);
        this.selectedCategory.tags.splice(idx, 1);
        this.selectedCategory = null;
        this.selectedTag = null;
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
    this.sub = this.api.getCategories(/* include manufacturers */false, /* include tags */true)
      .map(res => res.json())
      .subscribe(res => {
        this.categories = res;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}