import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, Slides, NavController } from 'ionic-angular';

import { CommonProvider } from '../../providers/common/common';
import { BackendProvider } from '../../providers/backend/backend';
import { Feedback } from '../../app/app.model';

@IonicPage()
@Component({
  selector: 'page-feedback-form',
  templateUrl: 'feedback-form.html',
})
export class FeedbackFormPage {

  @ViewChild(Slides) slides: Slides;

  managerBehaviour = [];
  managerSkills: any = [
    {
      name: 'Excellent Communicator'
    },
    {
      name: 'Knows his/her job'
    },
    {
      name: 'Soft Spoken'
    },
    {
      name: 'Supportive'
    },
    {
      name: 'Fearless'
    },
    {
      name: 'Motivator'
    }
  ];
  personalDetails: FormGroup;
  starRating = 0;

  showPersonalDetailsForm = false;
  totalSlides = 7;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private common: CommonProvider,
    private backend: BackendProvider
  ) { }

  ionViewWillLoad() {
    this.personalDetails = this.formBuilder.group({
      company: ['', Validators.required],
      industry: ['', Validators.required],
      companyLocation: ['', Validators.required],
      companySize: ['', Validators.required],
      designation: ['', Validators.required],
      ageGroup: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
  }

  getCurrentSlide() {
    if (this.slides) return this.slides.getActiveIndex();
  }

  behaviourSelect($event, label: string) {
    const { checked } = $event;
    const index = this.managerBehaviour.indexOf(label);
    if (checked) {
      this.managerBehaviour.push(label);
    } else {
      this.managerBehaviour.splice(index, 1);
    }
    this.managerBehaviour = Array.from(new Set(this.managerBehaviour));
  }

  updateRating(rating: number) {
    this.starRating = rating;
  }

  back() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev(300);
    this.slides.lockSwipes(true);
  }

  next() {
    const current = this.getCurrentSlide();
    const showToast = () => this.common.getToast('Please select at least one option!').present();

    if (current == 0 && !this.managerBehaviour.length) {
      return showToast();
    } else if ((current <= 6 && current > 0) && !this.managerSkills[current - 1].value) {
      return showToast();
    }

    if (current == 6) this.showPersonalDetailsForm = true;
    else {
      this.slides.lockSwipes(false);
      this.slides.slideNext(300);
      this.slides.lockSwipes(true);
    }
  }

  submit() {
    if (!this.personalDetails.valid) {
      return this.common.getToast('Please fill all fields!').present();
    } else if (!this.starRating) {
      return this.common.getToast('Please fill star rating!').present();
    }

    const feedback: Feedback = {
      managerBehaviour: this.managerBehaviour,
      managerSkills: this.managerSkills,
      personalDetails: this.personalDetails.value,
      starRating: this.starRating,
      createdAt: new Date().toString()
    };

    this.backend.addFeedback(feedback).then(res => {
      this.common.getToast('Feedback submitted!', 2000).present();
      this.navCtrl.pop();
    }).catch( error => console.log(error));

    console.log(feedback);

  }

}