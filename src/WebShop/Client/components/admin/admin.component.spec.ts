import {
  beforeEachProviders,
  inject,
  it
} from '@angular/core/testing';

import { AdminComponent } from './admin.component';

describe('admin', () => {

  beforeEachProviders(() => [
    AdminComponent
  ]);

  it('should have a message', inject([ AdminComponent ], (main) => {
    expect(main.message).toEqual('AdminComponent');
  }));

});
