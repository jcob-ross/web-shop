var ac_admin =
webpackJsonpac__name_([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(418);
	var platform_browser_dynamic_1 = __webpack_require__(358);
	var platform_browser_1 = __webpack_require__(104);
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(278);
	var common_1 = __webpack_require__(38);
	var forms_1 = __webpack_require__(109);
	var admin_1 = __webpack_require__(734);
	var admin_2 = __webpack_require__(734);
	var shared_1 = __webpack_require__(177);
	var shared_2 = __webpack_require__(249);
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
	    shared_2.ProductEditorState,
	    admin_2.ProductAvailableGuard,
	    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
	])).catch(function (error) { return console.error("admin-main: " + error); });
	

/***/ },

/***/ 177:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(760));
	__export(__webpack_require__(766));
	

/***/ },

/***/ 249:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(754));
	

/***/ },

/***/ 734:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(735));
	__export(__webpack_require__(736));
	

/***/ },

/***/ 735:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(246);
	var AdminComponent = (function () {
	    function AdminComponent() {
	    }
	    AdminComponent = __decorate([
	        core_1.Component({
	            selector: 'admin-main',
	            template: __webpack_require__(768),
	            directives: [router_1.ROUTER_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AdminComponent);
	    return AdminComponent;
	}());
	exports.AdminComponent = AdminComponent;
	

/***/ },

/***/ 736:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var router_1 = __webpack_require__(246);
	var core_1 = __webpack_require__(1);
	var categories_1 = __webpack_require__(738);
	var manufacruters_1 = __webpack_require__(739);
	var tags_1 = __webpack_require__(755);
	var orders_1 = __webpack_require__(741);
	var products_1 = __webpack_require__(750);
	var shared_1 = __webpack_require__(249);
	var ProductAvailableGuard = (function () {
	    function ProductAvailableGuard(editorState, router) {
	        this.editorState = editorState;
	        this.router = router;
	    }
	    ProductAvailableGuard.prototype.canActivate = function () {
	        if (this.editorState.hasProduct && !this.editorState.isNewProduct) {
	            return true;
	        }
	        this.router.navigate(['/products/search']);
	        return false;
	    };
	    ProductAvailableGuard = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ProductEditorState !== 'undefined' && shared_1.ProductEditorState) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
	    ], ProductAvailableGuard);
	    return ProductAvailableGuard;
	    var _a, _b;
	}());
	exports.ProductAvailableGuard = ProductAvailableGuard;
	exports.routes = [
	    { path: 'categories', component: categories_1.CategoriesComponent },
	    { path: 'manufacturers', component: manufacruters_1.ManufacturersComponent },
	    { path: 'tags', component: tags_1.TagsComponent },
	    { path: 'orders', component: orders_1.OrdersComponent },
	    {
	        path: 'products', component: products_1.ProductsComponent,
	        children: [
	            { path: '', redirectTo: 'search', pathMatch: 'full' },
	            { path: 'search', component: products_1.ProductSearchComponent },
	            { path: 'edit', component: products_1.EditProductComponent },
	            { path: 'tags', component: products_1.EditTagsComponent, canActivate: [ProductAvailableGuard] },
	            { path: 'detail', component: products_1.EditDetailsComponent, canActivate: [ProductAvailableGuard] }
	        ]
	    },
	    { path: '', redirectTo: 'products/search', pathMatch: 'full' }
	];
	exports.ADMIN_ROUTER_PROVIDERS = [router_1.provideRouter(exports.routes)];
	

/***/ },

/***/ 737:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(109);
	var shared_1 = __webpack_require__(177);
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
	            template: __webpack_require__(769),
	            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ApiService !== 'undefined' && shared_1.ApiService) === 'function' && _a) || Object, (typeof (_b = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _b) || Object])
	    ], CategoriesComponent);
	    return CategoriesComponent;
	    var _a, _b;
	}());
	exports.CategoriesComponent = CategoriesComponent;
	

/***/ },

/***/ 738:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(737));
	

/***/ },

/***/ 739:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(740));
	

/***/ },

/***/ 740:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(109);
	var shared_1 = __webpack_require__(177);
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
	            template: __webpack_require__(770),
	            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ApiService !== 'undefined' && shared_1.ApiService) === 'function' && _a) || Object, (typeof (_b = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _b) || Object])
	    ], ManufacturersComponent);
	    return ManufacturersComponent;
	    var _a, _b;
	}());
	exports.ManufacturersComponent = ManufacturersComponent;
	

/***/ },

/***/ 741:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(742));
	

/***/ },

/***/ 742:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var OrdersComponent = (function () {
	    function OrdersComponent() {
	    }
	    OrdersComponent = __decorate([
	        core_1.Component({
	            selector: 'j-orders',
	            template: __webpack_require__(771)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], OrdersComponent);
	    return OrdersComponent;
	}());
	exports.OrdersComponent = OrdersComponent;
	

/***/ },

/***/ 743:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var platform_browser_1 = __webpack_require__(104);
	var forms_1 = __webpack_require__(109);
	var shared_1 = __webpack_require__(177);
	var shared_2 = __webpack_require__(249);
	var textarea_auto_adjust_directive_1 = __webpack_require__(745);
	var EditDetailsComponent = (function () {
	    function EditDetailsComponent(api, fb, editorState, sanitizer) {
	        this.api = api;
	        this.fb = fb;
	        this.editorState = editorState;
	        this.sanitizer = sanitizer;
	        // validation helper form view
	        this.markupMaxLength = 30000;
	        this.preview = null;
	    }
	    EditDetailsComponent.prototype.onSubmit = function (formValue) {
	        var _this = this;
	        if (this.id.value > 0) {
	            this.api.updateProductDetail(this.parentProductId.value, formValue)
	                .subscribe(function (res) {
	                var detail = res.json();
	                _this.createForm(detail);
	            });
	        }
	        else {
	            this.api.createProductDetail(this.parentProductId.value, formValue)
	                .subscribe(function (res) {
	                var detail = res.json();
	                _this.createForm(detail);
	            });
	        }
	    };
	    EditDetailsComponent.prototype.onPreviewClick = function (formValue) {
	        var _this = this;
	        this.api.getMarkdownPreview(formValue)
	            .subscribe(function (res) {
	            var markup = res.json().markup;
	            _this.preview = _this.sanitizer.bypassSecurityTrustHtml(markup);
	        }, function (err) { return console.log(err); });
	    };
	    EditDetailsComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.product = this.editorState.currentProduct;
	        this.detailSub = this.api.getProductDetail(this.product.id)
	            .subscribe(function (res) {
	            var detail = res.json();
	            _this.createForm(detail);
	        }, function (err) {
	            _this.createForm();
	        });
	    };
	    EditDetailsComponent.prototype.ngOnDestroy = function () {
	        if (this.detailSub && this.detailSub.unsubscribe) {
	            this.detailSub.unsubscribe();
	        }
	        if (this.createSub && this.createSub.unsubscribe) {
	            this.createSub.unsubscribe();
	        }
	        if (this.updateSub && this.updateSub.unsubscribe) {
	            this.updateSub.unsubscribe();
	        }
	    };
	    EditDetailsComponent.prototype.createForm = function (productDetail) {
	        this.productDetail = null;
	        this.id = new forms_1.FormControl(-1);
	        this.markup = new forms_1.FormControl('', forms_1.Validators.maxLength(this.markupMaxLength));
	        this.parentProductId = new forms_1.FormControl(this.product.id);
	        if (productDetail !== null && typeof productDetail !== 'undefined') {
	            this.productDetail = productDetail;
	            this.id.updateValue(productDetail.id);
	            this.markup.updateValue(productDetail.markup);
	            this.parentProductId.updateValue(productDetail.parentProductId);
	        }
	        this.form = this.fb.group({
	            'id': this.id,
	            'markup': this.markup,
	            'parentProductId': this.parentProductId
	        });
	    };
	    EditDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'j-details',
	            template: __webpack_require__(772),
	            directives: [forms_1.REACTIVE_FORM_DIRECTIVES, textarea_auto_adjust_directive_1.AutoAdjustTextareaDirective]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ApiService !== 'undefined' && shared_1.ApiService) === 'function' && _a) || Object, (typeof (_b = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _b) || Object, (typeof (_c = typeof shared_2.ProductEditorState !== 'undefined' && shared_2.ProductEditorState) === 'function' && _c) || Object, (typeof (_d = typeof platform_browser_1.DomSanitizationService !== 'undefined' && platform_browser_1.DomSanitizationService) === 'function' && _d) || Object])
	    ], EditDetailsComponent);
	    return EditDetailsComponent;
	    var _a, _b, _c, _d;
	}());
	exports.EditDetailsComponent = EditDetailsComponent;
	

