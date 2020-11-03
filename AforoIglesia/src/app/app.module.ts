import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from "../environments/environment"

// > ANGULAR FIRE
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireFunctionsModule, REGION, ORIGIN } from '@angular/fire/functions';


import { Store } from './store';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    // > ANGULAR FIRE
    AngularFireModule.initializeApp(
      environment.firebaseConfig
    ),
		AngularFirestoreModule,
		AngularFireAuthModule,
		AngularFireStorageModule,
    AppRoutingModule,
    AngularFireFunctionsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Store,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: REGION, useValue: 'asia-northeast1' },
    { provide: ORIGIN, useValue: 'http://localhost:5001' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
