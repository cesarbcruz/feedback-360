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

  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  addFeedback(feedback: Feedback) {
    return this.afDb.list<Feedback>('feedbacks').push(feedback);
  }

  getFeedbacks() {
    return this.afDb.list<Feedback>('feedbacks').valueChanges();
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

  getJobs() {
    return this.afDb.list<Job>('jobs').valueChanges();
  }

  addJob(job: Job) {
    return this.afDb.object<Profile>('jobs/'+job.name).update(job);
  }

}
