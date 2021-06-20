import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutina } from 'src/app/models/rutina/rutina';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {
  url:string="http://localhost:3000/api/"
  constructor(private _http:HttpClient) { }


//Metodo que obtiene un alumno para ver su rutina personalizada
getRutinaAlumnoMes(id:string,mes:number):Observable<any>{
  const httpOption={
    headers:new HttpHeaders({
    }),
    params: new HttpParams({
    })
  }
  return this._http.get(this.url+"rutina/getRutinasAluMes/"+id+"/"+mes,httpOption);
}   




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
  
  
  //Metodo que obtiene un alumno para ver su rutina personalizada
  getAlumno(id:string):Observable<any>{

   const httpOption={
     headers:new HttpHeaders({
     }),
     params: new HttpParams({
     })
   
    }
    return this._http.get(this.url+"alumno/"+id,httpOption)

}




//Metodo para guardar una noticia dentro del api
guardarRutina(rutina:Rutina):Observable<any>{
  const httpOption={
    headers:new HttpHeaders({
      "Content-Type":"application/json"  //header de tipo de body enviado: MIME
    }),
    params: new HttpParams({})
  }

  let body=JSON.stringify(rutina);
  return this._http.post(this.url+"rutina",body,httpOption)
}





}