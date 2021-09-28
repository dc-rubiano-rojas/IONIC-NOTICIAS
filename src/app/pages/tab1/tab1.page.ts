import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private noticiasService: NoticiasService) {}

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  noticias: Article[] = [];

  ngOnInit(){
     this.cargarNoticias();
  }


  loadData(event){
    console.log(event);
    this.cargarNoticias( event);
  }


  cargarNoticias( event? ){
    this.noticiasService.getTopHeadlines()
    .subscribe( res => {

      if (res.articles.length === 0){
        this.infiniteScroll.disabled = true;
        event.target.complete();
        return ;
      }
      // Esto esta bien lo que pasa es que mas adelante yo
      // quiero mas informacion y esto va a sobreescribir los articulos
      // en este caso yo solo quiero ir aydiendolos a lo que ya tenia
      // this.noticias = res.articles;

      // Con el operador spread (...) inserto de manera
      // independiente articulo por articulo al array noticias
      // Sin este operador spread se hace un push de toda la respuesta
      this.noticias.push(...res.articles);
      console.log('Noticias', res);

      if (event){
        event.target.complete();
        // event.target.complete();
      }

    });
  }

}
