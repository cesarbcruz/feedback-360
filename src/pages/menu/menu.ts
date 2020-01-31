import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { BackendProvider } from '../../providers/backend/backend';
import { CommonProvider } from '../../providers/common/common';
import { Profile } from '../../app/app.model';
import { Store } from '@ngrx/store';
import { AppState, getProfile } from '../../reducers';

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
    private backend: BackendProvider,
    public store: Store<AppState>
  ) { }

  ionViewWillLoad() {
    this.getProfile();
  }

  getProfile(){
    this.store.select(getProfile).subscribe(profile => {
      this.profile = profile;
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
    this.navCtrl.push('ViewFeedbacksPage');
  }
  rating(){
    this.navCtrl.push('FeedbackFormPage');
  }

  logout() {
    this.backend.logout().then(() => {
      this.common.getToast('Obrigado por participar!').present();
    });
  }

}
