import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from "ionic-angular";
import { ViewChild } from "@angular/core";
import { Slides } from "ionic-angular";
AlertController;
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  //referencia a los slides
  @ViewChild(Slides) slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
    //cuando la pagina cargo seteamos las propiedades del slide
    this.slides.paginationType = "progress";
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
  }
  //mostrar prompt solicitud usuario
  mostrarInput() {
    let alert = this.alertCtrl.create({
      title: "Ingresar usuario",
      inputs: [
        {
          name: "username",
          placeholder: "Username"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Ingresar",
          handler: data => {
            //funcion que se ejecuta cuando hago click
            console.log(data);
            this.verificarUsuario(data.username);
          }
        }
      ]
    });
    alert.present();
  }
  verificarUsuario(clave: string) {
    let loading = this.loadingCtrl.create({
      content: "Verificando"
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }
}
