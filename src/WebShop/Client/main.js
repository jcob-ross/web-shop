"use strict";
require('ts-helpers');
require('./styles/global.scss');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var components_1 = require('./components');
if ('production' === ENV) {
    platform_browser_1.disableDebugTools();
    core_1.enableProdMode();
}
else {
}
platform_browser_dynamic_1.bootstrap(components_1.ShopMainComponent, [
    http_1.HTTP_PROVIDERS,
]).catch(function (error) { return console.error("shop-main: " + error); });
//# sourceMappingURL=main.js.map