import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asistencia } from 'src/app/models/asistencia/asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  url:string="http://localhost:3000/api/asistencia/"
  constructor(private _http:HttpClient) { }


  //Metodo que obtiene todas las asistencias de la bd
getAsistencias():Observable<any>{

  const httpOption={
    headers:new HttpHeaders({
    }),
    params: new HttpParams({
    })
  }

  return this._http.get(this.url,httpOption);
}

  //Metodo que obtiene todas las asistencias de la bd
  getAsistenciaByAlumno(id:string):Observable<any>{

    const httpOption={
      headers:new HttpHeaders({
      }),
      params: new HttpParams({
      })
    }
  
    return this._http.get(this.url+"get/"+id,httpOption);
  }

  addAsistencia(asistencia : Asistencia):Observable<any>{
    let options = {
      headers:new HttpHeaders({ 
        "Content-Type": "application/json" 
      }),
      params: new HttpParams({})
    }
    let body = JSON.stringify(asistencia);
    return this._http.post(this.url,body,options);
  }

}
