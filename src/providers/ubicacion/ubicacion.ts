import { Geolocation } from "@ionic-native/geolocation";
import { Injectable } from "@angular/core";

@Injectable()
export class UbicacionProvider {
  constructor(private geolocation: Geolocation) {
    console.log("Hello UbicacionProvider Provider");
  }
  //obtiene la localizacion actual del dispositivo
  iniciarGeoLocalizacion() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        // resp.coords.latitude
        // resp.coords.longitude
        console.log(resp.coords);
        let watch = this.geolocation.watchPosition();
        watch.subscribe(data => {
          // data can be a set of coordinates, or an error (if an error occurred).
          // data.coords.latitude
          // data.coords.longitude
          console.log("cambio de ubicacion");
          console.log(data);
      
        });
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }
}
