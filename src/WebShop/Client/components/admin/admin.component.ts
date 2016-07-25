import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from 'ng-semantic';

@Component({
  selector: 'admin-main',
  templateUrl: './admin.component.html',
  directives: [ ROUTER_DIRECTIVES, SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES ]
})
export class AdminComponent {
  menuitems = [
    {'title': 'Products',       'link': ['./products'],       'icon': 'cubes'},
    {'title': 'Categories',     'link': ['./categories'],     'icon': 'hashtag'},
    {'title': 'Manufacturers',  'link': ['./manufacturers'],  'icon': 'industry'},
    {'title': 'Tags',           'link': ['./tags'],           'icon': 'tags'},
    {'title': 'Orders',         'link': ['./orders'],         'icon': 'line chart'}
  ]
}