/***/ },

/***/ 744:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(743));
	

/***/ },

/***/ 745:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var AutoAdjustTextareaDirective = (function () {
	    function AutoAdjustTextareaDirective(element) {
	        this.element = element;
	    }
	    AutoAdjustTextareaDirective.prototype.onInput = function (textArea) {
	        this.adjust();
	    };
	    AutoAdjustTextareaDirective.prototype.ngOnInit = function () {
	        this.adjust();
	    };
	    AutoAdjustTextareaDirective.prototype.adjust = function () {
	        this.element.nativeElement.style.overflow = 'hidden';
	        this.element.nativeElement.style.height = 'auto';
	        this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + "px";
	    };
	    __decorate([
	        core_1.HostListener('input', ['$event.target']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], AutoAdjustTextareaDirective.prototype, "onInput", null);
	    AutoAdjustTextareaDirective = __decorate([
	        core_1.Directive({
	            selector: 'textarea[auto-adjust]'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
	    ], AutoAdjustTextareaDirective);
	    return AutoAdjustTextareaDirective;
	    var _a;
	}());
	exports.AutoAdjustTextareaDirective = AutoAdjustTextareaDirective;
	

/***/ },

/***/ 746:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(109);
	var shared_1 = __webpack_require__(177);
	var shared_2 = __webpack_require__(249);
	var fieldRules = {
	    name: { minLength: 3, maxLength: 100 },
	    description: { minLength: 3, maxLength: 200 },
	    imageUrl: { maxLength: 2500 }
	};
	function categoryValidator(control) {
	    if (control.value < 0) {
	        return { invalidCategory: true };
	    }
	}
	function manufacturerValidator(control) {
	    if (control.value < 0) {
	        return { invalidManufacturer: true };
	    }
	}
	var EditProductComponent = (function () {
	    function EditProductComponent(api, fb, editorState) {
	        this.api = api;
	        this.fb = fb;
	        this.editorState = editorState;
	        this.showConfirmDelete = false;
	        // view helper for error messages
	        this.fieldRules = fieldRules;
	    }
	    EditProductComponent.prototype.createForm = function (product) {
	        this.product = null;
	        this.id = new forms_1.FormControl(-1);
	        this.name = new forms_1.FormControl('', forms_1.Validators.compose([
	            forms_1.Validators.required,
	            forms_1.Validators.minLength(fieldRules.name.minLength),
	            forms_1.Validators.maxLength(fieldRules.name.maxLength)
	        ]));
	        this.description = new forms_1.FormControl('', forms_1.Validators.compose([
	            forms_1.Validators.required,
	            forms_1.Validators.minLength(fieldRules.description.minLength),
	            forms_1.Validators.maxLength(fieldRules.description.maxLength)
	        ]));
	        this.stockCount = new forms_1.FormControl(0, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[0-9]+')]));
	        this.price = new forms_1.FormControl(0, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[0-9]+')]));
	        this.currentPrice = new forms_1.FormControl(0, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[0-9]+')]));
	        this.productNumber = new forms_1.FormControl('will be assigned');
	        this.imageUrl = new forms_1.FormControl('', forms_1.Validators.compose([
	            forms_1.Validators.required,
	            forms_1.Validators.maxLength(fieldRules.imageUrl.maxLength),
	        ]));
	        this.newProduct = new forms_1.FormControl(false, forms_1.Validators.required);
	        this.promoActive = new forms_1.FormControl(false, forms_1.Validators.required);
	        this.manufacturerId = new forms_1.FormControl(-1, forms_1.Validators.compose([forms_1.Validators.required, manufacturerValidator]));
	        this.parentCategoryId = new forms_1.FormControl(-1, forms_1.Validators.compose([forms_1.Validators.required, categoryValidator]));
	        if (product !== null && typeof product !== 'undefined') {
	            this.product = product;
	            this.id.updateValue(product.id);
	            this.name.updateValue(product.name);
	            this.description.updateValue(product.description);
	            this.stockCount.updateValue(product.stockCount);
	            this.price.updateValue(product.price);
	            this.currentPrice.updateValue(product.currentPrice);
	            this.productNumber.updateValue(product.productNumber);
	            this.imageUrl.updateValue(product.imageUrl);
	            this.newProduct.updateValue(product.newProduct);
	            this.promoActive.updateValue(product.promoActive);
	            this.manufacturerId.updateValue(product.manufacturerId);
	            this.parentCategoryId.updateValue(product.parentCategoryId);
	        }
	        this.form = this.fb.group({
	            'id': this.id,
	            'name': this.name,
	            'description': this.description,
	            'stockCount': this.stockCount,
	            'price': this.price,
	            'currentPrice': this.currentPrice,
	            'productNumber': this.productNumber,
	            'imageUrl': this.imageUrl,
	            'newProduct': this.newProduct,
	            'promoActive': this.promoActive,
	            'manufacturerId': this.manufacturerId,
	            'parentCategoryId': this.parentCategoryId
	        });
	    };
	    EditProductComponent.prototype.onFormSubmit = function (formValue) {
	        var _this = this;
	        var id = this.id.value;
	        if (id > 0) {
	            // updating product
	            this.api.updateProduct(formValue)
	                .subscribe(function (res) {
	                var prod = res.json();
	                _this.editorState.currentProduct = prod;
	                var updatedProductIndex = _this.editorState.searchResult.findIndex(function (p) { return p.id === id; });
	                _this.editorState.searchResult.splice(updatedProductIndex, 1, prod);
	            }, function (err) { return _this.addErrors(err); });
	        }
	        else {
	            // creating product
	            this.api.createProduct(formValue)
	                .subscribe(function (res) {
	                var prod = res.json();
	                _this.editorState.currentProduct = prod;
	                _this.createForm(prod);
	            }, function (err) {
	                _this.addErrors(err);
	            });
	        }
	    };
	    EditProductComponent.prototype.onDeleteClick = function (id) {
	        this.showConfirmDelete = true;
	    };
	    EditProductComponent.prototype.onConfirmOk = function () {
	        var _this = this;
	        this.showConfirmDelete = false;
	        var id = this.id.value;
	        this.api.deleteProduct(id)
	            .subscribe(function (res) {
	            _this.onClearFormClick();
	            var deletedProductIndex = _this.editorState.searchResult.findIndex(function (p) { return p.id === id; });
	            _this.editorState.searchResult.splice(deletedProductIndex, 1);
	        }, function (err) { return _this.addErrors(err); });
	    };
	    EditProductComponent.prototype.onConfirmCancel = function () {
	        this.showConfirmDelete = false;
	    };
	    EditProductComponent.prototype.onCategorySelect = function (category) {
	        this.parentCategoryId.updateValue(category.id);
	        this.manufacturers = category.manufacturers;
	        this.manufacturerId.updateValue(-1);
	    };
	    EditProductComponent.prototype.onManufacturerSelect = function (man) {
	        this.manufacturerId.updateValue(man.id);
	    };
	    EditProductComponent.prototype.onClearFormClick = function () {
	        this.editorState.clearCurrentProduct();
	        this.createForm();
	        this.fetchCategories();
	    };
	    EditProductComponent.prototype.ngOnInit = function () {
	        if (!this.editorState.hasProduct) {
	            this.createForm();
	            this.fetchCategories();
	        }
	        else {
	            var product = this.editorState.currentProduct;
	            this.createForm(product);
	        }
	    };
	    EditProductComponent.prototype.ngOnDestroy = function () {
	        if (this.productSub && this.productSub.unsubscribe) {
	            this.productSub.unsubscribe();
	        }
	        if (this.categoriesSub && this.categoriesSub.unsubscribe) {
	            this.categoriesSub.unsubscribe();
	        }
	    };
	    EditProductComponent.prototype.fetchCategories = function () {
	        var _this = this;
	        this.api.getCategories(/*include manufacturers*/ true, /*include tags*/ false)
	            .subscribe(function (res) {
	            _this.categories = res.json();
	            _this.manufacturers = [];
	        }, function (err) {
	            return _this.addErrors(err);
	        });
	    };
	    EditProductComponent.prototype.addErrors = function (errorResponse) {
	        this.errors = [];
	        if (errorResponse.constructor === Array) {
	            this.errors = errorResponse;
	            return;
	        }
	        for (var prop in errorResponse) {
	            if (errorResponse.hasOwnProperty(prop)) {
	                this.errors.push(errorResponse[prop]);
	            }
	        }
	    };
	    EditProductComponent = __decorate([
	        core_1.Component({
	            selector: 'j-edit-product',
	            template: __webpack_require__(773),
	            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ApiService !== 'undefined' && shared_1.ApiService) === 'function' && _a) || Object, (typeof (_b = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _b) || Object, (typeof (_c = typeof shared_2.ProductEditorState !== 'undefined' && shared_2.ProductEditorState) === 'function' && _c) || Object])
	    ], EditProductComponent);
	    return EditProductComponent;
	    var _a, _b, _c;
	}());
	exports.EditProductComponent = EditProductComponent;
	

/***/ },

/***/ 747:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(746));
	

/***/ },

/***/ 748:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(109);
	var shared_1 = __webpack_require__(177);
	var shared_2 = __webpack_require__(249);
	var EditTagsComponent = (function () {
	    function EditTagsComponent(api, editorState) {
	        this.api = api;
	        this.editorState = editorState;
	        this.addTagSub = null;
	        this.removeTagSub = null;
	    }
	    EditTagsComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.product = this.editorState.currentProduct;
	        this.assignedTags = this.product.tags;
	        this.tagsSub = this.api.getCategoryTags(this.product.parentCategoryId)
	            .subscribe(function (res) {
	            _this.availableTags = res.json();
	            _this.availableTags.map(function (t) {
	                // mark already added tags as added for css
	                var currentTag = _this.assignedTags.find(function (at) { return at.id === t.id; });
	                if (typeof currentTag !== 'undefined') {
	                    t.added = true;
	                }
	                return t;
	            });
	        }, function (err) { return _this.addErrors(err); });
	    };
	    EditTagsComponent.prototype.ngOnDestroy = function () {
	        this.tagsSub.unsubscribe();
	        if (this.addTagSub !== null) {
	            this.addTagSub.unsubscribe();
	            this.addTagSub = null;
	        }
	        if (this.removeTagSub !== null) {
	            this.removeTagSub.unsubscribe();
	            this.removeTagSub = null;
	        }
	    };
	    EditTagsComponent.prototype.addTag = function (tag) {
	        var _this = this;
	        if (tag.added) {
	            return;
	        }
	        if (this.addTagSub !== null) {
	            this.addTagSub.unsubscribe();
	        }
	        this.addTagSub = this.api.addTagToProduct(this.product.id, tag.id)
	            .subscribe(function (res) {
	            tag.added = true;
	            _this.editorState.currentProduct.tags.push(tag);
	            _this.product = _this.editorState.currentProduct;
	        }, function (err) { return _this.addErrors(err); });
	    };
	    EditTagsComponent.prototype.removeTag = function (tag) {
	        var _this = this;
	        if (this.removeTagSub !== null) {
	            this.removeTagSub.unsubscribe();
	        }
	        this.removeTagSub = this.api.removeTagFromProduct(this.product.id, tag.id)
	            .subscribe(function (res) {
	            var tagIndex = _this.editorState.currentProduct.tags.findIndex(function (t) { return t.id === tag.id; });
	            var availableTagIndex = _this.availableTags.findIndex(function (t) { return t.id === tag.id; });
	            _this.availableTags[availableTagIndex].added = false;
	            _this.editorState.currentProduct.tags.splice(tagIndex, 1);
	            _this.product = _this.editorState.currentProduct;
	        }, function (err) { return _this.addErrors(err); });
	    };
	    EditTagsComponent.prototype.addErrors = function (errorResponse) {
	        this.errors = [];
	        console.warn(errorResponse);
	        for (var prop in errorResponse) {
	            if (errorResponse.hasOwnProperty(prop)) {
	                this.errors.push(errorResponse[prop]);
	            }
	        }
	    };
	    EditTagsComponent.prototype.clearErrors = function (index) {
	        if (typeof index === 'undefined') {
	            this.errors = [];
	        }
	        else {
	            this.errors.splice(index, 1);
	        }
	    };
	    EditTagsComponent = __decorate([
	        core_1.Component({
	            selector: 'j-tags',
	            template: __webpack_require__(774),
	            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ApiService !== 'undefined' && shared_1.ApiService) === 'function' && _a) || Object, (typeof (_b = typeof shared_2.ProductEditorState !== 'undefined' && shared_2.ProductEditorState) === 'function' && _b) || Object])
	    ], EditTagsComponent);
	    return EditTagsComponent;
	    var _a, _b;
	}());
	exports.EditTagsComponent = EditTagsComponent;
	

