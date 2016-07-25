import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from 'ng-semantic';

import { ApiService, Category } from '../../shared';

@Component({
  selector: 'j-orders',
  templateUrl: './orders.component.html',
  directives: [ ROUTER_DIRECTIVES, SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES ]
})
export class OrdersComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}