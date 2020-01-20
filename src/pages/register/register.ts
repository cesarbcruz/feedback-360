import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CommonProvider } from '../../providers/common/common';
import { BackendProvider } from '../../providers/backend/backend';
import { Profile } from '../../app/app.model';


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
    private backend: BackendProvider
  ) {

  }

  ionViewWillLoad() {
    this.details = this.formBuilder.group({
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
      return this.common.getToast('Please fill fields correctly!').present();
    }

    this.backend.register(this.details.value.email, this.details.value.password).then(res => {
      if (res.user) {
        let profile:Profile = {
          uid: res.user.uid,
          email: res.user.email,
          photoBase64: this.photoBase64
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
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.previewPhoto = event.target.result;
        this.photoBase64 = btoa(this.previewPhoto);
      }
      reader.readAsDataURL(event.target.files[0]);
    }  
  }

}