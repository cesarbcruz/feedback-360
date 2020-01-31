webpackJsonp([2],{

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(677);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterPageModule = /** @class */ (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
            ],
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 677:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_common__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_backend_backend__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_pica__ = __webpack_require__(303);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, formBuilder, common, backend, ngxPicaService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.common = common;
        this.backend = backend;
        this.ngxPicaService = ngxPicaService;
        this.loadingCtrl = loadingCtrl;
    }
    RegisterPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        var loading = this.common.getLoading('Carregando...');
        loading.present();
        this.backend.getJobs().subscribe(function (res) {
            _this.jobs = res;
            loading.dismiss();
        });
        this.details = this.formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            job: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].email, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            confirmPassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            photo: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]
        });
    };
    RegisterPage.prototype.passwordMatcher = function () {
        return this.details.value.password === this.details.value.confirmPassword;
    };
    RegisterPage.prototype.goToLogin = function () {
        this.navCtrl.setRoot('LoginPage');
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        if (!this.details.valid) {
            return this.common.getToast('Preencha todos os campos!').present();
        }
        if (!this.passwordMatcher()) {
            return this.common.getToast('A confirmação de senha não confere!').present();
        }
        this.backend.register(this.details.value.email, this.details.value.password).then(function (res) {
            if (res.user) {
                var profile = {
                    uid: res.user.uid,
                    name: _this.details.value.name,
                    email: res.user.email,
                    photoBase64: _this.photoBase64,
                    jobTitle: _this.details.value.job.name
                };
                _this.backend.addProfile(profile).then(function () {
                    _this.common.getToast('Usuário Registrado', 1000).present();
                    _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
                });
            }
        }).catch(function (error) {
            if (error.code == 'auth/email-already-in-use') {
                _this.common.getToast('Email já cadastrado').present();
            }
            else if (error.code == 'auth/weak-password') {
                _this.common.getToast('A senha deve possuir no mínimo 6 caracteres').present();
            }
        });
    };
    RegisterPage.prototype.fileChange = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var loading_1 = this.loadingCtrl.create({
                content: 'Carregando...'
            });
            loading_1.present();
            var options = {
                keepAspectRatio: true
            };
            this.ngxPicaService.resizeImages(event.target.files, 210, 250, { aspectRatio: options })
                .subscribe(function (imageResized) {
                var reader = new FileReader();
                reader.addEventListener('load', function (event) {
                    _this.previewPhoto = event.target.result;
                    _this.photoBase64 = btoa(_this.previewPhoto);
                }, false);
                reader.readAsDataURL(imageResized);
                loading_1.dismiss();
            }, function (err) {
                console.error(err);
                loading_1.dismiss();
            });
        }
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/home/cesar/dev/exemplo/feedback-360/src/pages/register/register.html"*/'<ion-content text-center class="vertical-align-content" padding class="bg">\n  <img src="assets/imgs/irate.png" alt="">\n  <div style="padding: 20px"></div>\n\n  <ion-card>\n    <ion-card-content>\n      <ion-fab middle right>\n        <button ion-fab color="secondary" (click)="goToLogin()">\n          Login\n        </button>\n      </ion-fab>\n\n      <ion-card-header color="orange" text-center>Registrar</ion-card-header>\n\n      <form [formGroup]="details">\n\n        <ion-item>\n          <ion-label floating>Nome</ion-label>\n          <ion-input type="name" formControlName="name"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>Função</ion-label>\n            <ion-select formControlName="job">\n              <ion-option *ngFor="let job of jobs"  [value]="job">{{ job.name }}</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Email</ion-label>\n          <ion-input type="email" formControlName="email"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Senha</ion-label>\n          <ion-input type="password" formControlName="password"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>Confirmar Senha</ion-label>\n            <ion-input type="password" formControlName="confirmPassword"></ion-input>\n        </ion-item>\n\n        <ion-input formControlName="photo" [value]="this.photoBase64" hidden></ion-input>\n\n        <ion-grid>\n          <ion-row justify-content-center>\n            <button ion-button icon-left onclick="document.getElementById(\'getFile\').click()">\n              <ion-icon name="camera"></ion-icon>Foto\n            </button>\n          </ion-row>\n\n          <ion-row justify-content-center>\n\n            <input type="file" id="getFile" accept="image/*" value="" (change)="fileChange($event)" hidden>\n            <img id="photo" *ngIf="previewPhoto" [src]="previewPhoto" />\n          </ion-row>\n        </ion-grid>\n\n      </form>\n\n      <div padding="4"></div>\n      <button ion-button block (click)="register()">Salvar</button>\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"/home/cesar/dev/exemplo/feedback-360/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_common_common__["a" /* CommonProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_backend_backend__["a" /* BackendProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ngx_pica__["b" /* NgxPicaService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ })

});
//# sourceMappingURL=2.js.map