import { Component, OnInit, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CrearReservaService } from "../../services/crear-reserva.service";
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  public programar: FormGroup;

  @Input() site: string;
  @Input() hours: string[];
  @Input() date: string;

  constructor(
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    public crearReserva: CrearReservaService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) { 
    this.programar = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      document_number: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      phone:['', Validators.compose([Validators.minLength(7), Validators.required])],
      address:['', Validators.required]
    });

  }

  ngOnInit() {
  }

  async closeModal() {
		await this.modalController.dismiss();
  }
  
  async programarReserva(){

    const toast = await this.toastController.create({
      message: 'Cita Programada con exito',
      duration: 4000
    });

    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      duration: 10000
    });

    loading.present();

    this.crearReserva.crearReserva(
      this.programar.value.name, 
      this.programar.value.document_number, 
      this.programar.value.phone, 
      this.programar.value.address,
      this.site,
      this.date,
      this.hours
    ).pipe(
      take(1)
    ).subscribe( data => {

      if (data.code == 0) {
        toast.present();
        loading.dismiss();
        this.modalController.dismiss();


      } else {
        toast.message = data.msg.toString();
        loading.dismiss();
        toast.present();
      }
    });

  }

}
