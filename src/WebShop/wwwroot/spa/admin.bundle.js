var ac_admin =
webpackJsonpac__name_([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(298);
	var platform_browser_dynamic_1 = __webpack_require__(244);
	var platform_browser_1 = __webpack_require__(80);
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(153);
	var common_1 = __webpack_require__(9);
	var forms_1 = __webpack_require__(27);
	var admin_1 = __webpack_require__(393);
	var admin_2 = __webpack_require__(393);
	var shared_1 = __webpack_require__(254);
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

/***/ 254:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(696));
	

/***/ },

/***/ 393:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(682));
	__export(__webpack_require__(683));
	

/***/ },

/***/ 682:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(251);
	var ng2_bootstrap_1 = __webpack_require__(571);
	var shared_1 = __webpack_require__(254);
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
	            template: __webpack_require__(699),
	            directives: [ng2_bootstrap_1.AlertComponent, router_1.ROUTER_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ApiService !== 'undefined' && shared_1.ApiService) === 'function' && _a) || Object])
	    ], AdminComponent);
	    return AdminComponent;
	    var _a;
	}());
	exports.AdminComponent = AdminComponent;
	

/***/ },

/***/ 683:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var router_1 = __webpack_require__(251);
	var categories_1 = __webpack_require__(685);
	var manufacruters_1 = __webpack_require__(686);
	var tags_1 = __webpack_require__(692);
	var orders_1 = __webpack_require__(688);
	var products_1 = __webpack_require__(690);
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

/***/ 684:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(27);
	var shared_1 = __webpack_require__(254);
	var CategoriesComponent = (function () {
	    function CategoriesComponent(api, fb) {
	        this.api = api;
	        this.fb = fb;
	    }
	    CategoriesComponent.prototype.onCategoryClick = function (item) {
	        this.selectedCategory = item;
	    };
	    CategoriesComponent.prototype.onNewCategoryClick = function (category) {
	        this.name = new forms_1.FormControl('-', forms_1.Validators.required);
	        if (category !== null && typeof category !== 'undefined') {
	            this.name.updateValue(category.name);
	        }
	        this.form = this.fb.group({
	            'name': this.name
	        });
	    };
	    CategoriesComponent.prototype.onFormSubmit = function (formValue) {
	        console.log(formValue);
	    };
	    CategoriesComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.sub = this.api.getCategories(/* include manufacturers */ true, /* include tags */ true)
	            .map(function (res) { return res.json(); })
	            .subscribe(function (res) {
	            console.log(res);
	            _this.categories = res;
	        });
	    };
	    CategoriesComponent.prototype.ngOnDestroy = function () {
	        this.sub.unsubscribe();
	    };
	    CategoriesComponent = __decorate([
	        core_1.Component({
	            selector: 'j-categories',
	            template: __webpack_require__(700),
	            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ApiService !== 'undefined' && shared_1.ApiService) === 'function' && _a) || Object, (typeof (_b = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _b) || Object])
	    ], CategoriesComponent);
	    return CategoriesComponent;
	    var _a, _b;
	}());
	exports.CategoriesComponent = CategoriesComponent;
	

/***/ },

/***/ 685:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(684));
	

/***/ },

/***/ 686:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(687));
	

/***/ },

/***/ 687:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var ManufacturersComponent = (function () {
	    function ManufacturersComponent() {
	    }
	    ManufacturersComponent = __decorate([
	        core_1.Component({
	            selector: 'j-manufacturers',
	            template: __webpack_require__(701)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ManufacturersComponent);
	    return ManufacturersComponent;
	}());
	exports.ManufacturersComponent = ManufacturersComponent;
	

/***/ },

/***/ 688:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(689));
	

/***/ },

/***/ 689:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var OrdersComponent = (function () {
	    function OrdersComponent() {
	    }
	    OrdersComponent = __decorate([
	        core_1.Component({
	            selector: 'j-orders',
	            template: __webpack_require__(702)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], OrdersComponent);
	    return OrdersComponent;
	}());
	exports.OrdersComponent = OrdersComponent;
	

/***/ },

/***/ 690:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(691));
	

/***/ },

