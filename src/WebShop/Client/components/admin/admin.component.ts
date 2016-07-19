import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'admin-main',
  templateUrl: './admin.component.html',
  directives: [ AlertComponent, ROUTER_DIRECTIVES ]
})
export class AdminComponent {
}
