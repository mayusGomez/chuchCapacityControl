import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from "./store";
import { UserProfile } from "./models/user-profile";
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  dark = false;
  user: UserProfile;
  loggedIn: boolean;

  public appPages = [
    {
      title: 'Programar',
      url: 'locations',
      icon: "calendar"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService:AuthService,
    private store: Store
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    /*const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    
    user$ = this.store.select<UserProfile>("user").subscribe( up => {
      this.user = up ;
      console.log("User Profile:", this.user);
    });
    */
    console.log("oninit");
    this.store.select<UserProfile>("user").subscribe( up => {
      this.loggedIn = true ? up != undefined: false;
      this.user = up;
    });

  }

  closeSession() {
    this.authService.logoutUser();
  }

}
