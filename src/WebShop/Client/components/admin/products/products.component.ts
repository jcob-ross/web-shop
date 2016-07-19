import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ProductEditorState } from './shared';

@Component({
  selector: 'j-products',
  templateUrl: './products.component.html',
  directives: [ ROUTER_DIRECTIVES ]
})
export class ProductsComponent implements OnInit {
  constructor(private editorState: ProductEditorState) {
  }

  get noProductSelected(): boolean {
    return !this.editorState.hasProduct && this.editorState.isNewProduct;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.editorState.clearCurrentProduct();
    this.editorState.clearSearchResult();
  }
}