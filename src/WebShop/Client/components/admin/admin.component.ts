import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { ApiService } from '../shared';

@Component({
  selector: 'admin-main',
  templateUrl: './admin.component.html',
  directives: [ AlertComponent, ROUTER_DIRECTIVES ]
})
export class AdminComponent implements OnInit {
  message = 'AdminComponent';

  constructor(private api: ApiService) {

  }

  ngOnInit() {
    
  }
}
