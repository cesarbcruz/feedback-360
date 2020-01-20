webpackJsonp([5],{

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterPageModule", function() { return FilterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter__ = __webpack_require__(670);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FilterPageModule = /** @class */ (function () {
    function FilterPageModule() {
    }
    FilterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__filter__["a" /* FilterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__filter__["a" /* FilterPage */]),
            ],
        })
    ], FilterPageModule);
    return FilterPageModule;
}());

//# sourceMappingURL=filter.module.js.map

/***/ }),

/***/ 670:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_common__ = __webpack_require__(299);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FilterPage = /** @class */ (function () {
    function FilterPage(navCtrl, navParams, common, backend) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.common = common;
        this.backend = backend;
        this.companies = [];
    }
    FilterPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loading = this.common.getLoading('Loading...');
        loading.present();
        this.backend.getFeedbacks().subscribe(function (res) {
            loading.dismiss();
            _this.companies = Array.from(new Set(res.map(function (i) { return i.personalDetails.company; })));
        });
    };
    FilterPage.prototype.filter = function () {
        this.navCtrl.push('ViewFeedbacksPage', {
            company: this.selectedCompany
        });
    };
    FilterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-filter',template:/*ion-inline-start:"/home/cesar/dev/exemplo/feedback-360/src/pages/filter/filter.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Filter</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h4 ion-text color="pink" text-center>Select Organisation</h4>\n  <ion-item>\n    <ion-label floating>Choose Organisation</ion-label>\n    <ion-select [(ngModel)]="selectedCompany">\n      <ion-option *ngFor="let company of companies" [value]="company">{{ company }}</ion-option>\n    </ion-select>\n  </ion-item>\n\n  <div padding></div>\n\n  <button ion-button block (click)="filter()">Continue</button>\n\n</ion-content>\n'/*ion-inline-end:"/home/cesar/dev/exemplo/feedback-360/src/pages/filter/filter.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_common_common__["a" /* CommonProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */]])
    ], FilterPage);
    return FilterPage;
}());

//# sourceMappingURL=filter.js.map

/***/ })

});
//# sourceMappingURL=5.js.map