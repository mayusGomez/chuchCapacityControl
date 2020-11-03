import { Injectable } from '@angular/core';

import {
  AngularFirestore
} from '@angular/fire/firestore';

import { Schedule } from "../models/program";
import { Store } from "../store";

@Injectable({
  providedIn: 'root'
})
export class ProgramacionesService {

  constructor(
    private afs: AngularFirestore,
    private store: Store
  ) {
    
  }

  /*
  * Carga datos del dia a programar
  */
  loadProgramacion(docId: string, day: number){
    this.afs.doc<Schedule>(`Ubicaciones/${docId}/Programaciones/${day}/`).valueChanges().subscribe( schel => {
      console.log("schel:" + schel);
      if (schel !== undefined){
        const data: Schedule = {
          ...schel
        };
        let key = 'schedule_' + day;
        this.store.set(key, data);
      }
      
    });
  }

}
