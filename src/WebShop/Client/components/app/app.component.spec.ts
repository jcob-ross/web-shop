import {
  beforeEachProviders,
  inject,
  it
} from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('app', () => {

  beforeEachProviders(() => [
    AppComponent
  ]);

  it('should have a message', inject([ AppComponent ], (main) => {
    expect(main.message).toEqual('AppComponent');
  }));

});
