import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { ModalController } from '@ionic/angular';

import { ModalPage } from "../modal/modal.page";

import { Schedule, ScheduleList, ListDetail } from "../../models/program";
import { Store } from "../../store";
import { ProgramacionesService } from "../../services/programaciones.service";
import { ProgramadoService } from "../../services/programado.service";


@Component({
  selector: 'app-programar',
  templateUrl: './programar.page.html',
  styleUrls: ['./programar.page.scss'],
})
export class ProgramarPage implements OnInit, OnDestroy {

  daySelected$: Subscription;
  schedule: Schedule;
  docId: string;

  scheduleList: ScheduleList;

  lastIndexSelected: number;
  totSelected: number;
  maxToSlect: number = 2;
  selectedTimes: string[];
  filter_date: string;
  date: string;

  constructor(
    public store: Store,
    public progServi: ProgramacionesService,
    public programadoService: ProgramadoService,
    private route: ActivatedRoute,
    public modalController: ModalController
  ) { 
    this.totSelected = 0;
    this.docId = this.route.snapshot.paramMap.get("document_code");
    this.scheduleList = {
      items: []
    }
    this.selectedTimes = [];
  }

  ngOnInit() {
  }

  clean(){
    this.selectedTimes = [];
    this.totSelected = 0;
    this.lastIndexSelected = undefined;
  }

  filterDate(event: any){
    this.clean();

    let day = new Date(event.detail.value).getDay();
    this.filter_date = event.detail.value.split("T")[0];
    this.filter_date = this.filter_date.replace(/-/g,"");
    this.date = event.detail.value;

    console.log(this.filter_date);
    let key = "schedule_" + day;
    
    this.daySelected$ = this.store.select<Schedule>(key).subscribe( schel => {
      if (schel === undefined ){
        this.progServi.loadProgramacion(this.docId, day);
      } else {
        this.schedule = schel;

        this.programadoService.getScheduled(this.docId, this.filter_date).subscribe( programado => {
          if ( programado !== undefined){
            this.scheduleList.items = [];
            // Recorrer horas de la programacion
            for (let hora of this.schedule.horas){
              if (programado[hora] !== undefined){

                let det : ListDetail = {
                  hora: hora,
                  total: programado[hora].total,
                  available: this.schedule.aforo - programado[hora].total < 1? "N": "S",
                  col: ""
                }
                this.scheduleList.items.push(det);

              } else {

                let det : ListDetail = {
                  hora: hora,
                  total: 0,
                  available: "S",
                  col: ""
                }
                this.scheduleList.items.push(det);
              }
            }
          } else{
            this.scheduleList.items = [];
            for (let hora of this.schedule.horas){
              let det : ListDetail = {
                hora: hora,
                total: 0,
                available: "S",
                col: ""
              }
              this.scheduleList.items.push(det);
            }
          }

        });

      }
      
    });

  }

  ngOnDestroy() {
    this.daySelected$.unsubscribe();
  }

  selectItem(item: ListDetail, index: number){
    // Verificar si lo que se quiere es des seleccionar un item
    if (item.col !== "" && index === this.lastIndexSelected) {
      this.totSelected--;
      item.col = "";
      this.selectedTimes.pop();

      if (this.totSelected > 0 ){
        this.lastIndexSelected--;
        
      } else {
        this.lastIndexSelected = undefined;
      }

    } else  if  (item.available === "S" && this.lastIndexSelected === undefined) {
      this.lastIndexSelected = index;
      item.col = "medium";
      this.totSelected++;
      this.selectedTimes.push(item.hora);

    } else if (item.available === "S" && this.maxToSlect > this.totSelected && index - this.lastIndexSelected == 1) {
      this.lastIndexSelected =  this.lastIndexSelected > index? this.lastIndexSelected : index;
      item.col = "medium";
      this.totSelected++;
      this.selectedTimes.push(item.hora);
      
    }
    
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      swipeToClose: true,
      componentProps: {
        'site': this.docId,
        'date': this.date,
        'hours': this.selectedTimes
      }
    });
    modal.present().then( data => {
      this.clean();
      let tmp ={
        detail: {
          value: this.date,
        }
      }
      this.filterDate(tmp);
    });
  }


}
