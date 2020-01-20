webpackJsonp([1],{

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedbackFormPageModule", function() { return FeedbackFormPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__feedback_form__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(660);
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
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__feedback_form__["a" /* FeedbackFormPage */]),
            ],
        })
    ], FeedbackFormPageModule);
    return FeedbackFormPageModule;
}());

//# sourceMappingURL=feedback-form.module.js.map

/***/ }),

/***/ 659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_common__ = __webpack_require__(296);
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
        this.managerBehaviour = [];
        this.managerSkills = [
            {
                name: 'Excellent Communicator'
            },
            {
                name: 'Knows his/her job'
            },
            {
                name: 'Soft Spoken'
            },
            {
                name: 'Supportive'
            },
            {
                name: 'Fearless'
            },
            {
                name: 'Motivator'
            }
        ];
        this.starRating = 0;
        this.showPersonalDetailsForm = false;
        this.totalSlides = 7;
    }
    FeedbackFormPage.prototype.ionViewWillLoad = function () {
        this.personalDetails = this.formBuilder.group({
            company: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            industry: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            companyLocation: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            companySize: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            designation: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            ageGroup: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            gender: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]
        });
    };
    FeedbackFormPage.prototype.ionViewDidLoad = function () {
        this.slides.lockSwipes(true);
    };
    FeedbackFormPage.prototype.getCurrentSlide = function () {
        if (this.slides)
            return this.slides.getActiveIndex();
    };
    FeedbackFormPage.prototype.behaviourSelect = function ($event, label) {
        var checked = $event.checked;
        var index = this.managerBehaviour.indexOf(label);
        if (checked) {
            this.managerBehaviour.push(label);
        }
        else {
            this.managerBehaviour.splice(index, 1);
        }
        this.managerBehaviour = Array.from(new Set(this.managerBehaviour));
    };
    FeedbackFormPage.prototype.updateRating = function (rating) {
        this.starRating = rating;
    };
    FeedbackFormPage.prototype.back = function () {
        this.slides.lockSwipes(false);
        this.slides.slidePrev(300);
        this.slides.lockSwipes(true);
    };
    FeedbackFormPage.prototype.next = function () {
        var _this = this;
        var current = this.getCurrentSlide();
        var showToast = function () { return _this.common.getToast('Please select at least one option!').present(); };
        if (current == 0 && !this.managerBehaviour.length) {
            return showToast();
        }
        else if ((current <= 6 && current > 0) && !this.managerSkills[current - 1].value) {
            return showToast();
        }
        if (current == 6)
            this.showPersonalDetailsForm = true;
        else {
            this.slides.lockSwipes(false);
            this.slides.slideNext(300);
            this.slides.lockSwipes(true);
        }
    };
    FeedbackFormPage.prototype.submit = function () {
        var _this = this;
        if (!this.personalDetails.valid) {
            return this.common.getToast('Please fill all fields!').present();
        }
        else if (!this.starRating) {
            return this.common.getToast('Please fill star rating!').present();
        }
        var feedback = {
            managerBehaviour: this.managerBehaviour,
            managerSkills: this.managerSkills,
            personalDetails: this.personalDetails.value,
            starRating: this.starRating,
            createdAt: new Date().toString()
        };
        this.backend.addFeedback(feedback).then(function (res) {
            _this.common.getToast('Feedback submitted!', 2000).present();
            _this.navCtrl.pop();
        }).catch(function (error) { return console.log(error); });
        console.log(feedback);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Slides */])
    ], FeedbackFormPage.prototype, "slides", void 0);
    FeedbackFormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-feedback-form',template:/*ion-inline-start:"/home/cesar/dev/exemplo/feedback-360/src/pages/feedback-form/feedback-form.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>My Manager</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="bg">\n\n  <ion-slides *ngIf="!showPersonalDetailsForm">\n\n    <ion-slide>\n      <p ion-text color="pink">Behaviour</p>\n      <ion-card>\n        <ion-card-header>My Manager is Mostly:</ion-card-header>\n        <hr />\n        <ion-card-content>\n          <ion-list>\n            <ion-grid>\n              <ion-row>\n                <ion-col col-6>\n                  <ion-item text-wrap no-padding>\n                    <ion-label>Friendly</ion-label>\n                    <ion-checkbox (ionChange)="behaviourSelect($event, \'friendly\')" color="pink"></ion-checkbox>\n                  </ion-item>\n                </ion-col>\n                <ion-col col-6>\n                  <ion-item text-wrap no-padding>\n                    <ion-label>Angry</ion-label>\n                    <ion-checkbox (ionChange)="behaviourSelect($event, \'angry\')" color="pink"></ion-checkbox>\n                  </ion-item>\n                </ion-col>\n                <ion-col col-6>\n                  <ion-item text-wrap no-padding>\n                    <ion-label>Neutral</ion-label>\n                    <ion-checkbox (ionChange)="behaviourSelect($event, \'neutral\')" color="pink"></ion-checkbox>\n                  </ion-item>\n                </ion-col>\n                <ion-col col-6>\n                  <ion-item text-wrap no-padding>\n                    <ion-label>Busy</ion-label>\n                    <ion-checkbox (ionChange)="behaviourSelect($event, \'busy\')" color="pink"></ion-checkbox>\n                  </ion-item>\n                </ion-col>\n                <ion-col col-6>\n                  <ion-item text-wrap no-padding>\n                    <ion-label>Lazy</ion-label>\n                    <ion-checkbox (ionChange)="behaviourSelect($event, \'lazy\')" color="pink"></ion-checkbox>\n                  </ion-item>\n                </ion-col>\n                <ion-col col-6>\n                  <ion-item text-wrap no-padding>\n                    <ion-label>Partial</ion-label>\n                    <ion-checkbox (ionChange)="behaviourSelect($event, \'partial\')" color="pink"></ion-checkbox>\n                  </ion-item>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-list>\n        </ion-card-content>\n      </ion-card>\n      <p>\n        IRate My Manager is committed to maintain user confidentiality. Information provided by the user is kept\n        confidential.\n      </p>\n    </ion-slide>\n\n    <ion-slide *ngFor="let managerSkill of managerSkills; let i = index;">\n      <p ion-text color="pink">Manager Skills ({{ i + 1 }} / {{ managerSkills.length }} )</p>\n      <ion-card>\n        <ion-card-header>{{ managerSkill.name }}:</ion-card-header>\n        <hr />\n        <ion-card-content>\n          <ion-list radio-group [(ngModel)]="managerSkill.value">\n            <ion-grid>\n              <ion-row>\n                <ion-col col-12>\n                  <ion-item text-wrap no-padding>\n                    <ion-radio value="Strongly Agree" color="pink"></ion-radio>\n                    <ion-label>Strongly Agree</ion-label>\n                  </ion-item>\n                </ion-col>\n                <ion-col col-12>\n                  <ion-item text-wrap no-padding>\n                    <ion-radio value="Agree" color="pink"></ion-radio>\n                    <ion-label>Agree</ion-label>\n                  </ion-item>\n                </ion-col>\n                <ion-col col-12>\n                  <ion-item text-wrap no-padding>\n                    <ion-radio value="Can Not Say" color="pink"></ion-radio>\n                    <ion-label>Can Not Say</ion-label>\n                  </ion-item>\n                </ion-col>\n                <ion-col col-12>\n                  <ion-item text-wrap no-padding>\n                    <ion-radio value="Disagree" color="pink"></ion-radio>\n                    <ion-label>Disagree</ion-label>\n                  </ion-item>\n                </ion-col>\n                <ion-col col-12>\n                  <ion-item text-wrap no-padding>\n                    <ion-radio value="Strongly Disagree" color="pink"></ion-radio>\n                    <ion-label>Strongly Disagree</ion-label>\n                  </ion-item>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-list>\n        </ion-card-content>\n      </ion-card>\n    </ion-slide>\n\n  </ion-slides>\n\n  <div *ngIf="showPersonalDetailsForm" text-center>\n    <h5 ion-text color="pink">Personal Details</h5>\n    <ion-card>\n      <ion-card-header>Tell us about yourself:</ion-card-header>\n      <hr />\n      <ion-card-content>\n        <form [formGroup]="personalDetails">\n          <ion-item>\n            <ion-label floating>Company:</ion-label>\n            <ion-input formControlName="company" type="text"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-label floating>Industry:</ion-label>\n            <ion-input formControlName="industry" type="text"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-label floating>Company Location:</ion-label>\n            <ion-input formControlName="companyLocation" type="text"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-label floating>Company Size:</ion-label>\n            <ion-select formControlName="companySize">\n              <ion-option value="1 - 10">1 - 10</ion-option>\n              <ion-option value="11 - 50">11 - 50</ion-option>\n              <ion-option value="51 - 500">51 - 500</ion-option>\n              <ion-option value="501 - 2000">501 - 2000</ion-option>\n              <ion-option value="2001 - 10000">2001 - 10000</ion-option>\n              <ion-option value="10000+">10000+</ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item>\n            <ion-label floating>Designation:</ion-label>\n            <ion-select formControlName="designation">\n              <ion-option value="Entry Level Associate">Entry Level Associate</ion-option>\n              <ion-option value="Lower Management">Lower Management</ion-option>\n              <ion-option value="Middle Management">Middle Management</ion-option>\n              <ion-option value="Upper Management">Upper Management</ion-option>\n              <ion-option value="Leadership">Leadership</ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item>\n            <ion-label floating>Age group:</ion-label>\n            <ion-select formControlName="ageGroup">\n              <ion-option value="18 - 25">18 - 25</ion-option>\n              <ion-option value="25 - 35">25 - 35</ion-option>\n              <ion-option value="35 - 45">35 - 45</ion-option>\n              <ion-option value="45 - 55">45 - 55</ion-option>\n              <ion-option value="55 and above">55 and above</ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item>\n            <ion-label floating>Gender:</ion-label>\n            <ion-select formControlName="gender">\n              <ion-option value="Male">Male</ion-option>\n              <ion-option value="Female">Female</ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item>\n            <ion-label color="primary">I Rate My Manager:</ion-label>\n          </ion-item>\n          <star-rating (ratingChanged)="updateRating($event)"></star-rating>\n        </form>\n      </ion-card-content>\n    </ion-card>\n  </div>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col col-6 text-center *ngIf="!showPersonalDetailsForm">\n        <button ion-button block *ngIf="getCurrentSlide() != 0 && getCurrentSlide() != totalSlides && !showPersonalDetailsForm"\n          (click)="back()">\n          Back\n        </button>\n      </ion-col>\n      <ion-col col-6 text-center *ngIf="!showPersonalDetailsForm">\n        <button ion-button block (click)="next()">\n          Next\n        </button>\n      </ion-col>\n      <ion-col col-12 *ngIf="showPersonalDetailsForm">\n        <button ion-button block (click)="submit()">\n          Submit\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"/home/cesar/dev/exemplo/feedback-360/src/pages/feedback-form/feedback-form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_common_common__["a" /* CommonProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_backend_backend__["a" /* BackendProvider */]])
    ], FeedbackFormPage);
    return FeedbackFormPage;
}());

