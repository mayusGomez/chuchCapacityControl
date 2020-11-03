import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AngularFireFunctions } from '@angular/fire/functions';



@Injectable({
  providedIn: 'root'
})
export class CrearReservaService {

  data$: Observable<any>;

  constructor(
    public http: HttpClient,
    public fns: AngularFireFunctions
  ) { }

  crearReserva(
    name: string, 
    document: string, 
    phone: string, 
    address: string,
    ubication: string,
    date: string,
    hours: string[]
  ): Observable<any> {

    const callable = this.fns.httpsCallable('helloWorld');
    this.data$ = callable({ 
      name: name,
      document: document,
      phone: phone,
      address: address,
      ubication: ubication,
      date: date,
      hours: hours
    });

    return this.data$;

  }

}
