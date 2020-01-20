webpackJsonp([3],{

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPageModule", function() { return MenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu__ = __webpack_require__(664);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MenuPageModule = /** @class */ (function () {
    function MenuPageModule() {
    }
    MenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */]),
            ],
        })
    ], MenuPageModule);
    return MenuPageModule;
}());

//# sourceMappingURL=menu.module.js.map

/***/ }),

/***/ 664:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_common__ = __webpack_require__(296);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, common, backend) {
        this.navCtrl = navCtrl;
        this.common = common;
        this.backend = backend;
    }
    MenuPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.backend.getProfile().subscribe(function (p) {
            _this.profile = p;
        });
    };
    MenuPage.prototype.getImageProfile = function () {
        if (this.profile && this.profile.photoBase64) {
            return atob(this.profile.photoBase64);
        }
        else {
            return 'assets/imgs/person-logo.png';
        }
    };
    MenuPage.prototype.rateManager = function () {
        this.navCtrl.push('FeedbackFormPage');
    };
    MenuPage.prototype.viewFeedbacks = function () {
        this.navCtrl.push('FilterPage');
    };
    MenuPage.prototype.logout = function () {
        var _this = this;
        this.backend.logout().then(function () {
            _this.common.getToast('Logged Out Successfully!').present();
        });
    };
    var _a, _b, _c;
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-menu',template:/*ion-inline-start:"/home/cesar/dev/exemplo/feedback-360/src/pages/menu/menu.html"*/'<ion-content padding class="bg" text-center>\n\n  <h2 style="color: white" padding>Dashboard</h2>\n\n  <img [src]="this.getImageProfile()" alt="" />\n  <h6 ion-text color="light">{{ this.profile? this.profile.email:\'\' }}</h6>\n\n  <div padding></div>\n\n  <button ion-button color="light" block (click)="rateManager()">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-3>\n          <ion-icon name="create" color="primary"></ion-icon>\n        </ion-col>\n        <ion-col col-auto>\n          Rate Manager\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </button>\n\n  <div style="margin-top: 20px"></div>\n\n  <button ion-button color="light" block (click)="viewFeedbacks()">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-3>\n          <ion-icon name="list-box" color="primary"></ion-icon>\n        </ion-col>\n        <ion-col col-auto>\n          Insights\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </button>\n\n  <div style="margin-top: 20px"></div>\n\n  <button ion-button color="light" block (click)="logout()">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-3>\n          <ion-icon name="exit" color="primary"></ion-icon>\n        </ion-col>\n        <ion-col col-auto>\n          Logout\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </button>\n\n</ion-content>'/*ion-inline-end:"/home/cesar/dev/exemplo/feedback-360/src/pages/menu/menu.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_common_common__["a" /* CommonProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_common_common__["a" /* CommonProvider */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */]) === "function" ? _c : Object])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ })

});
//# sourceMappingURL=3.js.map