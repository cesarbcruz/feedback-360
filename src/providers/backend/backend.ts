import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';


import { Feedback, Profile, Job } from '../../app/app.model';

@Injectable()
export class BackendProvider {
  

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase
  ) {
    this.afAuth.auth.setPersistence('local');    
  }

  getCurrentUser() {
    return this.afAuth.auth.currentUser || {} as { uid: string, email: string, photoURL: string };
  }

  authState() {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPasswordEmail(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  addFeedback(uidDestination:string, feedback: Feedback[]) {
    let uidSender = this.getCurrentUser().uid
    return this.afDb.object<Feedback[]>('feedbacks/'+uidDestination+"/"+uidSender).update(feedback);
  }


  getFeedback(uidDestination:string) {
    let uidSender = this.getCurrentUser().uid
    return this.afDb.object('feedbacks/'+uidDestination+"/"+uidSender).valueChanges();
  }

  getFeedbacks() {
    return this.afDb.list('feedbacks').valueChanges();
  }

  getFeedbacksProfile(uid) {
    return this.afDb.list('feedbacks/'+uid, ref => ref.orderByChild('skill')).valueChanges();
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  addProfile(profile: Profile) {
    return this.afDb.object<Profile>('profiles/'+profile.uid).update(profile);
  }

  getProfile() {
    let uid =  this.getCurrentUser().uid;
    return this.afDb.object<Profile>('profiles/'+ uid).valueChanges();
  }

  getProfiles() {
    return this.afDb.list<Profile>('profiles', ref => ref.orderByChild('name')).valueChanges();
  }

  getJobs() {
    return this.afDb.list<Job>('jobs', ref => ref.orderByChild('name')).valueChanges();
  }

  addJob(job: Job) {
    return this.afDb.object<Profile>('jobs/'+job.name).update(job);
  }

  getJob(jobTitle:string) {
    return this.afDb.object<Job>('jobs/'+ jobTitle).valueChanges();
  }

}
