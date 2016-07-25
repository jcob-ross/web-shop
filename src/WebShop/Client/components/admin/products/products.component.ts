import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AdminAppState } from '../shared';

@Component({
  selector: 'j-products',
  templateUrl: './products.component.html',
  directives: [ ROUTER_DIRECTIVES ]
})
export class ProductsComponent implements OnInit, OnDestroy {
  constructor(private appState: AdminAppState) {
  }

  get noneOrNonexistentProduct(): boolean {
    return !this.appState.productSelected || this.appState.currentProduct.id < 0;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.appState.clearCurrentProduct();
    this.appState.clearProductSearchResult();
  }
}
