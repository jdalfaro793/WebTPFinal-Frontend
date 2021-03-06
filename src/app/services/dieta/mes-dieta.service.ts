import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MesDieta } from 'src/app/models/mesDieta/mes-dieta';

@Injectable({
  providedIn: 'root'
})
export class MesDietaService {

  private URL = 'http://localhost:3000/api/mesDieta/';

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

  get(objetivo: string, mes:any): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders(),
      params : {
        objetivo : objetivo,
        mes : mes
      }
    }
    return this._http.get(this.URL, httpOptions);
  }

  addPlanAlimenticion(plan: MesDieta): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({
        "Content-Type": "application/json" 
      }),
      params : new HttpParams()
    }
    const body = JSON.stringify(plan);
    return this._http.post(this.URL, body, httpOptions);
  }

  deletePlanAlimetacion(id: string): Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders(),
      params : new HttpParams()
    }
    return this._http.delete(this.URL + id, httpOptions);
  }

  editPlanAlimenticio(plan: MesDieta): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({
        "Content-Type": "application/json" 
      }),
      params : new HttpParams()
    }
    const body = JSON.stringify(plan);
    return this._http.put(this.URL + plan._id, body, httpOptions);
  }

  getPlanAlimentacionById(id: string): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders(),
      params : new HttpParams()
    }
    return this._http.get(this.URL + id, httpOptions);
  }

}
