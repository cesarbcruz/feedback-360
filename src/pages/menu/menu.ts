import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { BackendProvider } from '../../providers/backend/backend';
import { CommonProvider } from '../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  email: string;

  constructor(
    private navCtrl: NavController,
    private common: CommonProvider,
    private backend: BackendProvider
  ) { }

  ionViewWillLoad() {
    this.email = this.backend.getCurrentUser().email;
  }

  rateManager() {
    this.navCtrl.push('FeedbackFormPage');
  }

  viewFeedbacks() {
    this.navCtrl.push('FilterPage');
  }

  logout() {
    this.backend.logout().then(() => {
      this.common.getToast('Logged Out Successfully!').present();
    });
  }

}
