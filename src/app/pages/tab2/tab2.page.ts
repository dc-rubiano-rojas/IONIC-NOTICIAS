import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService ) {}


  ngOnInit(){
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  segmentChanged(event){
    // Aca reseteo el arreglo para que cuando haga el cambio de categoria
    // no me haga el push a lo que ya tengo si no a este arreglo vacio
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
  }


  cargarNoticias(categoria: string, event?){
    this.noticiasService.getTopHeadlinesCategoria( categoria )
                        .subscribe(res => {
                          this.noticias.push(...res.articles);

                          if(event){
                            event.target.complete();
                          }

                        });
  }


  loadData(event){
    this.cargarNoticias(this.segment.value, event);
  }

}
