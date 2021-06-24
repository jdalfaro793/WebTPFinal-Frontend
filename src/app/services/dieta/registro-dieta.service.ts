import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroDieta } from 'src/app/models/registroDieta/registro-dieta';

@Injectable({
  providedIn: 'root'
})
export class RegistroDietaService {

  private URL = 'http://localhost:3000/api/registroDieta/';

  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders(),
      params : new HttpParams()
    }
    return this._http.get(this.URL, httpOptions);
  }

  addRegistro(registro: RegistroDieta): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({
        "Content-Type": "application/json" 
      }),
      params : new HttpParams()
    }
    const body = JSON.stringify(registro);
    console.log(body)
    return this._http.post(this.URL, body, httpOptions);
  }

  getRegistrosByIDAlumno(id: string): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders(),
      params : new HttpParams()
    }
    return this._http.get(this.URL + 'alumno/' + id, httpOptions);
  }

}
