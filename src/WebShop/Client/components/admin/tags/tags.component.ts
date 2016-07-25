import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from 'ng-semantic';

import { Subscription } from 'rxjs/Subscription';
import { ApiService, Category, Tag } from '../../shared';

const fieldRules = {
  name: { minLength: 3, maxLength: 50 },
  urlSegment: { minLength: 3, maxLength: 50 }
};

@Component({
  selector: 'j-tags',
  templateUrl: './tags.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES, SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES ]
})
export class TagsComponent implements OnInit, OnDestroy {
  private xhrSub: Subscription;
  private xhrNotificationTimeoutHandle = null;
  xhrNotificationVisible: boolean = false;
  xhrSucceeded: boolean = true;
  xhrNotificationMessage: string = '';
  xhrPending: boolean = false;

  categories: Category[] = null;
  selectedCategory: Category = null;
  selectedTag: Tag = null;
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

  onTagClick(category: Category, tag: Tag) {
    this.selectedTag = tag;
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

  onNewTagClick(category: Category) {
    this.onTagClick(category, null);
  }

  onFormSubmit(formValue) {
    this.ensureXhrCancelled();    
    this.xhrPending = true;

    if (formValue.id >= 0) {
      this.xhrSub = this.api.updateTag(formValue).subscribe((res: any) => {
        let updatedTag: Tag = res.json();
        let category = this.categories.find(c => c.id === updatedTag.parentCategoryId);
        let tagIndex = category.tags.findIndex(m => m.id === updatedTag.id);
        category.tags[tagIndex] = updatedTag;
        this.onTagClick(this.selectedCategory, updatedTag);
        this.xhrPending = false;
        this.notifyCompleted('Tag updated');
      }, (err: any) => {
        this.notifyCompleted('Failed to update tag', false);
        this.addErrors(err);
      });
    } else {
      this.xhrSub = this.api.createTag(formValue).subscribe((res: any) => {
        let createdTag: Tag = res.json();
        let category = this.categories.find(c => c.id === createdTag.parentCategoryId);
        category.tags.push(createdTag);
        this.onTagClick(this.selectedCategory, createdTag);
        this.xhrPending = false;
        this.notifyCompleted('Tag created');

      }, (err: any) => {
        this.notifyCompleted('Failed to create tag', false);
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

    this.xhrSub = this.api.deleteTag(id).subscribe((res: any) => {
      let idx = this.selectedCategory.tags.findIndex(t => t.id === id);
      this.selectedCategory.tags.splice(idx, 1);
      this.selectedCategory = null;
      this.selectedTag = null;
      this.form = null;
      this.xhrPending = false;
      this.notifyCompleted('Tag deleted');
    }, (err: any) => {
      this.notifyCompleted('Failed to delete tag', false);
      this.addErrors(err);
    });
  }

  onConfirmDeleteCancel() {
    this.showConfirmDelete = false;
  }

  ngOnInit() {
    this.xhrPending = true;
    this.xhrSub = this.api.getCategories(/* include manufacturers */false, /* include tags */true)
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