/***/ },

/***/ 749:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(748));
	

/***/ },

/***/ 750:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(753));
	__export(__webpack_require__(744));
	__export(__webpack_require__(747));
	__export(__webpack_require__(749));
	__export(__webpack_require__(751));
	

/***/ },

/***/ 751:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(752));
	

/***/ },

/***/ 752:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(246);
	var forms_1 = __webpack_require__(109);
	__webpack_require__(421);
	__webpack_require__(424);
	__webpack_require__(423);
	__webpack_require__(422);
	var shared_1 = __webpack_require__(177);
	var shared_2 = __webpack_require__(249);
	var ProductSearchComponent = (function () {
	    function ProductSearchComponent(api, fb, editorState, router) {
	        this.api = api;
	        this.fb = fb;
	        this.editorState = editorState;
	        this.router = router;
	        this.searching = false;
	        this.maxResults = 20;
	        this.maxLength = 30;
	        this.minLength = 3;
	        this.debounceTimeMs = 400;
	    }
	    ProductSearchComponent.prototype.createForm = function () {
	        var _this = this;
	        this.searching = false;
	        this.term = new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.minLength(this.minLength), forms_1.Validators.maxLength(this.maxLength)]));
	        this.form = this.fb.group({
	            'term': this.term
	        });
	        this.searchSub = this.term.valueChanges
	            .map(function (term) { return term.trim(); })
	            .filter(function (term) { return term.length >= _this.minLength && term.length <= _this.maxLength; })
	            .distinctUntilChanged()
	            .do(function () { return _this.searching = true; })
	            .debounceTime(this.debounceTimeMs)
	            .switchMap(function (term) { return _this.api.searchProducts(term, _this.maxResults); })
	            .do(function () { return _this.searching = false; })
	            .subscribe(function (res) {
	            _this.products = res.json();
	        }, function (err) { return _this.addErrors(err); });
	    };
	    ProductSearchComponent.prototype.onProductClick = function (product) {
	        this.editorState.currentProduct = product;
	    };
	    ProductSearchComponent.prototype.onLinkClick = function (route, product) {
	        this.editorState.currentProduct = product;
	        this.router.navigateByUrl(route);
	    };
	    ProductSearchComponent.prototype.ngOnInit = function () {
	        this.createForm();
	        if (this.editorState.searchResult && this.editorState.searchResult.length > 0) {
	            this.products = this.editorState.searchResult;
	        }
	    };
	    ProductSearchComponent.prototype.ngOnDestroy = function () {
	        this.searchSub.unsubscribe();
	        this.editorState.searchResult = this.products;
	    };
	    ProductSearchComponent.prototype.addErrors = function (errorResponse) {
	        this.errors = [];
	        console.warn(errorResponse);
	        for (var prop in errorResponse) {
	            if (errorResponse.hasOwnProperty(prop)) {
	                this.errors.push(errorResponse[prop]);
	            }
	        }
	    };
	    ProductSearchComponent = __decorate([
	        core_1.Component({
	            selector: 'j-search',
	            template: __webpack_require__(775),
	            directives: [forms_1.REACTIVE_FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ApiService !== 'undefined' && shared_1.ApiService) === 'function' && _a) || Object, (typeof (_b = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _b) || Object, (typeof (_c = typeof shared_2.ProductEditorState !== 'undefined' && shared_2.ProductEditorState) === 'function' && _c) || Object, (typeof (_d = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _d) || Object])
	    ], ProductSearchComponent);
	    return ProductSearchComponent;
	    var _a, _b, _c, _d;
	}());
	exports.ProductSearchComponent = ProductSearchComponent;
	

