import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor( private storage: Storage,
               public toastController: ToastController ) {

    this.cargarFavoritos();

  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarNoticia(noticia: Article){

    // El find() en los arreglos busca un elemento que coincida o el primer elemento
    // que coincida con la condicion si encuentra algo entonces regresa ese elemento
    // del arreglo si no encuentra nada regresa undefined
    const existe = this.noticias.find( noti => noti.title === noticia.title);

    if (!existe){
      // El unshift() es una funcion de los array parecida al
      // push() pero guarda al inicio del arreglo
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }

    this.presentToast('Agregado a favoritos');
  }

  async cargarFavoritos(){
    const favoritos = await this.storage.get('favoritos');
    // console.log('async await', favoritos);

    if (favoritos){
      this.noticias = favoritos;
    }
    // si no existe me qeda el arreglo vacio

  }

  borrarNoticia(noticia: Article){
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Borrado de favoritos');
  }


}
