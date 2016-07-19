import { Injectable } from '@angular/core';
import { Product } from '../../../shared';

@Injectable()
export class ProductEditorState {
  searchResult: Product[] = [];
  private _currentProduct: Product = null;

  clearCurrentProduct(): void {
    this._currentProduct = null;
  }

  clearSearchResult(): void {
    this.searchResult = [];
  }

  get currentProduct(): Product {
    return this._currentProduct;
  }

  set currentProduct(item: Product) {
    this._currentProduct = item;
  }

  get isNewProduct(): boolean {
    if (this.currentProduct === null) {
      return true;
    }
    return this.currentProduct.id < 0;
  }

  get hasProduct(): boolean {
    return this.currentProduct !== null;
  }
}