import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroDietaService {

  private URL = 'http://localhost:3000/registroDieta';

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
}
