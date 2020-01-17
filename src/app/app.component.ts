import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BackendProvider } from '../providers/backend/backend';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'LoginPage';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    backend: BackendProvider
  ) {

    // watch user auth changes
    backend.authState().subscribe(res => {
      if (!res) {
        this.nav.setRoot('LoginPage');
      } else {
        this.nav.setRoot('MenuPage');
      }
    });
    
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

