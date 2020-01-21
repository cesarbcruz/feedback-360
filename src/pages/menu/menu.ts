import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { BackendProvider } from '../../providers/backend/backend';
import { CommonProvider } from '../../providers/common/common';
import { Profile } from '../../app/app.model';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  profile: Profile;

  constructor(
    private navCtrl: NavController,
    private common: CommonProvider,
    private backend: BackendProvider
  ) { }

  ionViewWillLoad() {
    this.backend.getProfile().subscribe(p => {
      this.profile = p;
    });
  }

  getImageProfile(){
    if(this.profile && this.profile.photoBase64){
      return atob(this.profile.photoBase64);
    }else{
      return 'assets/imgs/person-logo.png'
    }    
  }

  viewProfile() {
    this.navCtrl.push('ProfilePage');
  }

  viewFeedbacks() {
    this.navCtrl.push('FeedbackFormPage');
  }

  logout() {
    this.backend.logout().then(() => {
      this.common.getToast('Obrigado por participar!').present();
    });
  }

}
