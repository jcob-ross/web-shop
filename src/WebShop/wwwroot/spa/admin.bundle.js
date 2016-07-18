var ac_admin =
webpackJsonpac__name_([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(298);
	var platform_browser_dynamic_1 = __webpack_require__(245);
	var platform_browser_1 = __webpack_require__(80);
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(153);
	var common_1 = __webpack_require__(9);
	var forms_1 = __webpack_require__(24);
	var admin_1 = __webpack_require__(393);
	var admin_2 = __webpack_require__(393);
	var shared_1 = __webpack_require__(162);
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

/***/ 162:
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
	__export(__webpack_require__(683));
	__export(__webpack_require__(684));
	

/***/ },

/***/ 683:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(252);
	var ng2_bootstrap_1 = __webpack_require__(572);
	var shared_1 = __webpack_require__(162);
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

/***/ 684:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var router_1 = __webpack_require__(252);
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

/***/ 685:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(915));
	

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
	var forms_1 = __webpack_require__(24);
	var shared_1 = __webpack_require__(162);
	var ManufacturersComponent = (function () {
	    function ManufacturersComponent(api, fb) {
	        this.api = api;
	        this.fb = fb;
	        this.categories = null;
	        this.selectedCategory = null;
	        this.selectedManufacturer = null;
	    }
	    ManufacturersComponent.prototype.onManufacturerClick = function (category, manufacturer) {
	        this.selectedManufacturer = manufacturer;
	        this.selectedCategory = category;
	        this.id = new forms_1.FormControl(-1);
	        this.name = new forms_1.FormControl('', forms_1.Validators.required);
	        this.urlSegment = new forms_1.FormControl('', forms_1.Validators.required);
	        this.showInMainMenu = new forms_1.FormControl(false, forms_1.Validators.required);
	        this.parentCategoryId = new forms_1.FormControl(category.id, forms_1.Validators.required);
	        if (manufacturer !== null && typeof manufacturer !== 'undefined') {
	            this.id.updateValue(manufacturer.id);
	            this.name.updateValue(manufacturer.name);
	            this.urlSegment.updateValue(manufacturer.urlSegment);
	            this.showInMainMenu.updateValue(manufacturer.showInMainMenu);
	            this.parentCategoryId.updateValue(manufacturer.parentCategoryId);
	        }
	        this.form = this.fb.group({
	            'id': this.id,
	            'name': this.name,
	            'urlSegment': this.urlSegment,
	            'showInMainMenu': this.showInMainMenu,
	            'parentCategoryId': this.parentCategoryId,
	        });
	    };
	    ManufacturersComponent.prototype.onCategoryClick = function (category) {
	        this.onManufacturerClick(category, null);
	    };
	    ManufacturersComponent.prototype.onFormSubmit = function (formValue) {
	        var _this = this;
	        if (formValue.id >= 0) {
	            this.api.updateManufacturer(formValue).subscribe(function (res) {
	                if (res.ok) {
	                    var updatedManufacturer_1 = res.json();
	                    var category = _this.categories.find(function (c) { return c.id === updatedManufacturer_1.parentCategoryId; });
	                    var manufacturerIndex = category.manufacturers.findIndex(function (m) { return m.id === updatedManufacturer_1.id; });
	                    category.manufacturers[manufacturerIndex] = updatedManufacturer_1;
	                    _this.onManufacturerClick(_this.selectedCategory, updatedManufacturer_1);
	                }
	            }, function (err) { return _this.addErrors(err); });
	        }
	        else {
	            this.api.createManufacturer(formValue).subscribe(function (res) {
	                if (res.ok) {
	                    var createdManufacturer_1 = res.json();
	                    var category = _this.categories.find(function (c) { return c.id === createdManufacturer_1.parentCategoryId; });
	                    category.manufacturers.push(createdManufacturer_1);
	                    _this.onManufacturerClick(_this.selectedCategory, createdManufacturer_1);
	                }
	            }, function (err) { return _this.addErrors(err); });
	        }
	    };
	    ManufacturersComponent.prototype.onDeleteClick = function (id) {
	        var _this = this;
	        this.api.deleteManufacturer(id).subscribe(function (res) {
	            if (res.ok) {
	                var idx = _this.selectedCategory.manufacturers.findIndex(function (m) { return m.id === id; });
	                _this.selectedCategory.manufacturers.splice(idx, 1);
	                _this.selectedCategory = null;
	                _this.selectedManufacturer = null;
	                _this.form = null;
	            }
	        }, function (err) { return _this.addErrors(err); });
	    };
	    ManufacturersComponent.prototype.addErrors = function (errorResponse) {
	        this.errors = [];
	        console.warn(errorResponse);
	        for (var prop in errorResponse) {
	            if (errorResponse.hasOwnProperty(prop)) {
	                this.errors.push(errorResponse[prop]);
	            }
	        }
	    };
	    ManufacturersComponent.prototype.clearErrors = function (index) {
	        if (typeof index === 'undefined') {
	            this.errors = [];
	        }
	        else {
	            this.errors.splice(index, 1);
	        }
	    };
	    ManufacturersComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.sub = this.api.getCategories(/* include manufacturers */ true, /* include tags */ false)
	            .map(function (res) { return res.json(); })
	            .subscribe(function (res) {
	            _this.categories = res;
	        });
	    };
	    ManufacturersComponent.prototype.ngOnDestroy = function () {
	        this.sub.unsubscribe();
	    };
	    ManufacturersComponent = __decorate([
	        core_1.Component({
	            selector: 'j-manufacturers',
	            template: __webpack_require__(700),
	            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ApiService !== 'undefined' && shared_1.ApiService) === 'function' && _a) || Object, (typeof (_b = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _b) || Object])
	    ], ManufacturersComponent);
	    return ManufacturersComponent;
	    var _a, _b;
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
	            template: __webpack_require__(701)
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
	            template: __webpack_require__(702)
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
	var forms_1 = __webpack_require__(24);
	var shared_1 = __webpack_require__(162);
	var TagsComponent = (function () {
	    function TagsComponent(api, fb) {
	        this.api = api;
	        this.fb = fb;
	        this.categories = null;
	        this.selectedCategory = null;
	        this.selectedTag = null;
	    }
	    TagsComponent.prototype.onTagClick = function (category, tag) {
	        this.selectedTag = tag;
	        this.selectedCategory = category;
	        this.id = new forms_1.FormControl(-1);
	        this.name = new forms_1.FormControl('', forms_1.Validators.required);
	        this.urlSegment = new forms_1.FormControl('', forms_1.Validators.required);
	        this.showInMainMenu = new forms_1.FormControl(false, forms_1.Validators.required);
	        this.parentCategoryId = new forms_1.FormControl(category.id, forms_1.Validators.required);
	        if (tag !== null && typeof tag !== 'undefined') {
	            this.id.updateValue(tag.id);
	            this.name.updateValue(tag.name);
	            this.urlSegment.updateValue(tag.urlSegment);
	            this.showInMainMenu.updateValue(tag.showInMainMenu);
	            this.parentCategoryId.updateValue(tag.parentCategoryId);
	        }
	        this.form = this.fb.group({
	            'id': this.id,
	            'name': this.name,
	            'urlSegment': this.urlSegment,
	            'showInMainMenu': this.showInMainMenu,
	            'parentCategoryId': this.parentCategoryId,
	        });
	    };
	    TagsComponent.prototype.onCategoryClick = function (category) {
	        this.onTagClick(category, null);
	    };
	    TagsComponent.prototype.onFormSubmit = function (formValue) {
	        var _this = this;
	        console.log(formValue);
	        if (formValue.id >= 0) {
	            this.api.updateTag(formValue).subscribe(function (res) {
	                if (res.ok) {
	                    var updatedTag_1 = res.json();
	                    var category = _this.categories.find(function (c) { return c.id === updatedTag_1.parentCategoryId; });
	                    var tagIndex = category.tags.findIndex(function (m) { return m.id === updatedTag_1.id; });
	                    category.tags[tagIndex] = updatedTag_1;
	                    _this.onTagClick(_this.selectedCategory, updatedTag_1);
	                }
	            }, function (err) { return _this.addErrors(err); });
	        }
	        else {
	            this.api.createTag(formValue).subscribe(function (res) {
	                if (res.ok) {
	                    var createdTag_1 = res.json();
	                    var category = _this.categories.find(function (c) { return c.id === createdTag_1.parentCategoryId; });
	                    category.tags.push(createdTag_1);
	                    _this.onTagClick(_this.selectedCategory, createdTag_1);
	                }
	            }, function (err) { return _this.addErrors(err); });
	        }
	    };
	    TagsComponent.prototype.onDeleteClick = function (id) {
	        var _this = this;
	        this.api.deleteTag(id).subscribe(function (res) {
	            if (res.ok) {
	                var idx = _this.selectedCategory.tags.findIndex(function (t) { return t.id === id; });
	                _this.selectedCategory.tags.splice(idx, 1);
	                _this.selectedCategory = null;
	                _this.selectedTag = null;
	                _this.form = null;
	            }
	        }, function (err) { return _this.addErrors(err); });
	    };
	    TagsComponent.prototype.addErrors = function (errorResponse) {
	        this.errors = [];
	        console.warn(errorResponse);
	        for (var prop in errorResponse) {
	            if (errorResponse.hasOwnProperty(prop)) {
	                this.errors.push(errorResponse[prop]);
	            }
	        }
	    };
	    TagsComponent.prototype.clearErrors = function (index) {
	        if (typeof index === 'undefined') {
	            this.errors = [];
	        }
	        else {
	            this.errors.splice(index, 1);
	        }
	    };
	    TagsComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.sub = this.api.getCategories(/* include manufacturers */ false, /* include tags */ true)
	            .map(function (res) { return res.json(); })
	            .subscribe(function (res) {
	            _this.categories = res;
	        });
	    };
	    TagsComponent.prototype.ngOnDestroy = function () {
	        this.sub.unsubscribe();
	    };
	    TagsComponent = __decorate([
	        core_1.Component({
	            selector: 'j-tags',
	            template: __webpack_require__(703),
	            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ApiService !== 'undefined' && shared_1.ApiService) === 'function' && _a) || Object, (typeof (_b = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _b) || Object])
	    ], TagsComponent);
	    return TagsComponent;
	    var _a, _b;
	}());
	exports.TagsComponent = TagsComponent;
	

