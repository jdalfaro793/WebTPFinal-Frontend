import { Cuota } from './../../models/cuota/cuota';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  private URL = "http://localhost:3000/api/cuota";

  constructor(private _http: HttpClient) { }

  get(filters: Cuota): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(),
      params: {
        apellido : filters.alumno.apellido,
        nombre : filters.alumno.nombre,
        modo_pago : filters.modo_pago,
        monto : String(filters.monto)
      }
    }
    return this._http.get(this.URL, httpOptions)
  }

  getByAlumno(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(),
      params: new HttpParams()
    }
    return this._http.get(this.URL + '/alumno/' + id, httpOptions)
  }

  addCuota(cuota : Cuota):Observable<any>{
    let options = {
      headers:new HttpHeaders({ 
        "Content-Type": "application/json" 
      }),
      params: new HttpParams({})
    }
    let body = JSON.stringify(cuota);
    return this._http.post(this.URL,body,options);
  }
}
