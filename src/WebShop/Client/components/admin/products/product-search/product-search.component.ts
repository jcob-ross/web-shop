import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from 'ng-semantic';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';

import { ApiService, Product, Category, Tag, Manufacturer } from '../../../shared';
import { AdminAppState } from '../../shared';

@Component({
  selector: 'j-search',
  templateUrl: './product-search.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES ]
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  private searchSub: Subscription;
  errors: string[];
  products: Product[] = [];

  form: FormGroup;
  term: FormControl;

  xhrPending: boolean = false;

  constructor(private api: ApiService,
              private fb: FormBuilder,
              private appState: AdminAppState,
              private router: Router) {
  }

  maxResults: number = 20;
  maxLength: number = 30;
  minLength: number = 3;
  debounceTimeMs: number = 400;
  private createForm() {
    this.xhrPending = false;
    this.term = new FormControl('', Validators.compose([
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength)
    ]));
    this.form = this.fb.group({
      'term': this.term
    });
    this.searchSub = this.term.valueChanges
      .map((term: string) => term.trim())
      .filter(term => term.length >= this.minLength && term.length <= this.maxLength)
      .distinctUntilChanged()
      .debounceTime(this.debounceTimeMs)
      .do(() => this.xhrPending = true)
      .switchMap(term => this.api.searchProducts(term, this.maxResults))
      .subscribe((res: any) => {
        this.products = res.json();
        this.xhrPending = false;
      }, (err: any) => this.addErrors(err));
  }

  onProductClick(product: Product) {
    this.appState.currentProduct = product;
  }

  onLinkClick(route: string, product: Product) {
    this.appState.currentProduct = product;
    this.router.navigateByUrl(route);
  }

  ngOnInit() {
    this.xhrPending = false;
    this.createForm();
    if (this.appState.productSearchResult && this.appState.productSearchResult.length > 0) {
      this.products = this.appState.productSearchResult;
    }
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
    if (this.products.constructor === Array && this.products.length > 0) {
      this.appState.productSearchResult = this.products;
    }
  }

  addErrors(errorResponse) {
    this.xhrPending = false;
    this.errors = [];
    console.warn(errorResponse);
  }
}