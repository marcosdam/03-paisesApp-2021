import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.eu/rest/v2';
  // private porNombre: string = 'https://restcountries.eu/rest/v2/name/{name}';
  // private porCapital: string = 'https://restcountries.eu/rest/v2/capital/{capital}';
  // private porRegion: string = 'https://restcountries.eu/rest/v2/region/{region}';
  // private porCodigo: string = 'https://restcountries.eu/rest/v2/alpha/{code}';

  // Optimizar petición obteniendo solo los params que se muestran (nombre, capital, código, bandera y población)
  get httpParams(){
    return new HttpParams()
      .set( 'fields', 'name;capital;alpha2Code;flag;population' );
  }

  constructor( private http: HttpClient ) { }

  buscarPais( termino: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ termino }`;
    return this.http.get<Country[]>( url, { params: this.httpParams } );

      /*
      .pipe(
        catchError( err => of([]) )
      );
       */
  }

  buscarCapital( termino: string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/capital/${ termino }`;
    return this.http.get<Country[]>( url, { params: this.httpParams } );
  }

  buscarRegion( region: string ): Observable<Country[]>{
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.http.get<Country[]>( url, { params: this.httpParams } )
    .pipe(
      tap(console.log)
    )
  }

  buscarPaisPorAlpha( id: string ): Observable<Country>{
    const url = `${ this.apiUrl }/alpha/${ id }`;
    return this.http.get<Country>( url );
  }

  getIconPais( termino: string ): Observable<Country>{
    const url = `https://restcountries.eu/data/${termino}.svg`;
    return this.http.get<Country>( url );
  }

}
