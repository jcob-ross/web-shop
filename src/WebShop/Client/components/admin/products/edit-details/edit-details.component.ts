import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ApiService, Product, ProductDetail } from '../../../shared';
import { AdminAppState } from '../../shared';
import { AutoAdjustTextareaDirective } from './textarea-auto-adjust.directive';

@Component({
  selector: 'j-details',
  templateUrl: './edit-details.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES, AutoAdjustTextareaDirective ]
})
export class EditDetailsComponent implements OnInit, OnDestroy {
  private xhrSub: Subscription;
  private xhrNotificationTimeoutHandle = null;
  xhrNotificationVisible: boolean = false;
  xhrSucceeded: boolean = true;
  xhrNotificationMessage: string = '';
  xhrPending: boolean = false;

  product: Product;
  productDetail: ProductDetail;

  // validation helper form view
  markdownMaxLength: number = 30000;

  form: FormGroup;

  id: FormControl;
  markdown: FormControl;
  parentProductId: FormControl;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private appState: AdminAppState,
    private sanitizer: DomSanitizationService) {
  }

  onSubmit(formValue) {
    this.ensureXhrCancelled();
    this.xhrPending = true;

    if (this.id.value >= 0) { // updating existing detail
      this.xhrSub = this.api.updateProductDetail(this.parentProductId.value, formValue)
        .subscribe((res: any) => {
          let detail = res.json();
          this.createForm(detail);
          this.xhrPending = false;
          this.notifyCompleted('Markdown updated');
        }, (err: any) => {
          this.notifyCompleted('Failed to update mardown', false);
          this.addErrors(err);
        })
    } else { // creating new detail
      this.xhrSub = this.api.createProductDetail(this.parentProductId.value, formValue)
        .subscribe((res: any) => {
          let detail = res.json();
          this.createForm(detail);
          this.xhrPending = false;
          this.notifyCompleted('Markdown created');
        }, (err: any) => {
          this.notifyCompleted('Failed to create category', false);
          this.addErrors(err);
        });
    }
  }

  preview = null;
  onPreviewClick(formValue: ProductDetail) {
    this.ensureXhrCancelled();
    this.xhrPending = true;

    this.xhrSub = this.api.getMarkdownPreview(formValue)
      .subscribe((res: any) => {
        let markdown = res.json().markdown;
        this.preview = this.sanitizer.bypassSecurityTrustHtml(markdown);
        this.xhrPending = false;
      }, (err: any) => {
        this.notifyCompleted('Failed to fetch markdown', false);
        this.addErrors(err);
      });
  }

  onPreviewBackClick() {
    this.preview = null;
  }

  ngOnInit() {
    this.product = this.appState.currentProduct;
    this.xhrSub = this.api.getProductDetail(this.product.id)
      .subscribe((res: any) => {
        let detail = res.json();
        this.createForm(detail);
      }, (err: any) => {
        this.createForm();
      });
  }


  ngOnDestroy() {
    this.ensureXhrCancelled();
  }

  private createForm(productDetail?: ProductDetail) {
    this.productDetail = null;
    this.id = new FormControl(-1);
    this.markdown = new FormControl('', Validators.maxLength(this.markdownMaxLength));
    this.parentProductId = new FormControl(this.product.id);

    if (productDetail !== null && typeof productDetail !== 'undefined') {
      this.productDetail = productDetail;
      this.id.updateValue(productDetail.id);
      this.markdown.updateValue(productDetail.markdown);
      this.parentProductId.updateValue(productDetail.parentProductId);
    }

    this.form = this.fb.group({
      'id': this.id,
      'markdown': this.markdown,
      'parentProductId': this.parentProductId
    });
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