import { Component, OnInit } from '@angular/core';
import { LocationsService } from "../../services/locations.service"
import { NavController, ModalController, LoadingController } from "@ionic/angular";
import { Location } from "../../models/locations";


@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {

  constructor(
    public locationService: LocationsService,
    private navController: NavController
  ) { }

  ngOnInit() {
  }

  openDetail(location: Location) {
		//--------------------------
		this.navController.navigateForward(
			`programar/${location.id}`
		);
	}

}
