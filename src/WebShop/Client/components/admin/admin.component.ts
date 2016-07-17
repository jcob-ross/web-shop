import { Component } from '@angular/core';

@Component({
  selector: 'admin-main',
  template: `
    <h2 class="pink">Hello from {{ message }}</h2>
  `,
  styleUrls: [ './admin.component.scss' ]
})
export class AdminComponent {
  message = 'AdminComponent';
}
