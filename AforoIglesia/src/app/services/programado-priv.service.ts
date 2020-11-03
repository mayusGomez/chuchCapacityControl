import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AngularFirestore
} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProgramadoPrivService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getScheduled(ubicacion: string, date: string) : Observable<any>{
    console.log("getScheduled:", date);
    return this.afs.doc<any>(`Ubicaciones/${ubicacion}/ProgramadoPriv/${date}/`).valueChanges()
  }

}
