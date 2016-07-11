import {
  beforeEachProviders,
  inject,
  it
} from '@angular/core/testing';

import { ShopMainComponent } from './shop-main.component';

describe('shop-main', () => {

  beforeEachProviders(() => [
    ShopMainComponent
  ]);

  it('should have a message', inject([ ShopMainComponent ], (main) => {
    expect(main.message).toEqual('ShopMainComponent');
  }));

});
