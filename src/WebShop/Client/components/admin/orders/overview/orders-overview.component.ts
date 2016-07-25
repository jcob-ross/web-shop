import { Component, OnInit, OnDestroy, Pipe, PipeTransform, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from 'ng-semantic';

import {
  ApiService,
  Category, UserInfo, ProductOrder, OrderLine,
  MomentPipe, MomentFromNowPipe } from '../../../shared';

@Component({
  selector: 'j-orders-overview',
  templateUrl: './orders-overview.component.html',
  directives: [ REACTIVE_FORM_DIRECTIVES, SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES ],
  pipes: [ MomentPipe, MomentFromNowPipe ],
  styles: [`
    .table-segment div.ui.segment { min-height: 200px; }
    .table-segment tbody { cursor: pointer; }
  `],
  encapsulation: ViewEncapsulation.None
})
export class OrdersOverviewComponent implements OnInit, OnDestroy {
  private xhrSub: Subscription;
  xhrPending: boolean = false;

  orders: ProductOrder[];
  ordersStats: { total: number, accepted: number, cancelled: number, shipped: number };

  form: FormGroup;

  maxAgeDays: FormControl;
  private maxAgeDaysSub: Subscription;
  shippedOnly: FormControl;
  private shippedOnlySub: Subscription;

  constructor(private api: ApiService, private fb: FormBuilder) {
  }

  selectedOrder;
  onOrderRowClick(order: ProductOrder) {
    console.log(order);
    this.selectedOrder = order;
  }

  private extractOrdersStats(orders: ProductOrder[]) {
    let stats = {
      total: orders.length,
      accepted: 0,
      cancelled: 0,
      shipped: 0
    };

    orders.forEach((item: ProductOrder) => {
      if (item.acceptedOn) stats.accepted += 1;
      if (item.cancelledOn) stats.cancelled += 1;
      if (item.shippedOn) stats.shipped += 1;
    });
    this.ordersStats = stats;
  }

  onFetchClick() {
    if (!this.form.valid) {
      return;
    }
    this.fetchOrders(this.maxAgeDays.value, this.shippedOnly.value);
  }

  onMaxAgeButtonClick(value: number) {
    if (!this.maxAgeDays.valid) { return; }
    this.maxAgeDays.updateValue(+this.maxAgeDays.value + value);
  }

  private createForm() {
    this.shippedOnly = new FormControl(false);
    this.maxAgeDays = new FormControl(7, Validators.pattern('[0-9]{1,4}'));
    this.shippedOnlySub = this.shippedOnly.valueChanges
      .subscribe((value: boolean) => {
        if (this.form.valid) {
          this.fetchOrders(this.maxAgeDays.value, this.shippedOnly.value);
        }
    });

    this.form = this.fb.group({
      'maxAgeDays': this.maxAgeDays,
      'shippedOnly': this.shippedOnly
    });
  }

  private fetchOrders(maxAgeDays: number, onlyShipped: boolean) {
    this.xhrPending = true;
    this.xhrSub = this.api.getOrders(maxAgeDays, onlyShipped)
      .subscribe((res: any) => {
        this.orders = res.json();
        this.extractOrdersStats(this.orders);
        this.xhrPending = false;
      }, (err: any) => this.addErrors(err));
  }

  ngOnInit() {
    this.createForm();
    this.fetchOrders(/* maxAgeDays */ 7, /* onlyShipped */ false);
  }

  ngOnDestroy() {
    if (this.xhrSub && !this.xhrSub.isUnsubscribed) {
      this.xhrSub.unsubscribe();
    }
    if (this.shippedOnlySub && !this.shippedOnlySub.isUnsubscribed) {
      this.shippedOnlySub.unsubscribe();
    }
    if (this.maxAgeDaysSub && !this.maxAgeDaysSub.isUnsubscribed) {
      this.maxAgeDaysSub.unsubscribe();
    }
  }

  private addErrors(errorResponse) {
    console.warn(errorResponse);
    this.xhrPending = false;
  }
}