/***/ },

/***/ 753:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var router_1 = __webpack_require__(246);
	var shared_1 = __webpack_require__(249);
	var ProductsComponent = (function () {
	    function ProductsComponent(editorState) {
	        this.editorState = editorState;
	    }
	    Object.defineProperty(ProductsComponent.prototype, "noProductSelected", {
	        get: function () {
	            return !this.editorState.hasProduct && this.editorState.isNewProduct;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ProductsComponent.prototype.ngOnInit = function () {
	    };
	    ProductsComponent.prototype.ngOnDestroy = function () {
	        this.editorState.clearCurrentProduct();
	        this.editorState.clearSearchResult();
	    };
	    ProductsComponent = __decorate([
	        core_1.Component({
	            selector: 'j-products',
	            template: __webpack_require__(776),
	            directives: [router_1.ROUTER_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ProductEditorState !== 'undefined' && shared_1.ProductEditorState) === 'function' && _a) || Object])
	    ], ProductsComponent);
	    return ProductsComponent;
	    var _a;
	}());
	exports.ProductsComponent = ProductsComponent;
	

/***/ },

/***/ 754:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var ProductEditorState = (function () {
	    function ProductEditorState() {
	        this.searchResult = [];
	        this._currentProduct = null;
	    }
	    ProductEditorState.prototype.clearCurrentProduct = function () {
	        this._currentProduct = null;
	    };
	    ProductEditorState.prototype.clearSearchResult = function () {
	        this.searchResult = [];
	    };
	    Object.defineProperty(ProductEditorState.prototype, "currentProduct", {
	        get: function () {
	            return this._currentProduct;
	        },
	        set: function (item) {
	            this._currentProduct = item;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ProductEditorState.prototype, "isNewProduct", {
	        get: function () {
	            if (this.currentProduct === null) {
	                return true;
	            }
	            return this.currentProduct.id < 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ProductEditorState.prototype, "hasProduct", {
	        get: function () {
	            return this.currentProduct !== null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ProductEditorState = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], ProductEditorState);
	    return ProductEditorState;
	}());
	exports.ProductEditorState = ProductEditorState;
	

/***/ },

/***/ 755:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(756));
	

/***/ },

/***/ 756:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var forms_1 = __webpack_require__(109);
	var shared_1 = __webpack_require__(177);
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
	            template: __webpack_require__(777),
	            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof shared_1.ApiService !== 'undefined' && shared_1.ApiService) === 'function' && _a) || Object, (typeof (_b = typeof forms_1.FormBuilder !== 'undefined' && forms_1.FormBuilder) === 'function' && _b) || Object])
	    ], TagsComponent);
	    return TagsComponent;
	    var _a, _b;
	}());
	exports.TagsComponent = TagsComponent;
	

/***/ },

/***/ 759:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(278);
	var Observable_1 = __webpack_require__(5);
	__webpack_require__(419);
	__webpack_require__(778);
	__webpack_require__(420);
	var BASE_URL = 'http://localhost:8080';
	var ApiService = (function () {
	    function ApiService(http) {
	        this.http = http;
	    }
	    /**
	     * Product
	     */
	    ApiService.prototype.searchProducts = function (term, maxResults) {
	        var _this = this;
	        var params = new http_1.URLSearchParams();
	        params.set('term', "" + term);
	        params.set('count', "" + maxResults);
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Get,
	            url: BASE_URL + "/api/product/search",
	            search: params
	        }).catch(function (err) { return _this.handleError(err); });
	    };
	    ApiService.prototype.getProduct = function (id) {
	        var _this = this;
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Get,
	            url: BASE_URL + "/api/product/" + id
	        }).catch(function (err) { return _this.handleError(err); });
	    };
	    ApiService.prototype.createProduct = function (product) {
	        var _this = this;
	        product.productNumber = -1; // otherwise bad request ( form used value 'will be assigned'
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Post,
	            url: BASE_URL + "/api/product",
	            body: product
	        }).catch(function (err) { return _this.handleError(err); });
	    };
	    ApiService.prototype.updateProduct = function (product) {
	        var _this = this;
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Put,
	            url: BASE_URL + "/api/product/" + product.id,
	            body: product
	        }).catch(function (err) { return _this.handleError(err); });
	    };
	    ApiService.prototype.deleteProduct = function (id) {
	        var _this = this;
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Delete,
	            url: BASE_URL + "/api/product/" + id
	        }).catch(function (err) { return _this.handleError(err); });
	    };
	    ApiService.prototype.addTagToProduct = function (productId, tagId) {
	        var _this = this;
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Put,
	            url: BASE_URL + "/api/product/" + productId + "/add-tag/" + tagId
	        }).catch(function (err) { return _this.handleError(err); });
	    };
	    ApiService.prototype.removeTagFromProduct = function (productId, tagId) {
	        var _this = this;
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Delete,
	            url: BASE_URL + "/api/product/" + productId + "/remove-tag/" + tagId
	        }).catch(function (err) { return _this.handleError(err); });
	    };
	    /**
	     * Product detail
	     */
	    ApiService.prototype.getProductDetail = function (productId) {
	        var _this = this;
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Get,
	            url: BASE_URL + "/api/product/" + productId + "/detail"
	        }).catch(function (err) { return _this.handleError(err); });
	    };
	    ApiService.prototype.createProductDetail = function (productId, model) {
	        var _this = this;
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Post,
	            url: BASE_URL + "/api/product/" + productId + "/detail",
	            body: model
	        }).catch(function (err) { return _this.handleError(err); });
	    };
	    ApiService.prototype.updateProductDetail = function (productId, model) {
	        var _this = this;
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Put,
	            url: BASE_URL + "/api/product/" + productId + "/detail",
	            body: model
	        }).catch(function (err) { return _this.handleError(err); });
	    };
	    ApiService.prototype.deleteProductDetail = function (productId) {
	        var _this = this;
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Delete,
	            url: BASE_URL + "/api/product/" + productId + "/detail",
	        }).catch(function (err) { return _this.handleError(err); });
	    };
	    ApiService.prototype.getMarkdownPreview = function (model) {
	        var _this = this;
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Post,
	            url: BASE_URL + "/api/product-detail/preview-markdown",
	            body: model
	        }).catch(function (err) { return _this.handleError(err); });
	    };
	    /**
	     *  Category
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
	     *  Tags
	     */
	    ApiService.prototype.getCategoryTags = function (categoryId) {
	        var _this = this;
	        return this.jsonRequest({
	            method: http_1.RequestMethod.Get,
	            url: BASE_URL + "/api/tag/list/category/" + categoryId
	        }).catch(function (err) { return _this.handleError(err); });
	    };
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
	        return this.http.request(new http_1.Request(options)).catch(this.handleError);
	    };
	    ApiService.prototype.handleError = function (error) {
	        // let errorObject: IErrorObject = { error: 'Unknown error occurred', status: error.status };
	        // let contentTypeHeader = error.headers.get('Content-Type');
	        // if (contentTypeHeader && contentTypeHeader.includes('application/json')) {
	        //   errorObject = error.json();
	        // }
	        // console.log(errorObject);
	        console.log(error);
	        var errorMessage = (error.message) ? error.message : error.status ?
	            error.status + " - " + error.statusText : 'Server error';
	        return Observable_1.Observable.throw(errorMessage);
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

/***/ 760:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(759));
	

