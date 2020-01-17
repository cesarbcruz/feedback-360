import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';

import { BackendProvider } from '../../providers/backend/backend';
import { CommonProvider } from '../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  details: FormGroup;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private common: CommonProvider,
    private backend: BackendProvider
  ) { }

  ionViewWillLoad() {    
    this.details = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }

  goToRegister() {
    this.navCtrl.setRoot('RegisterPage');
  }

  login() {
    if (!this.details.valid) {
      return this.common.getToast('Please fill fields correctly!').present();
    }

    this.backend.login(this.details.value.email, this.details.value.password).then(res => {
      if (res.user) {
        this.common.getToast('Logged in successfully!', 2000).present();
      }
    }).catch(error => {
      if (error.code == 'auth/user-not-found') {
        this.common.getToast('No user found with given credentials!').present();
      } else if (error.code == 'auth/wrong-password') {
        this.common.getToast('No user found with given credentials!').present();
      }
    });

  }

}
