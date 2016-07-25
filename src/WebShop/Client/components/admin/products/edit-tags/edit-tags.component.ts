import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { ApiService, Product, Tag, Category } from '../../../shared';
import { AdminAppState } from '../../shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'j-tags',
  templateUrl: './edit-tags.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES ]
})
export class EditTagsComponent implements OnInit, OnDestroy {
  private tagsSub: Subscription;
  errors: string[];
  product: Product;
  availableTags: Tag[];
  assignedTags: Tag[];

  constructor(private api: ApiService, private appState: AdminAppState) {
  }

  ngOnInit() {
    this.product = this.appState.currentProduct;
    this.assignedTags = this.product.tags;

    this.tagsSub = this.api.getCategoryTags(this.product.parentCategoryId)
      .subscribe((res: any) => {
        this.availableTags = res.json();
        this.availableTags.map(t => {
          // mark already added tags as added for css
          let currentTag = this.assignedTags.find(at => at.id === t.id);
          if (typeof currentTag !== 'undefined') {
            t.added = true;
          }
          return t;
        });
      }, (err: any) => this.addErrors(err));
  }
  
  ngOnDestroy() {
    this.tagsSub.unsubscribe();
    if (this.addTagSub !== null) {
      this.addTagSub.unsubscribe();
      this.addTagSub = null;
    }
    if (this.removeTagSub !== null) {
      this.removeTagSub.unsubscribe();
      this.removeTagSub = null;
    }
  }

  addTagSub: Subscription = null;
  addTag(tag: Tag) {
    if (tag.added) {
      return;
    }
    if (this.addTagSub !== null) {
      this.addTagSub.unsubscribe();
    }
    this.addTagSub = this.api.addTagToProduct(this.product.id, tag.id)
      .subscribe((res: any) => {
        tag.added = true;
        this.appState.currentProduct.tags.push(tag);
        this.product = this.appState.currentProduct;
      }, (err: any) => this.addErrors(err))
  }

  removeTagSub: Subscription = null;
  removeTag(tag: Tag) {
    if (this.removeTagSub !== null) {
      this.removeTagSub.unsubscribe();
    }
    this.removeTagSub = this.api.removeTagFromProduct(this.product.id, tag.id)
      .subscribe((res: any) => {
        let tagIndex = this.appState.currentProduct.tags.findIndex(t => t.id === tag.id);
        let availableTagIndex = this.availableTags.findIndex(t => t.id === tag.id);
        this.availableTags[availableTagIndex].added = false;
        this.appState.currentProduct.tags.splice(tagIndex, 1);
        this.product = this.appState.currentProduct;
      }, (err: any) => this.addErrors(err))
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
}