/***/ },

/***/ 761:
/***/ function(module, exports) {

	"use strict";
	var Category = (function () {
	    function Category() {
	    }
	    return Category;
	}());
	exports.Category = Category;
	

/***/ },

/***/ 762:
/***/ function(module, exports) {

	"use strict";
	var Manufacturer = (function () {
	    function Manufacturer() {
	    }
	    return Manufacturer;
	}());
	exports.Manufacturer = Manufacturer;
	

/***/ },

/***/ 763:
/***/ function(module, exports) {

	"use strict";
	var Product = (function () {
	    function Product() {
	        this.tags = [];
	    }
	    return Product;
	}());
	exports.Product = Product;
	

/***/ },

/***/ 764:
/***/ function(module, exports) {

	"use strict";
	var ProductDetail = (function () {
	    function ProductDetail() {
	    }
	    return ProductDetail;
	}());
	exports.ProductDetail = ProductDetail;
	

/***/ },

/***/ 765:
/***/ function(module, exports) {

	"use strict";
	var Tag = (function () {
	    function Tag() {
	        /**
	         * Client-side, indicates whether tag was added to working product
	         * Used in edit-tags.component
	         */
	        this.added = false;
	    }
	    return Tag;
	}());
	exports.Tag = Tag;
	

/***/ },

/***/ 766:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(761));
	__export(__webpack_require__(765));
	__export(__webpack_require__(762));
	__export(__webpack_require__(763));
	__export(__webpack_require__(764));
	

/***/ },

/***/ 768:
/***/ function(module, exports) {

	module.exports = "<ul class=\"nav nav-tabs\">\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" [routerLink]=\" ['./products'] \" routerLinkActive=\"active\">Products</a>\r\n  </li>\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" [routerLink]=\" ['./categories'] \" routerLinkActive=\"active\">Categories</a>\r\n  </li>\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" [routerLink]=\" ['./manufacturers'] \" routerLinkActive=\"active\">Manufacturers</a>\r\n  </li>\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" [routerLink]=\" ['./tags'] \" routerLinkActive=\"active\">Tags</a>\r\n  </li>\r\n  <li class=\"nav-item\">\r\n    <a class=\"nav-link\" [routerLink]=\" ['./orders'] \" routerLinkActive=\"active\">Orders</a>\r\n  </li>  \r\n</ul>\r\n\r\n<br/>\r\n\r\n<router-outlet></router-outlet>"

/***/ },

/***/ 769:
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n\r\n    <!--category list-->\r\n    <div class=\"col-xs-3\">\r\n      <ul>\r\n        <li (click)=\"onCategoryClick(null)\">New Category</li>\r\n        <li *ngFor=\"let category of categories\" (click)=\"onCategoryClick(category)\">{{ category.name }}</li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!--category form-->\r\n    <div class=\"col-xs-9\">\r\n\r\n        <form novalidate *ngIf=\"form\" [formGroup]=\"form\" (ngSubmit)=\"onFormSubmit(form.value)\">\r\n\r\n          <!--header-->\r\n          <h5>\r\n            <span *ngIf=\"id.value >= 0\">Modifying category {{ selectedCategory.name }}</span>\r\n            <span *ngIf=\"id.value < 0\">Creating new category</span>\r\n          </h5>\r\n\r\n          <!--name-->\r\n          <div class=\"form-group\" [class.has-success]=\"name.valid && name.touched\"\r\n               [class.has-error]=\"!name.valid && name.touched\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"Name\" [formControl]=\"name\">\r\n            <small class=\"text-muted\" *ngIf=\"name.hasError('required') && name.touched\">\r\n              Name is required.\r\n            </small>\r\n          </div>\r\n\r\n          <!--url segment-->\r\n          <div class=\"form-group\" [class.has-success]=\"urlSegment.valid && urlSegment.touched\"\r\n               [class.has-error]=\"!urlSegment.valid && urlSegment.touched\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"Url segment\" [formControl]=\"urlSegment\">\r\n            <small class=\"text-muted\" *ngIf=\"urlSegment.hasError('required') && urlSegment.touched\">\r\n              Url segment is required.\r\n            </small>\r\n          </div>\r\n\r\n          <!--image url-->\r\n          <div class=\"form-group\" [class.has-success]=\"imageUrl.valid && imageUrl.touched\"\r\n               [class.has-error]=\"!imageUrl.valid && imageUrl.touched\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"Image url\" [formControl]=\"imageUrl\">\r\n            <small class=\"text-muted\" *ngIf=\"imageUrl.hasError('required') && imageUrl.touched\">\r\n              Image url is required.\r\n            </small>\r\n          </div>\r\n\r\n          <!--view display order-->\r\n          <div class=\"form-group\" [class.has-success]=\"viewDisplayOrder.valid && viewDisplayOrder.touched\"\r\n               [class.has-error]=\"!viewDisplayOrder.valid && viewDisplayOrder.touched\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"View display order\" [formControl]=\"viewDisplayOrder\">\r\n            <small class=\"text-muted\" *ngIf=\"viewDisplayOrder.hasError('required') && viewDisplayOrder.touched\">\r\n              View display order is required.\r\n            </small>\r\n            <small class=\"text-muted\" *ngIf=\"viewDisplayOrder.hasError('pattern') && viewDisplayOrder.touched\">\r\n              Field must be a number.\r\n            </small>\r\n          </div>\r\n\r\n          <!--submit button-->\r\n          <button type=\"submit\" [disabled]=\"!form.valid\" class=\"btn btn-primary\">\r\n            <span *ngIf=\"selectedCategory == null\">Create</span>\r\n            <span *ngIf=\"selectedCategory != null\">Update</span>\r\n          </button>\r\n\r\n          <!--delete button-->\r\n          <button type=\"button\" [disabled]=\"id.value < 0\" class=\"btn btn-warning\" (click)=\"onDeleteClick(id.value)\">\r\n            Delete\r\n          </button>\r\n\r\n        </form>\r\n\r\n      <!--error alerts-->\r\n      <div *ngIf=\"errors && errors.length > 0\">\r\n        <div class=\"alert alert-warning alert-dismissible fade in\" role=\"alert\"\r\n             *ngFor=\"let error of errors; let idx = index\">\r\n          <button type=\"button\" class=\"close\">\r\n            <span aria-hidden=\"true\" (click)=\"clearErrors(idx)\">&times;</span>\r\n          </button>\r\n          {{ error }}\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ },

