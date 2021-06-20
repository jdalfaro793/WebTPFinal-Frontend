import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlBase:string = "http://localhost:3000/api/usuario/"
  constructor(
    private http: HttpClient
  ) { }

  addUsuario(usuario : Usuario):Observable<any>{
    let options = {
      headers:new HttpHeaders({ "Content-Type": "application/json" }),
      params: new HttpParams({})
    }
    let body = JSON.stringify(usuario);
    return this.http.post(this.urlBase,body,options);
  }
  getUsuario(userName:string, password:string):Observable<any>{
    let options = {
      headers: new HttpHeaders({ }),
      params : {
      }
    }
    return this.http.get(this.urlBase+userName+"/"+password, options);
  }
}
