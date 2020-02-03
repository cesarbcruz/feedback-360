import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FIREBASE_CONFIG } from './app.firebaseconfig';
import { MyApp } from './app.component';
import { CommonProvider } from '../providers/common/common';
import { BackendProvider } from '../providers/backend/backend';
import { NgxPicaModule } from 'ngx-pica';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../reducers';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgxPicaModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonProvider,
    BackendProvider,
    AngularFirestore,
  ]
})
export class AppModule {}
