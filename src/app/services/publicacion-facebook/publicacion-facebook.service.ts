import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicacionFacebook } from 'src/app/models/publicacion-facebook/publicacion-facebook';

@Injectable({
  providedIn: 'root',
})
export class PublicacionFacebookService {
  url: string = 'http://localhost:3000/api/';

  constructor(private _http: HttpClient) {}

  //Metodo que obtiene todas las publicaciones de la bd
  getPublicaciones(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({}),
      params: new HttpParams({}),
    };

    return this._http.get(this.url + 'publicacion', httpOption);
  }

  //Metodo para guardar una noticia dentro del api
  guardarPublicacion(publicacion: PublicacionFacebook): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', //header de tipo de body enviado: MIME
      }),
      params: new HttpParams({}),
    };

    let body = JSON.stringify(publicacion);
    return this._http.post(this.url + 'publicacion', body, httpOption);
  }

  borrarPublicacion(id: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({}),
      params: new HttpParams({}),
    };

    return this._http.delete(this.url + 'publicacion/' + id, httpOption);
  }


  updatePublicacion(publicacion: PublicacionFacebook): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams({}),
    };
  
    let body = JSON.stringify(publicacion);
  
    console.log(body);
  
    return this._http.put(this.url + 'publicacion/' + publicacion._id, body, httpOption);
  }
  

}
