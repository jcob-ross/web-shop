import { Injectable } from '@angular/core';
import { Product } from '../../shared';

@Injectable()
export class AdminAppState {
  productSearchResult: Product[] = [];
  private _currentProduct: Product = null;

  clearCurrentProduct(): void {
    this._currentProduct = null;
  }

  clearProductSearchResult(): void {
    this.productSearchResult = [];
  }

  get currentProduct(): Product {
    return this._currentProduct;
  }

  set currentProduct(item: Product) {
    this._currentProduct = item;
  }

  get productSelected(): boolean {
    return this._currentProduct && Number.isInteger(+this._currentProduct.id);
  }
}
