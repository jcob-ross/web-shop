var ac_app =
webpackJsonpac__name_([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(302);
	__webpack_require__(721);
	var platform_browser_dynamic_1 = __webpack_require__(250);
	var platform_browser_1 = __webpack_require__(81);
	var core_1 = __webpack_require__(1);
	var http_1 = __webpack_require__(156);
	var app_1 = __webpack_require__(712);
	if (false) {
	    platform_browser_1.disableDebugTools();
	    core_1.enableProdMode();
	}
	else {
	}
	platform_browser_dynamic_1.bootstrap(app_1.AppComponent, [
	    http_1.HTTP_PROVIDERS,
	]).catch(function (error) { return console.error("app-main: " + error); });
	

/***/ },

/***/ 711:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(1);
	var AppComponent = (function () {
	    function AppComponent() {
	        this.message = 'AppComponent';
	    }
	    AppComponent = __decorate([
	        core_1.Component({
	            selector: 'app-main',
	            template: "\n    <h2 class=\"pink\">Hello from {{ message }}</h2>\n  ",
	            styles: [__webpack_require__(947)]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AppComponent);
	    return AppComponent;
	}());
	exports.AppComponent = AppComponent;
	

/***/ },

/***/ 712:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(711));
	

/***/ },

/***/ 721:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 947:
/***/ function(module, exports) {

	module.exports = ".pink{color:hotpink}\n"

/***/ }

});
//# sourceMappingURL=app.bundle.map