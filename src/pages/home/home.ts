import { UbicacionProvider } from "./../../providers/ubicacion/ubicacion";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public _ubicacionProvider: UbicacionProvider
  ) {
    this._ubicacionProvider.iniciarGeoLocalizacion();
  }
}
