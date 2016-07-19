import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';

import { ApiService, Product, Category, Tag, Manufacturer } from '../../../shared';
import { ProductEditorState } from '../shared';

@Component({
  selector: 'j-search',
  templateUrl: './product-search.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES ]
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  searchSub: Subscription;
  errors: string[];
  products: Product[];

  form: FormGroup;
  term: FormControl;

  constructor(private api: ApiService,
              private fb: FormBuilder,
              private editorState: ProductEditorState,
              private router: Router) {
  }

  searching: boolean = false;
  maxResults: number = 20;
  maxLength: number = 30;
  minLength: number = 3;
  debounceTimeMs: number = 400;
  private createForm() {
    this.searching = false;
    this.term = new FormControl('', Validators.compose([Validators.minLength(this.minLength), Validators.maxLength(this.maxLength)]));
    this.form = this.fb.group({
      'term': this.term
    });
    this.searchSub = this.term.valueChanges
      .map((term: string) => term.trim())
      .filter(term => term.length >= this.minLength && term.length <= this.maxLength)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .debounceTime(this.debounceTimeMs)
      .switchMap(term => this.api.searchProducts(term, this.maxResults))
      .do(() => this.searching = false)
      .subscribe((res: any) => {
        this.products = res.json();
      }, (err: any) => this.addErrors(err));
  }

  onProductClick(product: Product) {
    this.editorState.currentProduct = product;
  }

  onLinkClick(route: string, product: Product) {
    this.editorState.currentProduct = product;
    this.router.navigateByUrl(route);
  }

  ngOnInit() {
    this.createForm();
    if (this.editorState.searchResult && this.editorState.searchResult.length > 0) {
      this.products = this.editorState.searchResult;
    }
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
    this.editorState.searchResult = this.products;
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
}