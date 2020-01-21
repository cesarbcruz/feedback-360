import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, Slides, NavController } from 'ionic-angular';

import { CommonProvider } from '../../providers/common/common';
import { BackendProvider } from '../../providers/backend/backend';
import { Feedback, Profile } from '../../app/app.model';

@IonicPage()
@Component({
  selector: 'page-feedback-form',
  templateUrl: 'feedback-form.html',
})
export class FeedbackFormPage {

  profiles: Profile[]=[];
  profileSelected: Profile;

  @ViewChild(Slides) slides: Slides;

  
  
  showPersonalDetailsForm = false;
  

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private common: CommonProvider,
    private backend: BackendProvider
  ) { }

  ionViewWillLoad() {
    this.backend.getProfiles().subscribe(res => {
      this.profiles = res;
    })
  }

  getImageProfile(imageBase64){
    if(imageBase64){
      return atob(imageBase64);
    }else{
      return 'assets/imgs/person-logo.png'
    }    
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
  }

  getCurrentSlide() {
    if (this.slides) return this.slides.getActiveIndex();
  }

  back() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev(300);
    this.slides.lockSwipes(true);
    this.showPersonalDetailsForm = false;
  }

  avaliar(profile:Profile) {
    this.profileSelected = profile
    this.showPersonalDetailsForm = true;
    this.slides.lockSwipes(false);
    this.slides.slideNext(300);
    this.slides.lockSwipes(true);
  }

  submit() {

    this.common.getToast('Obrigado, seu feedback foi registrado!').present();
    
    this.navCtrl.pop();    

  }

}