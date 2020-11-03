import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ProgramadoPrivService } from "../../services/programado-priv.service";

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  scheduled: any[];
  ubication:string = "KgvayxrhObQd7lt56TTE";

  constructor(
    public programadoPrivService: ProgramadoPrivService
  ) { }

  ngOnInit() {
  }

  filterDate(event){
    let filter_date = event.detail.value.split("T")[0];
    filter_date = filter_date.replace(/-/g,"");

    this.programadoPrivService.getScheduled(this.ubication, filter_date).pipe(
      take(1)
    ).subscribe( shchedule => {

      this.scheduled = [];

      for (let k in shchedule){
        let obj = {
          key: k,
          total: shchedule[k].total,
          users: shchedule[k].users
        }
        this.scheduled.push(obj);
        
      }
      this.scheduled.sort((a, b) => (a.key > b.key) ? 1 : -1)

    });

  }

}
