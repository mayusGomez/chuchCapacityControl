import { Injectable } from '@angular/core';

import { Observable, Subscription, of, BehaviorSubject, Subject } from 'rxjs';
import { tap, filter, map, switchMap, take } from 'rxjs/operators';
import * as firebase from 'firebase';
import {
  AngularFirestore, AngularFirestoreCollection
} from '@angular/fire/firestore';

import { Store } from '../store';
import { Location } from "../models/locations"


@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private locationsCollection: AngularFirestoreCollection<Location>;
  locations: Observable<Location[]>;

  constructor(
    private db: AngularFirestore
  ) { 

    this.locationsCollection = db.collection<Location>('Ubicaciones');
    this.locations = this.locationsCollection.valueChanges();

  }

}