/***/ 770:
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n\r\n    <!--category list-->\r\n    <div class=\"col-xs-3\">\r\n      <ul>\r\n        <li *ngFor=\"let category of categories\" (click)=\"onCategoryClick(category)\">\r\n          {{ category.name }}\r\n          <ul *ngIf=\"category.manufacturers.length > 0\">\r\n            <li *ngFor=\"let manufacturer of category.manufacturers\"\r\n                (click)=\"onManufacturerClick(category, manufacturer); $event.stopPropagation()\">\r\n              {{ manufacturer.name }}\r\n            </li>\r\n          </ul>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!--manufacturer form-->\r\n    <div class=\"col-xs-9\">\r\n\r\n      <form novalidate *ngIf=\"form\" [formGroup]=\"form\" (ngSubmit)=\"onFormSubmit(form.value)\">\r\n\r\n        <!--header-->\r\n        <h5 *ngIf=\"selectedCategory\">\r\n          <span *ngIf=\"id.value >= 0\">Modifying manufacturer {{ selectedManufacturer.name }} in category {{ selectedCategory.name }}</span>\r\n          <span *ngIf=\"id.value < 0\">Creating new manufacturer in category {{ selectedCategory.name }}</span>\r\n        </h5>\r\n\r\n        <!--name-->\r\n        <div class=\"form-group row\" [class.has-success]=\"name.valid && name.touched\"\r\n             [class.has-error]=\"!name.valid && name.touched\">\r\n          <div class=\"col-xs-7\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"Name\" [formControl]=\"name\">\r\n            <small class=\"text-muted\" *ngIf=\"name.hasError('required') && name.touched\">\r\n              Name is required.\r\n            </small>\r\n          </div>\r\n        </div>\r\n\r\n        <!--url segment-->\r\n        <div class=\"form-group row\" [class.has-success]=\"urlSegment.valid && urlSegment.touched\"\r\n             [class.has-error]=\"!urlSegment.valid && urlSegment.touched\">\r\n          <div class=\"col-xs-7\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"Url segment\" [formControl]=\"urlSegment\">\r\n            <small class=\"text-muted\" *ngIf=\"urlSegment.hasError('required') && urlSegment.touched\">\r\n              Url segment is required.\r\n            </small>\r\n          </div>\r\n        </div>\r\n\r\n        <!--show in main menu-->\r\n        <div class=\"form-group row\">\r\n          <div class=\"checkbox col-xs-7\">\r\n            <label>\r\n              <input type=\"checkbox\" [formControl]=\"showInMainMenu\"> Show in main menu\r\n            </label>\r\n          </div>\r\n        </div>\r\n\r\n        <!--submit button-->\r\n        <button type=\"submit\" [disabled]=\"!form.valid\" class=\"btn btn-primary\">\r\n          <span *ngIf=\"selectedManufacturer == null\">Create</span>\r\n          <span *ngIf=\"selectedManufacturer != null\">Update</span>\r\n        </button>\r\n\r\n        <!--delete button-->\r\n        <button type=\"button\" [disabled]=\"id.value < 0\" class=\"btn btn-warning\" (click)=\"onDeleteClick(id.value)\">\r\n          Delete\r\n        </button>\r\n\r\n      </form>\r\n\r\n      <!--error alerts-->\r\n      <div *ngIf=\"errors && errors.length > 0\">\r\n        <div class=\"alert alert-warning alert-dismissible fade in\" role=\"alert\"\r\n             *ngFor=\"let error of errors; let idx = index\">\r\n          <button type=\"button\" class=\"close\">\r\n            <span aria-hidden=\"true\" (click)=\"clearErrors(idx)\">&times;</span>\r\n          </button>\r\n          {{ error }}\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ },

/***/ 771:
/***/ function(module, exports) {

	module.exports = "<p>orders</p>"

/***/ },

/***/ 772:
/***/ function(module, exports) {

	module.exports = "<h5>Item: {{ product.name }} (#{{ product.productNumber }})</h5>\r\n<br/>\r\n\r\n<div class=\"container-flex\" *ngIf=\"form\">\r\n  <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit(form.value)\">\r\n    <div class=\"row\">    \r\n      <label for=\"markup\">Markup <small>({{ markup.value.length }}/{{markupMaxLength}})</small> </label>\r\n      <small class=\"text-muted text-danger\" *ngIf=\"markup.hasError('maxlength') && !markup.pristine\">\r\n        Maximum length is {{ markupMaxLength }}\r\n      </small>\r\n\r\n      <textarea auto-adjust id=\"markup\" [formControl]=\"markup\" style=\"width: 100%; min-height: 50vh\"></textarea>        \r\n    </div>\r\n    <div class=\"row\">\r\n      <!--submit button-->\r\n      <button type=\"submit\" [disabled]=\"!form.valid\" class=\"btn btn-primary\">\r\n        Save\r\n      </button>\r\n\r\n      <!--preview button-->\r\n      <button type=\"button\" [disabled]=\"!form.valid\" class=\"btn btn-primary\" (click)=\"onPreviewClick(form.value)\">\r\n        Preview\r\n      </button>\r\n    </div>\r\n  </form>\r\n\r\n  <div class=\"row\" *ngIf=\"preview\">\r\n    <h3>Preview</h3>\r\n    <span [innerHtml]=\"preview\"></span>\r\n  </div>\r\n\r\n</div>"

/***/ },

