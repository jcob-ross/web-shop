var ac_admin =
webpackJsonpac__name_([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(274);
	var platform_browser_dynamic_1 = __webpack_require__(234);
	var platform_browser_1 = __webpack_require__(100);
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(228);
	var admin_1 = __webpack_require__(526);
	if (false) {
	    platform_browser_1.disableDebugTools();
	    core_1.enableProdMode();
	}
	else {
	}
	platform_browser_dynamic_1.bootstrap(admin_1.AdminComponent, [
	    http_1.HTTP_PROVIDERS,
	]).catch(function (error) { return console.error("admin-main: " + error); });
	

/***/ },

/***/ 525:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var AdminComponent = (function () {
	    function AdminComponent() {
	        this.message = 'AdminComponent';
	    }
	    AdminComponent = __decorate([
	        core_1.Component({
	            selector: 'admin-main',
	            template: "\n    <h2 class=\"pink\">Hello from {{ message }}</h2>\n  ",
	            styles: [__webpack_require__(719)]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AdminComponent);
	    return AdminComponent;
	}());
	exports.AdminComponent = AdminComponent;
	

/***/ },

/***/ 526:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(525));
	

/***/ },

/***/ 719:
/***/ function(module, exports) {

	module.exports = ".pink{color:chartreuse}\n"

/***/ }

});
//# sourceMappingURL=admin.bundle.map