webpackJsonp([3],{

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile__ = __webpack_require__(672);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */]),
            ],
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
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




var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, common, backend) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.common = common;
        this.backend = backend;
        this.setup();
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loading = this.common.getLoading('Carregando...');
        loading.present();
        this.backend.getJobs().subscribe(function (res) {
            _this.jobs = res;
            _this.getProfile();
            loading.dismiss();
        });
    };
    ProfilePage.prototype.getProfile = function () {
        var _this = this;
        this.backend.getProfile().subscribe(function (p) {
            if (p) {
                _this.profile = p;
                _this.jobs.forEach(function (job) {
                    if (p.jobTitle === job.name)
                        _this.jobSelected = job;
                });
            }
        });
    };
    ProfilePage.prototype.save = function () {
        var _this = this;
        this.profile.jobTitle = this.jobSelected.name;
        this.backend.addProfile(this.profile).then(function (p) {
            _this.common.getToast('Perfil Atualizado!').present();
            _this.navCtrl.push("MenuPage");
        });
    };
    ProfilePage.prototype.setup = function () {
        this.backend.addJob({ name: "DEV JR", skills: ["JAVA", "SPRING", "POO", "LOGICA", "UML", "TESTE", "HTML/CSS", "SQL", "LINUX", "GIT"]
        }).then();
        this.backend.addJob({ name: "DEV I", skills: ["JAVA", "SPRING", "MVC", "MVP", "DRY", "POO", "TESTE", "UML", "JUNIT", "JAVASCRIPT", "HTML/CSS", "SQL", "LINUX", "GIT", "JPA", "REST", "MENSAGERIA", "ANGULAR", "CLEAN CODE", "MAVEN"]
        }).then();
        this.backend.addJob({ name: "DEV II", skills: ["JAVA", "SOLID", "MVC", "MVP", "DRY", "POO", "TESTE", "JUNIT", "DESIGN PATTERN", "SPRING", "UML", "IONIC", "JAVASCRIPT", "ANGULAR", "SQL", "JBOSS", "LINUX", "DOCKER", "GIT", "JPA", "MICROSERIVCE", "REST", "MENSAGERIA", "KAFKA", "NOSQL", "CLEAN CODE", "MAVEN", "GRADLE"]
        }).then();
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/home/cesar/dev/exemplo/feedback-360/src/pages/profile/profile.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Seu Perfil</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <h4 ion-text color="orange" text-center>Função</h4>\n  <ion-item>\n    <ion-label floating>Selecione</ion-label>\n    <ion-select [(ngModel)]="jobSelected">\n      <ion-option *ngFor="let job of jobs" [value]="job">{{ job.name }}</ion-option>\n    </ion-select>\n  </ion-item>\n  <div *ngIf="jobSelected"> \n          <ion-label>Competências:</ion-label>\n          <ion-badge color="light"  *ngFor="let skill of jobSelected.skills.sort()" >{{skill}}</ion-badge>\n  </div>\n  <div padding></div>\n  <button [attr.disabled]="jobSelected ? null : \'\'" ion-button block (click)="save()">Salvar</button>\n\n  \n</ion-content>\n'/*ion-inline-end:"/home/cesar/dev/exemplo/feedback-360/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_common_common__["a" /* CommonProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ })

});
//# sourceMappingURL=3.js.map