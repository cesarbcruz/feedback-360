webpackJsonp([1],{

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedbackFormPageModule", function() { return FeedbackFormPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feedback_form__ = __webpack_require__(667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(668);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var FeedbackFormPageModule = /** @class */ (function () {
    function FeedbackFormPageModule() {
    }
    FeedbackFormPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__feedback_form__["a" /* FeedbackFormPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__feedback_form__["a" /* FeedbackFormPage */]),
            ],
        })
    ], FeedbackFormPageModule);
    return FeedbackFormPageModule;
}());

//# sourceMappingURL=feedback-form.module.js.map

/***/ }),

/***/ 667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_common__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_backend_backend__ = __webpack_require__(161);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FeedbackFormPage = /** @class */ (function () {
    function FeedbackFormPage(navCtrl, formBuilder, common, backend) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.common = common;
        this.backend = backend;
        this.profiles = [];
        this.feedback = new Map();
        this.ratedProfile = [];
        this.showPersonalDetailsForm = false;
    }
    FeedbackFormPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        this.backend.getProfiles().subscribe(function (res) {
            _this.profiles = res;
            _this.findRatedProfile();
        });
    };
    FeedbackFormPage.prototype.findRatedProfile = function () {
        var _this = this;
        this.profiles.forEach(function (profile) {
            _this.backend.getFeedback(profile.uid).subscribe(function (feedback) {
                if (feedback) {
                    _this.ratedProfile.push(profile.uid);
                }
            });
        });
    };
    FeedbackFormPage.prototype.getImageProfile = function (imageBase64) {
        if (imageBase64) {
            return atob(imageBase64);
        }
        else {
            return 'assets/imgs/person-logo.png';
        }
    };
    FeedbackFormPage.prototype.ionViewDidLoad = function () {
        this.slides.lockSwipes(true);
    };
    FeedbackFormPage.prototype.getCurrentSlide = function () {
        if (this.slides)
            return this.slides.getActiveIndex();
    };
    FeedbackFormPage.prototype.back = function () {
        this.slides.lockSwipes(false);
        this.slides.slidePrev(300);
        this.slides.lockSwipes(true);
        this.showPersonalDetailsForm = false;
        this.profileSelected = null;
        this.job = null;
        this.feedback = new Map();
    };
    FeedbackFormPage.prototype.avaliar = function (profile) {
        this.profileSelected = profile;
        this.showPersonalDetailsForm = true;
        this.slides.lockSwipes(false);
        this.slides.slideNext(300);
        this.slides.lockSwipes(true);
        this.loadJob(profile.jobTitle);
    };
    FeedbackFormPage.prototype.loadJob = function (jobTitle) {
        var _this = this;
        this.backend.getJob(jobTitle).subscribe(function (res) {
            _this.job = res;
        });
    };
    FeedbackFormPage.prototype.updateRating = function (skill, rating) {
        this.feedback.set(skill, { skill: skill, rating: rating });
    };
    FeedbackFormPage.prototype.submit = function () {
        if (this.feedback.size == 0) {
            return this.common.getToast('Nenhuma competência foi avaliada!').present();
        }
        this.common.getToast('Obrigado, seu feedback foi registrado!').present();
        this.backend.addFeedback(this.profileSelected.uid, Array.from(this.feedback.values()));
        this.navCtrl.pop();
    };
    FeedbackFormPage.prototype.getRatedProfileColor = function (uid) {
        if (this.ratedProfile.includes(uid)) {
            return "secondary";
        }
        else {
            return "primary";
        }
    };
    FeedbackFormPage.prototype.scrollToTop = function () {
        this.content.scrollToTop();
    };
    FeedbackFormPage.prototype.scrollToBottom = function () {
        this.content.scrollToBottom();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Slides */])
    ], FeedbackFormPage.prototype, "slides", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* Content */])
    ], FeedbackFormPage.prototype, "content", void 0);
    FeedbackFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-feedback-form',template:/*ion-inline-start:"/home/cesar/dev/exemplo/feedback-360/src/pages/feedback-form/feedback-form.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>FeedBack</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="bg">\n\n  <ion-slides>\n\n    <ion-slide>\n      <ion-card>\n        <ion-card-header>Colaboradores</ion-card-header>\n        <hr />\n        <ion-card-content>\n            <ion-list>\n                  <button ion-item *ngFor="let profile of profiles"\n                    (click)="avaliar(profile)"\n                  >                  \n                  <ion-avatar item-start>\n                    <img [src]="getImageProfile(profile?.photoBase64)"/>\n                  </ion-avatar>                  \n                  <h2>{{profile?.name}}</h2>                  \n                  <p>{{profile?.jobTitle}}</p>\n                  <ion-icon [color]="this.getRatedProfileColor(profile.uid)" item-end name="megaphone"></ion-icon>\n                </button>\n              </ion-list>\n        </ion-card-content>\n      </ion-card>\n      <p>\n        Selecione o colaborador que deseja avaliar\n      </p>\n    </ion-slide>\n    <ion-slide >\n      <p ion-text color="orange">Avaliando {{ this.profileSelected?.name }} / {{ this.profileSelected?.jobTitle }}</p>\n\n      <ion-fab top right>\n          <button ion-fab color="secondary" (click)="scrollToBottom()">\n              <ion-icon name="arrow-down"></ion-icon>\n          </button>\n      </ion-fab>\n      <ion-fab bottom right>\n          <button ion-fab color="secondary" (click)="scrollToTop()">\n              <ion-icon name="arrow-up"></ion-icon>\n          </button>\n      </ion-fab>\n\n      <ion-card>\n        <ion-card-header>Competências</ion-card-header>\n        <hr />\n        <ion-card-content>\n            \n          <ion-list>              \n              <star-rating [title]="skill" *ngFor="let skill of job?.skills.sort()" (ratingChanged)="updateRating(skill, $event)"></star-rating>\n          </ion-list>\n          \n        </ion-card-content>\n      </ion-card>\n    </ion-slide>\n\n  </ion-slides>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-6 text-center *ngIf="showPersonalDetailsForm">\n        <button ion-button block \n          (click)="back()">\n          Cancelar\n        </button>\n      </ion-col>\n      <ion-col col-6 text-center *ngIf="showPersonalDetailsForm">\n          <button ion-button block (click)="submit()">\n              Salvar\n            </button>\n        </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"/home/cesar/dev/exemplo/feedback-360/src/pages/feedback-form/feedback-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_common_common__["a" /* CommonProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_backend_backend__["a" /* BackendProvider */]])
    ], FeedbackFormPage);
    return FeedbackFormPage;
}());

