import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, Slides, NavController, Content } from 'ionic-angular';

import { CommonProvider } from '../../providers/common/common';
import { BackendProvider } from '../../providers/backend/backend';
import { Feedback, Profile, Job } from '../../app/app.model';

@IonicPage()
@Component({
  selector: 'page-feedback-form',
  templateUrl: 'feedback-form.html',
})
export class FeedbackFormPage {

  profiles: Profile[]=[];
  profileSelected: Profile;
  job:Job;
  feedback = new Map<string, Feedback>();

  @ViewChild(Slides) slides: Slides;

  @ViewChild(Content) content: Content;


  
  showPersonalDetailsForm = false;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private common: CommonProvider,
    private backend: BackendProvider
  ) { 
  }

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
    this.profileSelected = null;
    this.job = null;
    this.feedback = new Map<string, Feedback>();
  }

  avaliar(profile:Profile) {
    this.profileSelected = profile
    this.showPersonalDetailsForm = true;
    this.slides.lockSwipes(false);
    this.slides.slideNext(300);
    this.slides.lockSwipes(true);
    this.loadJob(profile.jobTitle);
  }

  loadJob(jobTitle:string){
    this.backend.getJob(jobTitle).subscribe( res =>{
      this.job = res;
    })
  }

  updateRating(skill:string, rating:number){
    this.feedback.set(skill, <Feedback> {skill, rating});
  }

  submit() {

    if(this.feedback.size==0){
      return this.common.getToast('Nenhuma competência foi avaliada!').present();
    }

    this.common.getToast('Obrigado, seu feedback foi registrado!').present();
    this.backend.addFeedback(this.profileSelected.uid,Array.from(this.feedback.values()));
    this.navCtrl.pop();    

  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  scrollToBottom() {
    this.content.scrollToBottom();
  }

}