/***/ 773:
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n\r\n    <form novalidate *ngIf=\"form\" [formGroup]=\"form\" (ngSubmit)=\"onFormSubmit(form.value)\">\r\n\r\n      <!--name-->\r\n      <fieldset class=\"form-group row\"  [class.has-success]=\"name.valid && name.touched\"\r\n                                        [class.has-error]=\"!name.valid && name.touched\">\r\n        <label for=\"name\">Name</label>\r\n        <small class=\"text-muted\">({{ name.value.length }}/{{ fieldRules.name.maxLength }})</small>\r\n\r\n        <input class=\"form-control\" id=\"name\" placeholder=\"Name\" [formControl]=\"name\"\r\n               [class.form-control-success]=\"name.valid && name.touched\"\r\n               [class.form-control-error]=\"!name.valid && name.touched\">\r\n\r\n        <small class=\"text-muted\" *ngIf=\"name.hasError('required') && name.touched\">\r\n          Name is required <br/>\r\n        </small>\r\n        <small class=\"text-muted\" *ngIf=\"name.hasError('minlength') && name.touched\">\r\n          Minimum length is {{ fieldRules.name.minLength }} <br/>\r\n        </small>\r\n        <small class=\"text-muted\" *ngIf=\"name.hasError('maxlength') && name.touched\">\r\n          Maximum length is {{ fieldRules.name.maxLength }} <br/>\r\n        </small>\r\n      </fieldset>\r\n\r\n      <!--description-->\r\n      <fieldset class=\"form-group row\"  [class.has-success]=\"description.valid && description.touched\"\r\n                                        [class.has-error]=\"!description.valid && description.touched\">\r\n        <label for=\"description\">Description</label>\r\n        <small class=\"text-muted\">({{ description.value.length }}/{{ fieldRules.description.maxLength }})</small>\r\n\r\n        <input class=\"form-control\" id=\"description\" placeholder=\"Name\" [formControl]=\"description\"\r\n               [class.form-control-success]=\"description.valid && description.touched\"\r\n               [class.form-control-error]=\"!description.valid && description.touched\">\r\n\r\n        <small class=\"text-muted\" *ngIf=\"description.hasError('required') && description.touched\">\r\n          Description is required <br/>\r\n        </small>\r\n        <small class=\"text-muted\" *ngIf=\"description.hasError('minlength') && description.touched\">\r\n          Minimum length is {{ fieldRules.description.minLength }} <br/>\r\n        </small>\r\n        <small class=\"text-muted\" *ngIf=\"description.hasError('maxlength') && description.touched\">\r\n          Maximum length is {{ fieldRules.description.maxLength }} <br/>\r\n        </small>\r\n      </fieldset>\r\n\r\n      <!--price, current price, stock qty-->\r\n      <div class=\"container-flex\">\r\n        <div class=\"row\">\r\n          <div class=\"col-xs-3\">\r\n\r\n            <!--price-->\r\n            <fieldset class=\"form-group row\"  [class.has-success]=\"price.valid && price.touched\"\r\n                                              [class.has-error]=\"!price.valid && price.touched\">\r\n              <label for=\"price\">Price</label>\r\n\r\n              <input class=\"form-control\" id=\"price\" placeholder=\"Price\" [formControl]=\"price\"\r\n                     [class.form-control-success]=\"price.valid && price.touched\"\r\n                     [class.form-control-error]=\"!price.valid && price.touched\">\r\n\r\n              <small class=\"text-muted\" *ngIf=\"price.hasError('required') && price.touched\">\r\n                Price is required <br/>\r\n              </small>\r\n              <small class=\"text-muted\" *ngIf=\"price.hasError('pattern') && price.touched\">\r\n                Price must be a positive number. <br/>\r\n              </small>\r\n            </fieldset>\r\n\r\n          </div>\r\n          <div class=\"col-xs-4 col-xs-offset-1\">\r\n\r\n            <!--currentPrice-->\r\n            <fieldset class=\"form-group row\"  [class.has-success]=\"currentPrice.valid && currentPrice.touched\"\r\n                                              [class.has-error]=\"!currentPrice.valid && currentPrice.touched\">\r\n              <label for=\"currentPrice\">Current price</label>\r\n\r\n              <input class=\"form-control\" id=\"currentPrice\" placeholder=\"Current price\" [formControl]=\"currentPrice\"\r\n                     [class.form-control-success]=\"currentPrice.valid && currentPrice.touched\"\r\n                     [class.form-control-error]=\"!currentPrice.valid && currentPrice.touched\">\r\n\r\n              <small class=\"text-muted\" *ngIf=\"currentPrice.hasError('required') && currentPrice.touched\">\r\n                Current price is required <br/>\r\n              </small>\r\n              <small class=\"text-muted\" *ngIf=\"currentPrice.hasError('pattern') && currentPrice.touched\">\r\n                Current price must be a positive number. <br/>\r\n              </small>\r\n            </fieldset>\r\n\r\n          </div>\r\n          <div class=\"col-xs-3 col-xs-offset-1\">\r\n\r\n            <!--stockCount-->\r\n            <fieldset class=\"form-group row\"  [class.has-success]=\"stockCount.valid && stockCount.touched\"\r\n                      [class.has-error]=\"!stockCount.valid && stockCount.touched\">\r\n              <label for=\"stockCount\">Stock quantity</label>\r\n\r\n              <input class=\"form-control\" id=\"stockCount\" placeholder=\"Stock quantity\" [formControl]=\"stockCount\"\r\n                     [class.form-control-success]=\"stockCount.valid && stockCount.touched\"\r\n                     [class.form-control-error]=\"!stockCount.valid && stockCount.touched\">\r\n\r\n              <small class=\"text-muted\" *ngIf=\"stockCount.hasError('required') && stockCount.touched\">\r\n                Stock quantity is required <br/>\r\n              </small>\r\n              <small class=\"text-muted\" *ngIf=\"stockCount.hasError('pattern') && stockCount.touched\">\r\n                Stock quantity must be a positive number. <br/>\r\n              </small>\r\n            </fieldset>\r\n\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n\r\n      <!--imageUrl-->\r\n      <fieldset class=\"form-group row\"  [class.has-success]=\"imageUrl.valid && imageUrl.touched\"\r\n                                        [class.has-error]=\"!imageUrl.valid && imageUrl.touched\">\r\n        <label for=\"imageUrl\">Image Url</label>\r\n        <small class=\"text-muted\">({{ imageUrl.value.length }}/{{ fieldRules.imageUrl.maxLength }})</small>\r\n\r\n        <input class=\"form-control\" id=\"imageUrl\" placeholder=\"Image Url\" [formControl]=\"imageUrl\"\r\n               [class.form-control-success]=\"imageUrl.valid && imageUrl.touched\"\r\n               [class.form-control-error]=\"!imageUrl.valid && imageUrl.touched\">\r\n\r\n        <small class=\"text-muted\" *ngIf=\"imageUrl.hasError('required') && imageUrl.touched\">\r\n          Image Url is required <br/>\r\n        </small>\r\n        <small class=\"text-muted\" *ngIf=\"imageUrl.hasError('minlength') && imageUrl.touched\">\r\n          Minimum length is {{ fieldRules.imageUrl.minLength }} <br/>\r\n        </small>\r\n        <small class=\"text-muted\" *ngIf=\"imageUrl.hasError('maxlength') && imageUrl.touched\">\r\n          Maximum length is {{ fieldRules.imageUrl.maxLength }} <br/>\r\n        </small>\r\n      </fieldset>\r\n\r\n      <!--product number, new product, promo active-->\r\n      <div class=\"container-flex\">\r\n        <div class=\"row\">\r\n\r\n          <!--productNumber-->\r\n          <div class=\"col-xs-4\">\r\n            <fieldset class=\"form-group row\">\r\n              <label for=\"stockCount\">Product number</label>\r\n              <input class=\"form-control\" id=\"productNumber\" [formControl]=\"productNumber\" disabled>\r\n            </fieldset>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"container-flex\" *ngIf=\"id.value < 0\">\r\n        <div class=\"row\">\r\n\r\n          <div class=\"col-xs-5 col-xs-offset-1\">\r\n\r\n            <h6>Select category\r\n              <sup class=\"text-muted text-danger\" *ngIf=\"parentCategoryId.hasError('invalidCategory')\">\r\n                Required\r\n              </sup>\r\n            </h6>\r\n            <br/>\r\n\r\n            <div class=\"radio\" *ngFor=\"let category of categories; trackBy:category?.id\">\r\n              <label>\r\n                <input type=\"radio\" name=\"categories\" (click)=\"onCategorySelect(category)\">\r\n                {{ category.id }} - {{ category.name }}\r\n              </label>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"col-xs-5 col-xs-offset-1\">\r\n\r\n            <h6>Select manufacturer\r\n              <sup class=\"text-muted text-danger\" *ngIf=\"manufacturerId.hasError('invalidManufacturer')\">\r\n                Required\r\n              </sup>\r\n            </h6>\r\n            <br/>\r\n\r\n            <div class=\"radio\" *ngFor=\"let man of manufacturers; trackBy:man?.id\">\r\n              <label>\r\n                <input type=\"radio\" name=\"manufacturers\" (click)=\"onManufacturerSelect(man)\">\r\n                {{ man.id }} - {{ man.name }}\r\n              </label>\r\n            </div>\r\n\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"checkbox\">\r\n        <label>\r\n          <input type=\"checkbox\" [formControl]=\"newProduct\">\r\n          New Product\r\n        </label>\r\n      </div>\r\n      <div class=\"checkbox\">\r\n        <label>\r\n          <input type=\"checkbox\" [formControl]=\"promoActive\">\r\n          Promo active\r\n        </label>\r\n      </div>\r\n\r\n\r\n      <!--submit button-->\r\n      <button type=\"submit\" [disabled]=\"!form.valid\" class=\"btn btn-primary\">\r\n        Submit\r\n      </button>\r\n\r\n      <!--delete button-->\r\n      <button type=\"button\" [disabled]=\"id.value < 0\" class=\"btn btn-warning\" *ngIf=\"product\" (click)=\"onDeleteClick()\">\r\n        Delete\r\n      </button>\r\n\r\n      <!--clear form button-->\r\n      <button type=\"button\" class=\"btn btn-danger pull-right\" (click)=\"onClearFormClick()\">\r\n        Clear form / New product\r\n      </button>\r\n\r\n    </form>\r\n\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal\" [ngStyle]=\"{ 'display': showConfirmDelete ? 'block':'none', 'background-color': showConfirmDelete ? 'rgba(0,0,0,0.7)':'transparent' }\"\r\n     *ngIf=\"product && product.name\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Confirm</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <p>Do you really really want to delete '{{ product.name }}'?</p>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onConfirmCancel()\">No, go back</button>\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"onConfirmOk()\">Yes, delete</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ },

