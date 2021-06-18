import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {
  url:string="http://localhost:3000/api/"
  constructor(private _http:HttpClient) { }




   //Metodo que obtiene un alumno para ver su rutina personalizada
   getRutinaAlumno(id:string):Observable<any>{

    const httpOption={
      headers:new HttpHeaders({
      }),
      params: new HttpParams({
      })
    }
  
    return this._http.get(this.url+"rutina/getrutinas/"+id,httpOption);
  }

}
