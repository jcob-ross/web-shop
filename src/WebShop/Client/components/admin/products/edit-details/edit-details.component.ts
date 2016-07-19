import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ApiService, Product, ProductDetail } from '../../../shared';
import { ProductEditorState } from '../shared';
import { AutoAdjustTextareaDirective } from './textarea-auto-adjust.directive';

@Component({
  selector: 'j-details',
  templateUrl: './edit-details.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES, AutoAdjustTextareaDirective ]
})
export class EditDetailsComponent implements OnInit, OnDestroy {
  private detailSub: Subscription;
  private createSub: Subscription;
  private updateSub: Subscription;

  product: Product;
  productDetail: ProductDetail;

  // validation helper form view
  markupMaxLength: number = 20000;

  form: FormGroup;

  id: FormControl;
  markup: FormControl;
  parentProductId: FormControl;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private editorState: ProductEditorState) {
  }

  private createForm(productDetail?: ProductDetail) {
    this.productDetail = null;
    this.id = new FormControl(-1);
    this.markup = new FormControl('', Validators.maxLength(this.markupMaxLength));
    this.parentProductId = new FormControl(this.product.id);

    if (productDetail !== null && typeof productDetail !== 'undefined') {
      this.productDetail = productDetail;
      this.id.updateValue(productDetail.id);
      this.markup.updateValue(productDetail.markup);
      this.parentProductId.updateValue(productDetail.parentProductId);
    }

    this.form = this.fb.group({
      'id': this.id,
      'markup': this.markup,
      'parentProductId': this.parentProductId
    });
  }

  onSubmit(formValue) {
    if (this.id.value > 0) { // updating existing detail
      this.api.updateProductDetail(this.parentProductId.value, formValue)
        .subscribe((res: any) => {
          let detail = res.json();
          this.createForm(detail);
        })
    } else { // creating new detail
      this.api.createProductDetail(this.parentProductId.value, formValue)
        .subscribe((res: any) => {
          let detail = res.json();
          this.createForm(detail);
        });
    }
  }

  ngOnInit() {
    this.product = this.editorState.currentProduct;
    this.detailSub = this.api.getProductDetail(this.product.id)
      .subscribe((res: any) => {
        let detail = res.json();
        this.createForm(detail);
      }, (err: any) => {
        this.createForm();
      });  
  }


  ngOnDestroy() {
    if (this.detailSub && this.detailSub.unsubscribe) {
      this.detailSub.unsubscribe();
    }
    if (this.createSub && this.createSub.unsubscribe) {
      this.createSub.unsubscribe();
    }
    if (this.updateSub && this.updateSub.unsubscribe) {
      this.updateSub.unsubscribe();
    }
  }

}