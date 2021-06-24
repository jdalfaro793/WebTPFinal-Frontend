import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from 'src/app/models/alumno/alumno';


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

  addAlumno(alumno : Alumno):Observable<any>{
    let options = {
      headers:new HttpHeaders({ "Content-Type": "application/json" }),
      params: new HttpParams({})
    }
    let body = JSON.stringify(alumno);
    return this.http.post(this.urlbase,body,options);
  }

  getAlumno(id:string):Observable<any>{
    const httpOption={
      headers:new HttpHeaders({
      }),
      params: new HttpParams({
      })
     }
     return this.http.get(this.urlbase+id,httpOption)
 }

 get(apellidoAlumno: string, dniAlumno: string):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders(),
    params : {
      apellido : apellidoAlumno,
      dni : dniAlumno
    }
  }
  return this.http.get(this.urlbase, httpOptions)
}

updateAlumno(alumno: Alumno):Observable<any>{
  let option = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    }),
    params: new HttpParams({
    })
  }
  let body = JSON.stringify(alumno);
  return this.http.put(this.urlbase+alumno._id, body, option);
}

getByIdUsuario( userId:string):Observable<any>{
    let options= {
      headers: new HttpHeaders({}),
      params: new HttpParams({})
    }
    return this.http.get(this.urlbase+"usuario/"+userId, options);
}

}