//# sourceMappingURL=feedback-form.js.map

/***/ }),

/***/ 660:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__star_rating_star_rating__ = __webpack_require__(661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(89);
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
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__star_rating_star_rating__["a" /* StarRatingComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 661:
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
    StarRatingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'star-rating',template:/*ion-inline-start:"/home/cesar/dev/exemplo/feedback-360/src/components/star-rating/star-rating.html"*/'<!-- Generated template for the StarRatingComponent component -->\n<div>\n  <ion-icon large color="{{ rating >= 1 ? \'pink\' : \'light\' }}" name="star" (click)="changeRating(0)"></ion-icon>\n  <ion-icon large color="{{ rating >= 2 ? \'pink\' : \'light\' }}" name="star" (click)="changeRating(1)"></ion-icon>\n  <ion-icon large color="{{ rating >= 3 ? \'pink\' : \'light\' }}" name="star" (click)="changeRating(2)"></ion-icon>\n  <ion-icon large color="{{ rating >= 4 ? \'pink\' : \'light\' }}" name="star" (click)="changeRating(3)"></ion-icon>\n  <ion-icon large color="{{ rating >= 5 ? \'pink\' : \'light\' }}" name="star" (click)="changeRating(4)"></ion-icon>\n</div>\n'/*ion-inline-end:"/home/cesar/dev/exemplo/feedback-360/src/components/star-rating/star-rating.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], StarRatingComponent);
    return StarRatingComponent;
}());

//# sourceMappingURL=star-rating.js.map

/***/ })

});
//# sourceMappingURL=1.js.map