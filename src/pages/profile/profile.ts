import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, setupConfig } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { CommonProvider } from '../../providers/common/common';
import { Job, Profile } from '../../app/app.model';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  jobSelected: Job;
  profile: Profile;
  jobs:Job[];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private common: CommonProvider,
    private backend: BackendProvider
  ) {

    this.setup();

    this.backend.getProfile().subscribe(p => {
      if(p){
        this.profile = p;
      } 
    });
  }

  ionViewDidLoad() {
    const loading = this.common.getLoading('Carregando...');
    loading.present();
    this.backend.getJobs().subscribe(res => {
      this.jobs = res;
      this.jobs.forEach(job => {
        if(this.profile && job.name == this.profile.jobTitle){
          this.jobSelected = job;
        } 
      });
      loading.dismiss();     
    });
  }

  save() {
    this.profile.jobTitle = this.jobSelected.name;
    this.backend.addProfile(this.profile).then(p => {
      this.common.getToast('Perfil Atualizado!').present();
    })    
  }

  setup(){
    this.backend.addJob({name:"DEV I", skills:["JAVA EE", "SPRING", "GWT", "HTML", "CSS", "SQL", "LINUX", "GIT"]
    }).then();
    this.backend.addJob({name:"DEV II", skills:["JAVA EE","SPRING", "GWT", "HTML", "CSS", "ANGULAR", "SQL", "JBOSS", "LINUX", "DOCKER", "GIT"]
    }).then();
  }

  selectJob(job: Job){
    console.log(job)
  }

}
