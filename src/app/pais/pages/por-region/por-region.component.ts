import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  ]
})
export class PorRegionComponent {

  constructor( private paisService: PaisService ) { }

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  buscar( termino: string ){
    this.hayError = false;
    this.termino = termino;
    console.log(this.termino);

    this.paisService.buscarRegion( this.termino )
      .subscribe( paises => {
        console.log(paises);
        this.paises = paises;

      }, (err) => {
        this.hayError = true;
        this.paises = [];
      });
  }

  sugerencias( termino: string ){
    this.hayError = false;
    // TODO -> Crear sugerencias
  }

}
