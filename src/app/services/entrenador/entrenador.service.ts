import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {

  urlBase:string= "http://localhost:3000/api/entrenador/";
  constructor(
    private http: HttpClient
  ) { }

  getByIdUsuario( userId:string):Observable<any>{
    let options= {
      headers: new HttpHeaders({}),
      params: new HttpParams({})
    }
    return this.http.get(this.urlBase+"usuario/"+userId, options);
}
}
