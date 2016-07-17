var ac_admin =
webpackJsonpac__name_([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(296);
	var platform_browser_dynamic_1 = __webpack_require__(243);
	var platform_browser_1 = __webpack_require__(80);
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(237);
	var common_1 = __webpack_require__(9);
	var forms_1 = __webpack_require__(30);
	var admin_1 = __webpack_require__(392);
	var admin_2 = __webpack_require__(392);
	var shared_1 = __webpack_require__(914);
	if (false) {
	    platform_browser_1.disableDebugTools();
	    core_1.enableProdMode();
	}
	else {
	}
	platform_browser_dynamic_1.bootstrap(admin_1.AdminComponent, [
	    forms_1.disableDeprecatedForms(),
	    forms_1.provideForms()
	].concat(admin_2.ADMIN_ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, [
	    shared_1.ApiService,
	    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
	])).catch(function (error) { return console.error("admin-main: " + error); });
	

/***/ },

/***/ 392:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(681));
	__export(__webpack_require__(682));
	

/***/ },

/***/ 681:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(389);
	var ng2_bootstrap_1 = __webpack_require__(570);
	var shared_1 = __webpack_require__(914);
	var AdminComponent = (function () {
	    function AdminComponent(api) {
	        this.api = api;
	        this.message = 'AdminComponent';
	    }
	    AdminComponent.prototype.ngOnInit = function () {
	    };
	    AdminComponent = __decorate([
	        core_1.Component({
	            selector: 'admin-main',
	            template: __webpack_require__(697),
	            directives: [ng2_bootstrap_1.AlertComponent, router_1.ROUTER_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ApiService !== 'undefined' && shared_1.ApiService) === 'function' && _a) || Object])
	    ], AdminComponent);
	    return AdminComponent;
	    var _a;
	}());
	exports.AdminComponent = AdminComponent;
	

/***/ },

/***/ 682:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var router_1 = __webpack_require__(389);
	var categories_1 = __webpack_require__(684);
	var manufacruters_1 = __webpack_require__(685);
	var tags_1 = __webpack_require__(691);
	var orders_1 = __webpack_require__(687);
	var products_1 = __webpack_require__(689);
	exports.routes = [
	    { path: 'categories', component: categories_1.CategoriesComponent },
	    { path: 'manufacturers', component: manufacruters_1.ManufacturersComponent },
	    { path: 'tags', component: tags_1.TagsComponent },
	    { path: 'orders', component: orders_1.OrdersComponent },
	    { path: 'products', component: products_1.ProductsComponent },
	    { path: '', redirectTo: 'orders', pathMatch: 'full' }
	];
	exports.ADMIN_ROUTER_PROVIDERS = [router_1.provideRouter(exports.routes)];
	

/***/ },

/***/ 683:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var shared_1 = __webpack_require__(914);
	var CategoriesComponent = (function () {
	    function CategoriesComponent(api) {
	        this.api = api;
	    }
	    CategoriesComponent.prototype.ngOnInit = function () {
	        this.sub = this.api.getCategories(/* include manufacturers */ true, /* include tags */ true)
	            .subscribe(function (res) { return console.log(res.json()); });
	    };
	    CategoriesComponent.prototype.ngOnDestroy = function () {
	        this.sub.unsubscribe();
	    };
	    CategoriesComponent = __decorate([
	        core_1.Component({
	            selector: 'j-categories',
	            template: __webpack_require__(698)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ApiService !== 'undefined' && shared_1.ApiService) === 'function' && _a) || Object])
	    ], CategoriesComponent);
	    return CategoriesComponent;
	    var _a;
	}());
	exports.CategoriesComponent = CategoriesComponent;
	

/***/ },

/***/ 684:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(683));
	

/***/ },

/***/ 685:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(686));
	

/***/ },

/***/ 686:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var ManufacturersComponent = (function () {
	    function ManufacturersComponent() {
	    }
	    ManufacturersComponent = __decorate([
	        core_1.Component({
	            selector: 'j-manufacturers',
	            template: __webpack_require__(699)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ManufacturersComponent);
	    return ManufacturersComponent;
	}());
	exports.ManufacturersComponent = ManufacturersComponent;
	

/***/ },

/***/ 687:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(688));
	

/***/ },

