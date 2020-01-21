import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CommonProvider } from '../../providers/common/common';
import { BackendProvider } from '../../providers/backend/backend';
import { Profile } from '../../app/app.model';
import { NgxPicaService, NgxPicaErrorInterface } from 'ngx-pica';
import { AspectRatioOptions } from 'ngx-pica/src/ngx-pica-resize-options.interface';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  details: FormGroup;
  previewPhoto;
  photoBase64;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private common: CommonProvider,
    private backend: BackendProvider,
    private ngxPicaService: NgxPicaService,
    public loadingCtrl: LoadingController
  ) {

  }

  ionViewWillLoad() {
    this.details = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      photo: ['', Validators.required]
    });
  }

  goToLogin() {
    this.navCtrl.setRoot('LoginPage');
  }

  register() {
    if (!this.details.valid) {
      return this.common.getToast('Preencha todos os campos!').present();
    }

    this.backend.register(this.details.value.email, this.details.value.password).then(res => {
      if (res.user) {
        let profile: Profile = {
          uid: res.user.uid,
          name: this.details.value.name,
          email: res.user.email,
          photoBase64: this.photoBase64,
          jobTitle: ''
        }
        this.backend.addProfile(profile).then(() => {
          this.common.getToast('User registered', 1000).present();
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        })
      }
    }).catch(error => {
      if (error.code == 'auth/email-already-in-use') {
        this.common.getToast('User with given email already registered!').present();
      } else if (error.code == 'auth/weak-password') {
        this.common.getToast('Password should be at least 6 characters').present();
      }
    });

  }

  fileChange(event) {
    if (event.target.files && event.target.files[0]) {

      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });

      loading.present();

      let options: AspectRatioOptions = {
        keepAspectRatio: true
      }
      this.ngxPicaService.resizeImages(event.target.files, 210, 250, { aspectRatio: options })
        .subscribe((imageResized: File) => {
          let reader: FileReader = new FileReader();

          reader.addEventListener('load', (event: any) => {
            this.previewPhoto = event.target.result;
            this.photoBase64 = btoa(this.previewPhoto);
          }, false);

          reader.readAsDataURL(imageResized);
          loading.dismiss();

        }, (err: NgxPicaErrorInterface) => {
          console.error(err)
          loading.dismiss();
        });
    }
  }

}