/***/ },

/***/ 696:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(153);
	var Observable_1 = __webpack_require__(7);
	__webpack_require__(395);
	__webpack_require__(918);
	var BASE_URL = 'http://localhost:8080';
	var ApiService = (function () {
	    function ApiService(http) {
	        this.http = http;
	    }
	    /**
	     *  Category CRUD
	     */
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
	    ApiService.prototype.createCategory = function (model) {
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Post,
	            url: BASE_URL + "/api/category",
	            body: model
	        });
	    };
	    ApiService.prototype.updateCategory = function (model) {
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Put,
	            url: BASE_URL + "/api/category/" + model.id,
	            body: model
	        });
	    };
	    ApiService.prototype.deleteCategory = function (id) {
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Delete,
	            url: BASE_URL + "/api/category/" + id
	        });
	    };
	    /**
	     *  Manufacturer CRUD
	     */
	    ApiService.prototype.createManufacturer = function (model) {
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Post,
	            url: BASE_URL + "/api/manufacturer",
	            body: model
	        });
	    };
	    ApiService.prototype.updateManufacturer = function (model) {
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Put,
	            url: BASE_URL + "/api/manufacturer/" + model.id,
	            body: model
	        });
	    };
	    ApiService.prototype.deleteManufacturer = function (id) {
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Delete,
	            url: BASE_URL + "/api/manufacturer/" + id
	        });
	    };
	    /**
	     *  Tag CRUD
	     */
	    ApiService.prototype.createTag = function (model) {
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Post,
	            url: BASE_URL + "/api/tag",
	            body: model
	        });
	    };
	    ApiService.prototype.updateTag = function (model) {
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Put,
	            url: BASE_URL + "/api/tag/" + model.id,
	            body: model
	        });
	    };
	    ApiService.prototype.deleteTag = function (id) {
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Delete,
	            url: BASE_URL + "/api/tag/" + id
	        });
	    };
	    ApiService.prototype.jsonRequest = function (options) {
	        var _this = this;
	        if (options.body && typeof (options.body) !== 'string') {
	            options.body = JSON.stringify(options.body);
	        }
	        if (options.method === http_1.RequestMethod.Get) {
	            options.headers = new http_1.Headers({
	                'Accept': 'application/json'
	            });
	        }
	        else {
	            options.headers = new http_1.Headers({
	                'Content-Type': 'application/json'
	            });
	        }
	        return this.http.request(new http_1.Request(options)).catch(function (err) { return _this.handleError(err); });
	    };
	    ApiService.prototype.handleError = function (error) {
	        var errorObject = { error: 'Unknown error occurred', status: error.status };
	        if (error.headers.has('Content-Type') && error.headers.get('Content-Type').includes('application/json')) {
	            errorObject = error.json();
	        }
	        return Observable_1.Observable.throw(errorObject);
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

	module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n\r\n    <!--category list-->\r\n    <div class=\"col-xs-3\">\r\n      <ul>\r\n        <li *ngFor=\"let category of categories\" (click)=\"onCategoryClick(category)\">\r\n          {{ category.name }}\r\n          <ul *ngIf=\"category.manufacturers.length > 0\">\r\n            <li *ngFor=\"let manufacturer of category.manufacturers\"\r\n                (click)=\"onManufacturerClick(category, manufacturer); $event.stopPropagation()\">\r\n              {{ manufacturer.name }}\r\n            </li>\r\n          </ul>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!--manufacturer form-->\r\n    <div class=\"col-xs-9\">\r\n\r\n      <form novalidate *ngIf=\"form\" [formGroup]=\"form\" (ngSubmit)=\"onFormSubmit(form.value)\">\r\n\r\n        <!--header-->\r\n        <h5 *ngIf=\"selectedCategory\">\r\n          <span *ngIf=\"id.value >= 0\">Modifying manufacturer {{ selectedManufacturer.name }} in category {{ selectedCategory.name }}</span>\r\n          <span *ngIf=\"id.value < 0\">Creating new manufacturer in category {{ selectedCategory.name }}</span>\r\n        </h5>\r\n\r\n        <!--name-->\r\n        <div class=\"form-group row\" [class.has-success]=\"name.valid && name.touched\"\r\n             [class.has-error]=\"!name.valid && name.touched\">\r\n          <div class=\"col-xs-7\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"Name\" [formControl]=\"name\">\r\n            <small class=\"text-muted\" *ngIf=\"name.hasError('required') && name.touched\">\r\n              Name is required.\r\n            </small>\r\n          </div>\r\n        </div>\r\n\r\n        <!--url segment-->\r\n        <div class=\"form-group row\" [class.has-success]=\"urlSegment.valid && urlSegment.touched\"\r\n             [class.has-error]=\"!urlSegment.valid && urlSegment.touched\">\r\n          <div class=\"col-xs-7\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"Url segment\" [formControl]=\"urlSegment\">\r\n            <small class=\"text-muted\" *ngIf=\"urlSegment.hasError('required') && urlSegment.touched\">\r\n              Url segment is required.\r\n            </small>\r\n          </div>\r\n        </div>\r\n\r\n        <!--show in main menu-->\r\n        <div class=\"form-group row\">\r\n          <div class=\"checkbox col-xs-7\">\r\n            <label>\r\n              <input type=\"checkbox\" [formControl]=\"showInMainMenu\"> Show in main menu\r\n            </label>\r\n          </div>\r\n        </div>\r\n\r\n        <!--submit button-->\r\n        <button type=\"submit\" [disabled]=\"!form.valid\" class=\"btn btn-primary\">\r\n          <span *ngIf=\"selectedManufacturer == null\">Create</span>\r\n          <span *ngIf=\"selectedManufacturer != null\">Update</span>\r\n        </button>\r\n\r\n        <!--delete button-->\r\n        <button type=\"button\" [disabled]=\"id.value < 0\" class=\"btn btn-warning\" (click)=\"onDeleteClick(id.value)\">\r\n          Delete\r\n        </button>\r\n\r\n      </form>\r\n\r\n      <!--error alerts-->\r\n      <div *ngIf=\"errors && errors.length > 0\">\r\n        <div class=\"alert alert-warning alert-dismissible fade in\" role=\"alert\"\r\n             *ngFor=\"let error of errors; let idx = index\">\r\n          <button type=\"button\" class=\"close\">\r\n            <span aria-hidden=\"true\" (click)=\"clearErrors(idx)\">&times;</span>\r\n          </button>\r\n          {{ error }}\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ },

/***/ 701:
/***/ function(module, exports) {

	module.exports = "<p>orders</p>"

/***/ },

/***/ 702:
/***/ function(module, exports) {

	module.exports = "<p>products</p>"

/***/ },

/***/ 703:
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n\r\n    <!--category list-->\r\n    <div class=\"col-xs-3\">\r\n      <ul>\r\n        <li *ngFor=\"let category of categories\" (click)=\"onCategoryClick(category)\">\r\n          {{ category.name }}\r\n          <ul *ngIf=\"category.tags.length > 0\">\r\n            <li *ngFor=\"let tag of category.tags\" (click)=\"onTagClick(category, tag); $event.stopPropagation()\">\r\n              {{ tag.name }}\r\n            </li>\r\n          </ul>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!--tag form-->\r\n    <div class=\"col-xs-9\">\r\n\r\n      <form novalidate *ngIf=\"form\" [formGroup]=\"form\" (ngSubmit)=\"onFormSubmit(form.value)\">\r\n\r\n        <!--header-->\r\n        <h5 *ngIf=\"selectedCategory\">\r\n          <span *ngIf=\"id.value >= 0\">Modifying tag {{ selectedTag.name }} in category {{ selectedCategory.name }}</span>\r\n          <span *ngIf=\"id.value < 0\">Creating new tag in category {{ selectedCategory.name }}</span>\r\n        </h5>\r\n\r\n        <!--name-->\r\n        <div class=\"form-group row\" [class.has-success]=\"name.valid && name.touched\"\r\n             [class.has-error]=\"!name.valid && name.touched\">\r\n          <div class=\"col-xs-7\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"Name\" [formControl]=\"name\">\r\n            <small class=\"text-muted\" *ngIf=\"name.hasError('required') && name.touched\">\r\n              Name is required.\r\n            </small>\r\n          </div>\r\n        </div>\r\n\r\n        <!--url segment-->\r\n        <div class=\"form-group row\" [class.has-success]=\"urlSegment.valid && urlSegment.touched\"\r\n             [class.has-error]=\"!urlSegment.valid && urlSegment.touched\">\r\n          <div class=\"col-xs-7\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"Url segment\" [formControl]=\"urlSegment\">\r\n            <small class=\"text-muted\" *ngIf=\"urlSegment.hasError('required') && urlSegment.touched\">\r\n              Url segment is required.\r\n            </small>\r\n          </div>\r\n        </div>\r\n\r\n        <!--show in main menu-->\r\n        <div class=\"form-group row\">\r\n          <div class=\"checkbox col-xs-7\">\r\n            <label>\r\n              <input type=\"checkbox\" [formControl]=\"showInMainMenu\"> Show in main menu\r\n            </label>\r\n          </div>\r\n        </div>\r\n\r\n        <!--submit button-->\r\n        <button type=\"submit\" [disabled]=\"!form.valid\" class=\"btn btn-primary\">\r\n          <span *ngIf=\"selectedTag == null\">Create</span>\r\n          <span *ngIf=\"selectedTag != null\">Update</span>\r\n        </button>\r\n\r\n        <!--delete button-->\r\n        <button type=\"button\" [disabled]=\"id.value < 0\" class=\"btn btn-warning\" (click)=\"onDeleteClick(id.value)\">\r\n          Delete\r\n        </button>\r\n\r\n      </form>\r\n\r\n      <!--error alerts-->\r\n      <div *ngIf=\"errors && errors.length > 0\">\r\n        <div class=\"alert alert-warning alert-dismissible fade in\" role=\"alert\"\r\n             *ngFor=\"let error of errors; let idx = index\">\r\n          <button type=\"button\" class=\"close\">\r\n            <span aria-hidden=\"true\" (click)=\"clearErrors(idx)\">&times;</span>\r\n          </button>\r\n          {{ error }}\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ },

/***/ 915:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(24);
	var shared_1 = __webpack_require__(162);
	var CategoriesComponent = (function () {
	    function CategoriesComponent(api, fb) {
	        this.api = api;
	        this.fb = fb;
	    }
	    CategoriesComponent.prototype.onCategoryClick = function (category) {
	        this.selectedCategory = category;
	        this.id = new forms_1.FormControl(-1);
	        this.name = new forms_1.FormControl('', forms_1.Validators.required);
	        this.urlSegment = new forms_1.FormControl('', forms_1.Validators.required);
	        this.imageUrl = new forms_1.FormControl('', forms_1.Validators.required);
	        this.viewDisplayOrder = new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[-]?[0-9]+')]));
	        if (category !== null && typeof category !== 'undefined') {
	            this.id.updateValue(category.id);
	            this.name.updateValue(category.name);
	            this.urlSegment.updateValue(category.urlSegment);
	            this.imageUrl.updateValue(category.imageUrl);
	            this.viewDisplayOrder.updateValue(category.viewDisplayOrder);
	        }
	        this.form = this.fb.group({
	            'id': this.id,
	            'name': this.name,
	            'urlSegment': this.urlSegment,
	            'imageUrl': this.imageUrl,
	            'viewDisplayOrder': this.viewDisplayOrder
	        });
	    };
	    CategoriesComponent.prototype.onFormSubmit = function (formValue) {
	        var _this = this;
	        if (formValue.id >= 0) {
	            this.api.updateCategory(formValue).subscribe(function (res) {
	                if (res.ok) {
	                    var updatedCategory_1 = res.json();
	                    var categoryIndex = _this.categories.findIndex(function (c) { return c.id === updatedCategory_1.id; });
	                    _this.categories[categoryIndex] = updatedCategory_1;
	                    _this.onCategoryClick(_this.categories[categoryIndex]);
	                }
	            }, function (err) { return _this.addErrors(err); });
	        }
	        else {
	            this.api.createCategory(formValue).subscribe(function (res) {
	                if (res.ok) {
	                    _this.categories.push(res.json());
	                    _this.onCategoryClick(_this.categories[_this.categories.length - 1]);
	                }
	            }, function (err) { return _this.addErrors(err); });
	        }
	    };
	    CategoriesComponent.prototype.onDeleteClick = function (id) {
	        var _this = this;
	        this.api.deleteCategory(id).subscribe(function (res) {
	            if (res.ok) {
	                _this.categories.splice(_this.categories.findIndex(function (c) { return c.id === id; }), 1);
	                _this.selectedCategory = null;
	                _this.form = null;
	            }
	            console.log(res);
	        }, function (err) { return _this.addErrors(err); });
	    };
	    CategoriesComponent.prototype.addErrors = function (errorResponse) {
	        this.errors = [];
	        console.warn(errorResponse);
	        for (var prop in errorResponse) {
	            if (errorResponse.hasOwnProperty(prop)) {
	                this.errors.push(errorResponse[prop]);
	            }
	        }
	    };
	    CategoriesComponent.prototype.clearErrors = function (index) {
	        if (typeof index === 'undefined') {
	            this.errors = [];
	        }
	        else {
	            this.errors.splice(index, 1);
	        }
	    };
	    CategoriesComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.sub = this.api.getCategories(/* include manufacturers */ false, /* include tags */ false)
	            .subscribe(function (res) {
	            _this.categories = res.json();
	        }, function (err) {
	            _this.addErrors(err);
	        });
	    };
	    CategoriesComponent.prototype.ngOnDestroy = function () {
	        this.sub.unsubscribe();
	    };
	    CategoriesComponent = __decorate([
	        core_1.Component({
	            selector: 'j-categories',
	            template: __webpack_require__(917),
	            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ApiService !== 'undefined' && shared_1.ApiService) === 'function' && _a) || Object, (typeof (_b = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _b) || Object])
	    ], CategoriesComponent);
	    return CategoriesComponent;
	    var _a, _b;
	}());
	exports.CategoriesComponent = CategoriesComponent;
	

