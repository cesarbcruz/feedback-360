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

  resetPasswordEmail(){
    if (!this.details.value.email) {
      return this.common.getToast('Informe o email para recuperar a senha!', 3000).present();
    }

    this.backend.resetPasswordEmail(this.details.value.email).then(res=>{
      return this.common.getToast('Você receberá um email com as instruções!', 3000).present();
    }).catch(error => {
      if (error.code == 'auth/invalid-email') {
        this.common.getToast('Email inválido!', 2000).present();
      } else if (error.code == 'auth/user-not-found') {
        this.common.getToast('Nenhum usuário encontrado com o email fornecido!', 3000).present();
      }
    });
  }

  login() {
    if (!this.details.valid) {
      return this.common.getToast('Preencha todos os campos corretamente!').present();
    }

    this.backend.login(this.details.value.email, this.details.value.password).then(res => {
      if (res.user) {
        this.common.getToast('Seja bem vindo!', 2000).present();
      }
    }).catch(error => {
      if (error.code == 'auth/user-not-found') {
        this.common.getToast('Nenhum usuário encontrado com credenciais fornecidas!').present();
      } else if (error.code == 'auth/wrong-password') {
        this.common.getToast('Usuário e/ou senha inválidos!').present();
      }
    });

  }

}