/***/ 691:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var ProductsComponent = (function () {
	    function ProductsComponent() {
	    }
	    ProductsComponent = __decorate([
	        core_1.Component({
	            selector: 'j-products',
	            template: __webpack_require__(703)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ProductsComponent);
	    return ProductsComponent;
	}());
	exports.ProductsComponent = ProductsComponent;
	

/***/ },

/***/ 692:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(693));
	

/***/ },

/***/ 693:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var TagsComponent = (function () {
	    function TagsComponent() {
	    }
	    TagsComponent = __decorate([
	        core_1.Component({
	            selector: 'j-tags',
	            template: __webpack_require__(704)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], TagsComponent);
	    return TagsComponent;
	}());
	exports.TagsComponent = TagsComponent;
	

/***/ },

/***/ 696:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(153);
	var BASE_URL = 'http://localhost:8080';
	var ApiService = (function () {
	    function ApiService(http) {
	        this.http = http;
	    }
	    ApiService.prototype.getCategories = function (includeManufacturers, includeTags) {
	        if (includeManufacturers === void 0) { includeManufacturers = false; }
	        if (includeTags === void 0) { includeTags = false; }
	        var queryParams = new http_1.URLSearchParams();
	        queryParams.set('includeManufacturers', JSON.stringify(includeManufacturers));
	        queryParams.set('includeTags', JSON.stringify(includeTags));
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Get,
	            url: BASE_URL + "/api/category/list",
	            search: queryParams
	        });
	    };
	    ApiService.prototype.getManufacturers = function (categoryId) {
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Get,
	            url: BASE_URL + "/api/manufacturer/list/category/" + categoryId
	        });
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
	        return error;
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

/***/ 699:
/***/ function(module, exports) {

	module.exports = "<ul class=\"nav nav-tabs\">\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" [routerLink]=\" ['./products'] \">Products</a>\r\n  </li>\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" [routerLink]=\" ['./categories'] \">Categories</a>\r\n  </li>\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" [routerLink]=\" ['./manufacturers'] \">Manufacturers</a>\r\n  </li>\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" [routerLink]=\" ['./tags'] \">Tags</a>\r\n  </li>\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" [routerLink]=\" ['./orders'] \">Orders</a>\r\n  </li>  \r\n</ul>\r\n\r\n<router-outlet></router-outlet>"

/***/ },

/***/ 700:
/***/ function(module, exports) {

	module.exports = "<p>categories</p>\r\n\r\n<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n    <div class=\"col-xs-3\">\r\n      <ul>\r\n        <li (click)=\"onNewCategoryClick()\">New Category</li>\r\n        <li *ngFor=\"let category of categories\" (click)=\"onNewCategoryClick(category)\">{{ category.name }}</li>\r\n      </ul>\r\n    </div>\r\n\r\n    <div class=\"col-xs-9\">\r\n\r\n        <form novalidate *ngIf=\"form\" [formGroup]=\"form\" (ngSubmit)=\"onFormSubmit(form.value)\">\r\n\r\n          <div class=\"form-group\" [class.has-success]=\"name.valid && name.touched\"\r\n               [class.has-error]=\"!name.valid && name.touched\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"Name\" [formControl]=\"name\">\r\n            <small class=\"text-muted\" *ngIf=\"name.hasError('required') && name.touched\">\r\n              Name is required.\r\n            </small>\r\n          </div>\r\n\r\n          <button type=\"submit\" [disabled]=\"!form.valid\" class=\"btn btn-primary\">Submit</button>\r\n\r\n        </form>\r\n\r\n      <div *ngIf=\"selectedCategory\">{{ selectedCategory | json }}</div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ },

/***/ 701:
/***/ function(module, exports) {

	module.exports = "<p>manufacturers</p>"

/***/ },

/***/ 702:
/***/ function(module, exports) {

	module.exports = "<p>orders</p>"

/***/ },

/***/ 703:
/***/ function(module, exports) {

	module.exports = "<p>products</p>"

/***/ },

/***/ 704:
/***/ function(module, exports) {

	module.exports = "<p>tags</p>"

/***/ }

});
//# sourceMappingURL=admin.bundle.map