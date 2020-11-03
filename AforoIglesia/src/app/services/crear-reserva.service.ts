import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AngularFirestore
} from '@angular/fire/firestore';


export interface UserRequestModel {
  name: string
  document: string
  phone: string
  address: string

  day: string
  ubication: string
  date: string
  hours: string[]
}

export interface UserFireModel {
  name: string
  document: string
  phone?: string
  address?: string
}

export interface SchedulMod {
  capacity?: number
  hours?: string[]
}

export interface ScheduledMod {
  total: number
  users: UserRequestModel[]
}

export interface ScheduledFireMod {
  total: number
  users?: UserFireModel[]
}

export interface FireDocMod {
  [k: string]: ScheduledFireMod
}


@Injectable({
  providedIn: 'root'
})
export class CrearReservaService {

  data$: Observable<any>;

  constructor(
    public http: HttpClient,
    public firestore: AngularFirestore
  ) { }

  async crearReserva(
    name: string, 
    document: string, 
    phone: string, 
    address: string,
    ubication: string,
    date: string,
    hours: string[]
  ): Promise<any> {

    let data: UserRequestModel = {
      name: name,
      document: document,
      phone: phone,
      address: address,
      ubication: ubication,
      date: date,
      hours: hours,
      day: "0"
    }

    let resp:any = {};
 
    console.log("crearReserva");
    console.log("data.date:", data.date);
    data.day = "" + (new Date(data.date)).getDay();
    data.date = data.date.split("T")[0]
    console.log("data.date with split:", data.date);
    data.date = data.date.replace(/-/g,"");

    console.log("data.day:", data.day);
    console.log("data.date:", data.date);
 
    try {
       resp["msg"] = await this.runTx(data) 
 
       if (resp["msg"] === "OK"){
          resp["code"] = 0
       } else{
          resp["code"] = 1
       }
       
    } catch (err){
       resp["msg"] = err.toString();
       resp["code"] = 2
    }
 
    return resp
  };
 
  async runTx(data :UserRequestModel): Promise<string>{
 
    console.log("runTx");
    console.log(data);
 
    // Primero busca el documento de programacion y obtiene el aforo total y si esxiste la llave
    let schedul = this.firestore.firestore.collection("Ubicaciones").doc(data.ubication).collection("Programaciones").doc("" + data.day);
    let fireDoc: FireDocMod={};
    let fireDocPriv: FireDocMod={};
 
    let capacity:number = 0;
 
    try {
       
       await schedul.get().then(function(doc) {
 
          if (!doc.exists) {
             throw new Error("No existe programacion para el dia seleccionado")
          }
 
          let schedulData: any = doc.data();
 
          if (!(schedulData.aforo > 0)){
             throw new Error("No hay aforo disponible para el dia seleccionado")
          }
 
          // Buscar si la hora esta definida en la programacion
          if (schedulData.horas.length != undefined){
             for (let hour of data.hours){
                let found = schedulData.horas.indexOf(hour, 0);
                if (found < 0){
                   throw new Error("La hora seleccionada no esta disponible");
                }
             }
          }
 
          capacity = schedulData.aforo;
          // hours = schedulData.horas;
       });
 
       // transaccion para actualizar la programacion
       let sheduled  = this.firestore.firestore.collection("Ubicaciones").doc(data.ubication).collection("Programado").doc(""+data.date);
       let sheduledPriv  = this.firestore.firestore.collection("Ubicaciones").doc(data.ubication).collection("ProgramadoPriv").doc(""+data.date);
 
       await this.firestore.firestore.runTransaction( transaction => {
 
          return transaction.get(sheduledPriv).then(function(sheduledDoc) {
 
             if (!sheduledDoc.exists){
 
                let scheduledFireMod: ScheduledFireMod = {
                   total: 1
                };
 
                let scheduledFireModPriv: ScheduledFireMod = {
                   total: 1,
                   users: [
                      {
                         name: data.name,
                         address: data.address,
                         phone: data.phone,
                         document: data.document
                      }
                   ]
                };
                
                for (let hour of data.hours) {
                   fireDoc[hour] = scheduledFireMod;
                   fireDocPriv[hour] = scheduledFireModPriv;
                }
 
                transaction.set(sheduled, fireDoc);
                transaction.set(sheduledPriv, fireDocPriv);
                
             } else {
                let fireSheduledDoc: any = sheduledDoc.data();
                fireDocPriv = fireSheduledDoc;
                fireDoc = {};
 
                let us:UserFireModel = {
                   name: data.name,
                   address: data.address,
                   phone: data.phone,
                   document: data.document
                }
 
                for (let hour of data.hours) {
                   if (fireDocPriv[hour] != undefined){
                      if ( fireDocPriv[hour].total < capacity){
 
                         let f = fireDocPriv[hour].users?.find( u => u.document === us.document);
                         if ( f == undefined ){
                            fireDocPriv[hour].total += 1;
                            fireDocPriv[hour].users?.push(us);
                         } else {
                            throw new Error("El documento ingresado tiene reserva previa para la hora:" + hour);
                         }
                      } else {
                         throw new Error("Aforo completo para la hora:" + hour);
                      }
                   }else {
                      fireDocPriv[hour] = {
                         total: 1,
                         users: [
                            us
                         ]
                      }
                   }
                }
 
                for (let key in fireDocPriv){
                   fireDoc[key] = {
                      total: fireDocPriv[key].total
                   }
                }
 
                transaction.set(sheduledPriv, fireDocPriv);
                transaction.set(sheduled, fireDoc);
             }
           });
        });
 
       return "OK";
    }
    catch(error) {
       console.log("Err:", error);
       return error.toString();
    }; 
 
  }


}
