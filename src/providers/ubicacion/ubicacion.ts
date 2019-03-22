import { UsuarioProvider } from "./../usuario/usuario";
import { Geolocation } from "@ionic-native/geolocation";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Subscription } from "rxjs";

@Injectable()
export class UbicacionProvider {
  taxista: AngularFirestoreDocument<any>;
  private watch: Subscription;
  constructor(
    private geolocation: Geolocation,
    public _usuarioProv: UsuarioProvider,
    private afDB: AngularFirestore
  ) {
    console.log("Hello UbicacionProvider Provider");
  }
  inicializarTaxista() {
    //objeto taxista ubicado en  la db de firebase
    this.taxista = this.afDB.doc(`/usuarios/${this._usuarioProv.clave}`);
  }
  //obtiene la localizacion actual del dispositivo
  iniciarGeoLocalizacion() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        // resp.coords.latitude
        // resp.coords.longitude
        //actualiza el objeto agredando/editando propiedades con la posicion inicial
        this.taxista.update({
          lat: resp.coords.latitude,
          lng: resp.coords.longitude,
          clave: this._usuarioProv.clave
        });

        console.log(resp.coords);
        this.watch = this.geolocation.watchPosition().subscribe(data => {
          // data can be a set of coordinates, or an error (if an error occurred).
          // data.coords.latitude
          // data.coords.longitude
          console.log("cambio de ubicacion");
          console.log(data);
          //actualiza el objeto taxista con la posicion actual
          this.taxista.update({
            lat: data.coords.latitude,
            lng: data.coords.longitude,
            clave: this._usuarioProv.clave
          });

          console.log(this.taxista);
        });
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }
  detenerUbicacion() {
    try {
      this.watch.unsubscribe();
    } catch (e) {
      console.log("error");
      console.log(JSON.stringify(e));
    }
  }
}