/***/ 688:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var OrdersComponent = (function () {
	    function OrdersComponent() {
	    }
	    OrdersComponent = __decorate([
	        core_1.Component({
	            selector: 'j-orders',
	            template: __webpack_require__(700)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], OrdersComponent);
	    return OrdersComponent;
	}());
	exports.OrdersComponent = OrdersComponent;
	

/***/ },

/***/ 689:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(690));
	

/***/ },

/***/ 690:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var ProductsComponent = (function () {
	    function ProductsComponent() {
	    }
	    ProductsComponent = __decorate([
	        core_1.Component({
	            selector: 'j-products',
	            template: __webpack_require__(701)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ProductsComponent);
	    return ProductsComponent;
	}());
	exports.ProductsComponent = ProductsComponent;
	

/***/ },

/***/ 691:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(692));
	

/***/ },

/***/ 692:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var TagsComponent = (function () {
	    function TagsComponent() {
	    }
	    TagsComponent = __decorate([
	        core_1.Component({
	            selector: 'j-tags',
	            template: __webpack_require__(702)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], TagsComponent);
	    return TagsComponent;
	}());
	exports.TagsComponent = TagsComponent;
	

/***/ },

/***/ 697:
/***/ function(module, exports) {

	module.exports = "<ul class=\"nav nav-tabs\">\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" [routerLink]=\" ['./products'] \">Products</a>\r\n  </li>\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" [routerLink]=\" ['./categories'] \">Categories</a>\r\n  </li>\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" [routerLink]=\" ['./manufacturers'] \">Manufacturers</a>\r\n  </li>\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" [routerLink]=\" ['./tags'] \">Tags</a>\r\n  </li>\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" [routerLink]=\" ['./orders'] \">Orders</a>\r\n  </li>  \r\n</ul>\r\n\r\n<router-outlet></router-outlet>"

/***/ },

/***/ 698:
/***/ function(module, exports) {

	module.exports = "<p>categories</p>"

/***/ },

/***/ 699:
/***/ function(module, exports) {

	module.exports = "<p>manufacturers</p>"

/***/ },

/***/ 700:
/***/ function(module, exports) {

	module.exports = "<p>orders</p>"

/***/ },

/***/ 701:
/***/ function(module, exports) {

	module.exports = "<p>products</p>"

/***/ },

/***/ 702:
/***/ function(module, exports) {

	module.exports = "<p>tags</p>"

/***/ },

/***/ 913:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(237);
	var BASE_URL = 'http://localhost:8080';
	var ApiService = (function () {
	    function ApiService(http) {
	        this.http = http;
	    }
	    ApiService.prototype.getCategories = function (includeManufacturers, includeTags) {
	        var _this = this;
	        if (includeManufacturers === void 0) { includeManufacturers = false; }
	        if (includeTags === void 0) { includeTags = false; }
	        var queryParams = new http_1.URLSearchParams();
	        queryParams.set('includeManufacturers', JSON.stringify(includeManufacturers));
	        queryParams.set('includeTags', JSON.stringify(includeTags));
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Get,
	            url: BASE_URL + "/api/category/list",
	            search: queryParams
	        }).catch(function (err) { return _this.handleError(err); });
	    };
	    ApiService.prototype.getManufacturers = function (categoryId) {
	        var _this = this;
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Get,
	            url: BASE_URL + "/api/manufacturer/list/category/" + categoryId
	        }).catch(function (err) { return _this.handleError(err); });
	    };
	    ApiService.prototype.jsonRequest = function (options) {
	        if (options.body && typeof (options.body) !== 'string') {
	            options.body = JSON.stringify(options.body);
	        }
	        options.headers = new http_1.Headers({
	            'Accept': 'application/json'
	        });
	        return this.http.request(new http_1.Request(options));
	    };
	    ApiService.prototype.handleError = function (error) {
	        // todo: api error handling
	        console.error(error);
	    };
	    ApiService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
	    ], ApiService);
	    return ApiService;
	    var _a;
	}());
	exports.ApiService = ApiService;
	

/***/ },

/***/ 914:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(913));
	

/***/ }

});
//# sourceMappingURL=admin.bundle.map