//# sourceMappingURL=feedback-form.js.map

/***/ }),

/***/ 668:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__star_rating_star_rating__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(90);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__star_rating_star_rating__["a" /* StarRatingComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__star_rating_star_rating__["a" /* StarRatingComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StarRatingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StarRatingComponent = /** @class */ (function () {
    function StarRatingComponent() {
        this.rating = 0;
        this.ratingChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    StarRatingComponent.prototype.changeRating = function (index) {
        this.rating = index + 1;
        this.ratingChanged.emit(this.rating);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], StarRatingComponent.prototype, "ratingChanged", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], StarRatingComponent.prototype, "title", void 0);
    StarRatingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'star-rating',template:/*ion-inline-start:"/home/cesar/dev/exemplo/feedback-360/src/components/star-rating/star-rating.html"*/'<!-- Generated template for the StarRatingComponent component -->\n<div>\n  <p style="font-weight: bold;">{{title}}</p>\n  <ion-icon small color="{{ rating >= 1 ? \'ouro\' : \'opaque\' }}" name="star" (click)="changeRating(0)"></ion-icon>\n  <ion-icon small color="{{ rating >= 2 ? \'ouro\' : \'opaque\' }}" name="star" (click)="changeRating(1)"></ion-icon>\n  <ion-icon small color="{{ rating >= 3 ? \'ouro\' : \'opaque\' }}" name="star" (click)="changeRating(2)"></ion-icon>\n  <ion-icon small color="{{ rating >= 4 ? \'ouro\' : \'opaque\' }}" name="star" (click)="changeRating(3)"></ion-icon>\n  <ion-icon small color="{{ rating >= 5 ? \'ouro\' : \'opaque\' }}" name="star" (click)="changeRating(4)"></ion-icon>\n</div>\n'/*ion-inline-end:"/home/cesar/dev/exemplo/feedback-360/src/components/star-rating/star-rating.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], StarRatingComponent);
    return StarRatingComponent;
}());

//# sourceMappingURL=star-rating.js.map

/***/ })

});
//# sourceMappingURL=1.js.map