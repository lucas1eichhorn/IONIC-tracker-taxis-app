import { UsuarioProvider } from "./../../providers/usuario/usuario";
import { LoginPage } from "./../login/login";
import { UbicacionProvider } from "./../../providers/ubicacion/ubicacion";
import { NavController } from "ionic-angular";

//mapa
import { Component } from "@angular/core";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  //lat: number = 51.678418;
  //lng: number = 7.809007;
  user: any = {};
  constructor(
    public navCtrl: NavController,
    public _ubicacionProvider: UbicacionProvider,
    public _usuarioProv: UsuarioProvider
  ) {
    this._ubicacionProvider.iniciarGeoLocalizacion();
this._ubicacionProvider.inicializarTaxista();
    //taxista es un observable, y valueChanges dispara el evento cuando el objeto cambia
    //debemos suscribirnos a los eventos para ver los cambios
    this._ubicacionProvider.taxista.valueChanges().subscribe(data => {
      console.log("Cambio ubicacion del taxista!");
      console.log(data);
      this.user = data;
    });
  }
  salir() {
    this._ubicacionProvider.detenerUbicacion();
    this._usuarioProv.borrarUsuario();
    //redireccionamos a la pagina de login
    this.navCtrl.setRoot(LoginPage);
  }
}