/***/ },

/***/ 917:
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n\r\n    <!--category list-->\r\n    <div class=\"col-xs-3\">\r\n      <ul>\r\n        <li (click)=\"onCategoryClick(null)\">New Category</li>\r\n        <li *ngFor=\"let category of categories\" (click)=\"onCategoryClick(category)\">{{ category.name }}</li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!--category form-->\r\n    <div class=\"col-xs-9\">\r\n\r\n        <form novalidate *ngIf=\"form\" [formGroup]=\"form\" (ngSubmit)=\"onFormSubmit(form.value)\">\r\n\r\n          <!--header-->\r\n          <h5>\r\n            <span *ngIf=\"id.value >= 0\">Modifying category {{ selectedCategory.name }}</span>\r\n            <span *ngIf=\"id.value < 0\">Creating new category</span>\r\n          </h5>\r\n\r\n          <!--name-->\r\n          <div class=\"form-group\" [class.has-success]=\"name.valid && name.touched\"\r\n               [class.has-error]=\"!name.valid && name.touched\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"Name\" [formControl]=\"name\">\r\n            <small class=\"text-muted\" *ngIf=\"name.hasError('required') && name.touched\">\r\n              Name is required.\r\n            </small>\r\n          </div>\r\n\r\n          <!--url segment-->\r\n          <div class=\"form-group\" [class.has-success]=\"urlSegment.valid && urlSegment.touched\"\r\n               [class.has-error]=\"!urlSegment.valid && urlSegment.touched\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"Url segment\" [formControl]=\"urlSegment\">\r\n            <small class=\"text-muted\" *ngIf=\"urlSegment.hasError('required') && urlSegment.touched\">\r\n              Url segment is required.\r\n            </small>\r\n          </div>\r\n\r\n          <!--image url-->\r\n          <div class=\"form-group\" [class.has-success]=\"imageUrl.valid && imageUrl.touched\"\r\n               [class.has-error]=\"!imageUrl.valid && imageUrl.touched\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"Image url\" [formControl]=\"imageUrl\">\r\n            <small class=\"text-muted\" *ngIf=\"imageUrl.hasError('required') && imageUrl.touched\">\r\n              Image url is required.\r\n            </small>\r\n          </div>\r\n\r\n          <!--view display order-->\r\n          <div class=\"form-group\" [class.has-success]=\"viewDisplayOrder.valid && viewDisplayOrder.touched\"\r\n               [class.has-error]=\"!viewDisplayOrder.valid && viewDisplayOrder.touched\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"View display order\" [formControl]=\"viewDisplayOrder\">\r\n            <small class=\"text-muted\" *ngIf=\"viewDisplayOrder.hasError('required') && viewDisplayOrder.touched\">\r\n              View display order is required.\r\n            </small>\r\n            <small class=\"text-muted\" *ngIf=\"viewDisplayOrder.hasError('pattern') && viewDisplayOrder.touched\">\r\n              Field must be a number.\r\n            </small>\r\n          </div>\r\n\r\n          <!--submit button-->\r\n          <button type=\"submit\" [disabled]=\"!form.valid\" class=\"btn btn-primary\">\r\n            <span *ngIf=\"selectedCategory == null\">Create</span>\r\n            <span *ngIf=\"selectedCategory != null\">Update</span>\r\n          </button>\r\n\r\n          <!--delete button-->\r\n          <button type=\"button\" [disabled]=\"id.value < 0\" class=\"btn btn-warning\" (click)=\"onDeleteClick(id.value)\">\r\n            Delete\r\n          </button>\r\n\r\n        </form>\r\n\r\n      <!--error alerts-->\r\n      <div *ngIf=\"errors && errors.length > 0\">\r\n        <div class=\"alert alert-warning alert-dismissible fade in\" role=\"alert\"\r\n             *ngFor=\"let error of errors; let idx = index\">\r\n          <button type=\"button\" class=\"close\">\r\n            <span aria-hidden=\"true\" (click)=\"clearErrors(idx)\">&times;</span>\r\n          </button>\r\n          {{ error }}\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ },

