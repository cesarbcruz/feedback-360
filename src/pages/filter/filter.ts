import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { CommonProvider } from '../../providers/common/common';

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  companies: string[] = [];
  selectedCompany: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private common: CommonProvider,
    private backend: BackendProvider
  ) { }

  ionViewDidLoad() {
    const loading = this.common.getLoading('Loading...');
    loading.present();
    this.backend.getFeedbacks().subscribe(res => {
      loading.dismiss();
      this.companies = Array.from(new Set(res.map(i => i.personalDetails.company)));
    });
  }

  filter() {
    this.navCtrl.push('ViewFeedbacksPage', {
      company: this.selectedCompany
    });
  }

}
