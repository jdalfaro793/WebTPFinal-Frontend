import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DietaService {

  private URL = 'http://localhost:3000/api/dieta';

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
