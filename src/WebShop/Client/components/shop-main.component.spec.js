"use strict";
var testing_1 = require('@angular/core/testing');
var shop_main_component_1 = require('./shop-main.component');
describe('shop-main', function () {
    testing_1.beforeEachProviders(function () { return [
        shop_main_component_1.ShopMainComponent
    ]; });
    testing_1.it('should have a message', testing_1.inject([shop_main_component_1.ShopMainComponent], function (main) {
        expect(main.message).toEqual('ShopMainComponent');
    }));
});
//# sourceMappingURL=shop-main.component.spec.js.map