/***/ 918:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(7);
	var throw_1 = __webpack_require__(920);
	Observable_1.Observable.throw = throw_1._throw;
	//# sourceMappingURL=throw.js.map

/***/ },

/***/ 919:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(7);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ErrorObservable = (function (_super) {
	    __extends(ErrorObservable, _super);
	    function ErrorObservable(error, scheduler) {
	        _super.call(this);
	        this.error = error;
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable that emits no items to the Observer and immediately
	     * emits an error notification.
	     *
	     * <span class="informal">Just emits 'error', and nothing else.
	     * </span>
	     *
	     * <img src="./img/throw.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the error notification. It can be used for composing with other
	     * Observables, such as in a {@link mergeMap}.
	     *
	     * @example <caption>Emit the number 7, then emit an error.</caption>
	     * var result = Rx.Observable.throw(new Error('oops!')).startWith(7);
	     * result.subscribe(x => console.log(x), e => console.error(e));
	     *
	     * @example <caption>Map and flattens numbers to the sequence 'a', 'b', 'c', but throw an error for 13</caption>
	     * var interval = Rx.Observable.interval(1000);
	     * var result = interval.mergeMap(x =>
	     *   x === 13 ?
	     *     Rx.Observable.throw('Thirteens are bad') :
	     *     Rx.Observable.of('a', 'b', 'c')
	     * );
	     * result.subscribe(x => console.log(x), e => console.error(e));
	     *
	     * @see {@link create}
	     * @see {@link empty}
	     * @see {@link never}
	     * @see {@link of}
	     *
	     * @param {any} error The particular Error to pass to the error notification.
	     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
	     * the emission of the error notification.
	     * @return {Observable} An error Observable: emits only the error notification
	     * using the given error argument.
	     * @static true
	     * @name throw
	     * @owner Observable
	     */
	    ErrorObservable.create = function (error, scheduler) {
	        return new ErrorObservable(error, scheduler);
	    };
	    ErrorObservable.dispatch = function (arg) {
	        var error = arg.error, subscriber = arg.subscriber;
	        subscriber.error(error);
	    };
	    ErrorObservable.prototype._subscribe = function (subscriber) {
	        var error = this.error;
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(ErrorObservable.dispatch, 0, {
	                error: error, subscriber: subscriber
	            });
	        }
	        else {
	            subscriber.error(error);
	        }
	    };
	    return ErrorObservable;
	}(Observable_1.Observable));
	exports.ErrorObservable = ErrorObservable;
	//# sourceMappingURL=ErrorObservable.js.map

/***/ },

/***/ 920:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ErrorObservable_1 = __webpack_require__(919);
	exports._throw = ErrorObservable_1.ErrorObservable.create;
	//# sourceMappingURL=throw.js.map

/***/ }

});
//# sourceMappingURL=admin.bundle.map