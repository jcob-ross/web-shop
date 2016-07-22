import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'admin-main',
  templateUrl: './admin.component.html',
  directives: [ ROUTER_DIRECTIVES ]
})
export class AdminComponent {
}
