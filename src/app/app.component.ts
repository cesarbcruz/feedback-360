import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackendProvider } from '../providers/backend/backend';
import { Store } from '@ngrx/store';
import * as ProfileActions from '../actions/profile.actions';
import { AppState } from '../reducers';

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
    backend: BackendProvider,
    store: Store<AppState>
  ) {

    // watch user auth changes
    backend.authState().subscribe(auth => {
      if (!auth) {
        this.nav.setRoot('LoginPage');
      } else {
        backend.getProfile().subscribe(profile => {
          store.dispatch(new ProfileActions.EditProfile(profile));
          this.nav.setRoot('MenuPage');
        });        
      }
    });

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

}

