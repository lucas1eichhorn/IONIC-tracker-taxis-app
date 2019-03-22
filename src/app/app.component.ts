import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "./../pages/home/home";
import { LoginPage } from "./../pages/login/login";

//provider usuario
import { UsuarioProvider } from "./../providers/usuario/usuario";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public _us: UsuarioProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this._us.cargarStorage().then(existe_clave => {
        statusBar.styleDefault();
        splashScreen.hide();
        if (existe_clave) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      });
    });
  }
}