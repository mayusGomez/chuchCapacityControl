import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
import { UserProfile } from '../models/user-profile';
import { ResponseObject } from '../models/generic';
import { Store } from '../store';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userUid: string;
  public email_verified: boolean=false;
  userSubsc$: Subscription;
  authSt$: Subscription;

  constructor(
      public afAuth: AngularFireAuth,
      public fireStore: AngularFirestore,
      public store: Store,
      public router: Router
  ) {

  }

  userSubsc() {
    if (this.userSubsc$) {
      this.userSubsc$.unsubscribe();
    }
    if (this.userUid != undefined){
      this.userSubsc$ = this.fireStore.doc<UserProfile>(`Usuarios/${this.userUid}`).valueChanges().subscribe( profile => {
        console.log("Profile:", profile);
        const user: UserProfile = {
          ...profile
        };
        this.store.set('user', user);
      });
    } else {
      this.store.set('user', undefined);
    }
    
  }

  authState() {

    this.authSt$ = this.afAuth.authState.subscribe( user =>{
      console.log("Auth State:", user);
      this.userUid = user?.uid;
      this.email_verified = user?.emailVerified;
      this.userSubsc();
    });
    //return this.afAuth.authState;

  }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    this.authState();
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  logoutUser() {
    this.afAuth.signOut();
    if (this.authSt$){
      this.authSt$.unsubscribe();
    }
    this.store.set('user', undefined);
    this.router.navigateByUrl('/');
  }

  async sendEmailVerification() {
    let user:any = firebase.auth().currentUser;
    return await user.sendEmailVerification().then(
      (success) => { return { 'errCode': 0, 'msg': 'Verification sended'} } 
    ).catch(
      (err) => {
        return { 'errCode': 1, 'msg': err };
      }
    );
  }

  emailIsVerified(){
    return this.email_verified;
  }

  async createUser(userProfile: UserProfile, password: string): Promise<ResponseObject> {
    
    let resp : ResponseObject = {
      object: null,
      code: 0,
      errMsg: ''
    };

    try{
      const userCredential: firebase.auth.UserCredential = await this.afAuth.createUserWithEmailAndPassword(
        userProfile.email,
        password
      );

      userProfile.id = userCredential.user.uid;
      
      const userProfileDoc: AngularFirestoreDocument<UserProfile> = this.fireStore.doc(`Usuarios/${userCredential.user.uid}`);
      await userProfileDoc.set({
        ...userProfile
      });

      resp['userCredential'] = userCredential.user;

      return resp;

    }catch (err){
      console.log('error al crear cuenta');
      console.log(err);
      if (err.code === "auth/email-already-in-use"){
        resp['errCode'] = 1;
        resp['errMsg'] = 'El usuario ya posee una cuenta en el sistema';
      } else {
        resp['errCode'] =-1;
        resp['errMsg'] = err.message;
      }
      
      return resp;
      
    }
  }

}


