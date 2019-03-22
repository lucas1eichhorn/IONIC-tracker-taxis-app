import { Subscription } from 'rxjs';
import { Platform } from "ionic-angular";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Storage } from "@ionic/storage";

@Injectable()
export class UsuarioProvider {
  clave: string;
  usuario: any = {};
  private doc:Subscription;
  constructor(
    private afDB: AngularFirestore,
    private platform: Platform,
    private storage: Storage
  ) {
    console.log("Hello UsuarioProvider Provider");
  }
  verificaUsuario(clave: string) {
    clave = clave.toLowerCase();
    return new Promise((resolve, reject) => {
      //nos suscribimos al cambio de informacion para obtener los datos cuando cambien
     this.doc=this.afDB
        .doc(`/usuarios/${clave}`)
        .valueChanges()
        .subscribe(data => {
          console.log(data);
          if (data) {
            //guaramos la info del usuario
            this.clave = clave;
            this.usuario.data;
            this.guardarStorage();
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
  guardarStorage() {
    if (this.platform.is("cordova")) {
      //celular
      this.storage.set("clave", this.clave);
    } else {
      //pc
      localStorage.setItem("clave", this.clave);
    }
  }

  cargarStorage() {
    //usamos una promesa porque la lectura puede demorar
    return new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        //celular
        this.storage.set("clave", this.clave);
        this.storage.get("clave").then(val => {
          if (val) {
            this.clave = val;
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } else {
        //pc
        if (localStorage.getItem("clave")) {
          this.clave = localStorage.getItem("clave");
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  }
  borrarUsuario() {
    this.clave = null;
    if(this.platform.is("cordova")){
      this.storage.remove("clave");
    }else{
      localStorage.removeItem("clave");
    }
    //dejamos de escuchar los cambios en el documento del usuario
    this.doc.unsubscribe();
  }
}
