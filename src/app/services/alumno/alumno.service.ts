import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  urlbase:string="http://localhost:3000/api/alumno/"

  constructor(private http:HttpClient) {
  }

  getAlumnos():Observable<any>{
    let option = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams({
      })
    }
    return this.http.get(this.urlbase, option);
  }

  getAlumnoByDNI(dni: string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders(),
      params : {
        dni : dni
      }
    }
    return this.http.get(this.urlbase, httpOptions)
  }
}

