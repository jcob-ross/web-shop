import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <h2 class="pink">Hello from {{ message }}</h2>
  `,
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  message = 'AppComponent';
}