/***/ 774:
/***/ function(module, exports) {

	module.exports = "<h5>Item: {{ product.name }} (#{{ product.productNumber }})</h5>\r\n<br/>\r\n\r\n<div class=\"container-fluid\">\r\n  <div class=\"row\" style=\"text-align: center\">\r\n\r\n    <!--available tag list-->\r\n    <div class=\"col-xs-4 col-xs-offset-2\">\r\n      <h6>Available tags</h6>\r\n      <div *ngFor=\"let tag of availableTags\">\r\n        <a class=\"label\" (click)=\"addTag(tag)\" [class.label-primary]=\"!tag.added\" [class.label-default]=\"tag.added\">\r\n          {{ tag.name }}\r\n        </a>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"col-xs-4\">\r\n      <h6>Assigned tags</h6>\r\n      <div *ngFor=\"let tag of assignedTags\">\r\n        <a class=\"label label-primary\" (click)=\"removeTag(tag)\">{{ tag.name }}</a>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>"

/***/ },

/***/ 775:
/***/ function(module, exports) {

	module.exports = "<div>\r\n  <form *ngIf=\"form\" [formGroup]=\"form\">\r\n\r\n    <h5>Product search</h5>\r\n\r\n    <input type=\"text\" class=\"form-control form-control-md\" placeholder=\"Search...\" [formControl]=\"term\">\r\n    <small class=\"text-muted\" *ngIf=\"term.hasError('minlength')\">Minimum length is 3 characters</small>\r\n    <small class=\"text-muted\" *ngIf=\"term.hasError('maxlength')\">Maximum length is 30 characters</small>\r\n\r\n  </form>\r\n\r\n  <br/>\r\n\r\n\r\n    <div class=\"card-columns\" *ngIf=\"products && products.length > 0\">\r\n\r\n\r\n        <div class=\"card\" *ngFor=\"let product of products\" (click)=\"onProductClick(product)\">\r\n          <img class=\"card-img-top\" [src]=\"product.imageUrl\" style=\"width: 100%;\">\r\n          <div class=\"card-block\">\r\n            <h5 class=\"card-title\">{{ product.name }}</h5>\r\n            <p class=\"card-text\">Current price: {{ product.currentPrice }}</p>\r\n            <p class=\"card-text\">{{ product.description }}</p>\r\n          </div>\r\n          <div class=\"card-footer text-muted\">\r\n            <!--void 0 so bootstrap anchor styles work-->\r\n            <a class=\"card-link\" href=\"javascript:void(0)\" (click)=\"onLinkClick('/products/edit', product); $event.stopPropagation()\">Edit</a>\r\n            <a class=\"card-link\" href=\"javascript:void(0)\" (click)=\"onLinkClick('/products/tags', product); $event.stopPropagation()\">Tags</a>\r\n            <a class=\"card-link\" href=\"javascript:void(0)\" (click)=\"onLinkClick('/products/detail', product); $event.stopPropagation()\">Detail</a>\r\n          </div>\r\n        </div>\r\n\r\n\r\n    </div>\r\n\r\n</div>"

/***/ },

/***/ 776:
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n\r\n    <ul class=\"nav nav-tabs\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" [routerLink]=\" ['./search'] \" routerLinkActive=\"active\">Search</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" [routerLink]=\" ['./edit'] \" routerLinkActive=\"active\">Create / Edit</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" [routerLink]=\" ['./tags'] \" routerLinkActive=\"active\" [class.disabled]=\"noProductSelected\">Manage tags</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" [routerLink]=\" ['./detail'] \" routerLinkActive=\"active\" [class.disabled]=\"noProductSelected\">Edit details page</a>\r\n      </li>\r\n\r\n    </ul>\r\n\r\n    <br/>\r\n\r\n    <router-outlet></router-outlet>\r\n  </div>\r\n</div>\r\n"

/***/ },

/***/ 777:
/***/ function(module, exports) {

	module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n\r\n    <!--category list-->\r\n    <div class=\"col-xs-3\">\r\n      <ul>\r\n        <li *ngFor=\"let category of categories\" (click)=\"onCategoryClick(category)\">\r\n          {{ category.name }}\r\n          <ul *ngIf=\"category.tags.length > 0\">\r\n            <li *ngFor=\"let tag of category.tags\" (click)=\"onTagClick(category, tag); $event.stopPropagation()\">\r\n              {{ tag.name }}\r\n            </li>\r\n          </ul>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n\r\n    <!--tag form-->\r\n    <div class=\"col-xs-9\">\r\n\r\n      <form novalidate *ngIf=\"form\" [formGroup]=\"form\" (ngSubmit)=\"onFormSubmit(form.value)\">\r\n\r\n        <!--header-->\r\n        <h5 *ngIf=\"selectedCategory\">\r\n          <span *ngIf=\"id.value >= 0\">Modifying tag {{ selectedTag.name }} in category {{ selectedCategory.name }}</span>\r\n          <span *ngIf=\"id.value < 0\">Creating new tag in category {{ selectedCategory.name }}</span>\r\n        </h5>\r\n\r\n        <!--name-->\r\n        <div class=\"form-group row\" [class.has-success]=\"name.valid && name.touched\"\r\n             [class.has-error]=\"!name.valid && name.touched\">\r\n          <div class=\"col-xs-7\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"Name\" [formControl]=\"name\">\r\n            <small class=\"text-muted\" *ngIf=\"name.hasError('required') && name.touched\">\r\n              Name is required.\r\n            </small>\r\n          </div>\r\n        </div>\r\n\r\n        <!--url segment-->\r\n        <div class=\"form-group row\" [class.has-success]=\"urlSegment.valid && urlSegment.touched\"\r\n             [class.has-error]=\"!urlSegment.valid && urlSegment.touched\">\r\n          <div class=\"col-xs-7\">\r\n            <input type=\"text\" class=\"form-control form-control-md\"\r\n                   placeholder=\"Url segment\" [formControl]=\"urlSegment\">\r\n            <small class=\"text-muted\" *ngIf=\"urlSegment.hasError('required') && urlSegment.touched\">\r\n              Url segment is required.\r\n            </small>\r\n          </div>\r\n        </div>\r\n\r\n        <!--show in main menu-->\r\n        <div class=\"form-group row\">\r\n          <div class=\"checkbox col-xs-7\">\r\n            <label>\r\n              <input type=\"checkbox\" [formControl]=\"showInMainMenu\"> Show in main menu\r\n            </label>\r\n          </div>\r\n        </div>\r\n\r\n        <!--submit button-->\r\n        <button type=\"submit\" [disabled]=\"!form.valid\" class=\"btn btn-primary\">\r\n          <span *ngIf=\"selectedTag == null\">Create</span>\r\n          <span *ngIf=\"selectedTag != null\">Update</span>\r\n        </button>\r\n\r\n        <!--delete button-->\r\n        <button type=\"button\" [disabled]=\"id.value < 0\" class=\"btn btn-warning\" (click)=\"onDeleteClick(id.value)\">\r\n          Delete\r\n        </button>\r\n\r\n      </form>\r\n\r\n      <!--error alerts-->\r\n      <div *ngIf=\"errors && errors.length > 0\">\r\n        <div class=\"alert alert-warning alert-dismissible fade in\" role=\"alert\"\r\n             *ngFor=\"let error of errors; let idx = index\">\r\n          <button type=\"button\" class=\"close\">\r\n            <span aria-hidden=\"true\" (click)=\"clearErrors(idx)\">&times;</span>\r\n          </button>\r\n          {{ error }}\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ },

/***/ 778:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(5);
	var throw_1 = __webpack_require__(780);
	Observable_1.Observable.throw = throw_1._throw;
	//# sourceMappingURL=throw.js.map

/***/ },

/***/ 779:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(5);
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

/***/ 780:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ErrorObservable_1 = __webpack_require__(779);
	exports._throw = ErrorObservable_1.ErrorObservable.create;
	//# sourceMappingURL=throw.js.map

/***/ }

});
//# sourceMappingURL=admin.bundle.map