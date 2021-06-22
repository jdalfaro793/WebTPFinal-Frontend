import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlBase: string = "http://localhost:3000/api/usuario/"
  constructor(
    private http: HttpClient
  ) { }

  addUsuario(usuario: Usuario): Observable<any> {
    let options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
      params: new HttpParams({})
    }
    let body = JSON.stringify(usuario);
    return this.http.post(this.urlBase, body, options);
  }
  getUsuario(userName: string, password: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({}),
      params: {
      }
    }
    return this.http.get(this.urlBase + userName + "/" + password, options);
  }

  validarUsername(username:string):Observable<any>{
    let options = {
      headers: new HttpHeaders({}),
      params: {
      }
    }
    return this.http.get(this.urlBase +"/validar/"+ username, options);
  }

  public login(username: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({ username: username, password: password });
    console.log(body);
    return this.http.post(this.urlBase + 'login', body, httpOption);
  }

  public logout() {
    //borro el vble almacenado mediante el storage
    //variable cookie definidas como sessionStorage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("perfil");
    sessionStorage.removeItem("userid");
  }

  //determina si un usuario esta logeado
  public userLoggedIn() {
    var resultado = false;
    var usuario = sessionStorage.getItem("user");
    if (usuario != null) {
      resultado = true;
    }
    return resultado;
  }

  //retorna el usuario logeado
  public userLogged() {
    var usuario = sessionStorage.getItem("user");
    return usuario;
  }
  //retorna el id del usuario logeado
  public idLogged() {
    var id = sessionStorage.getItem("userid");
    return id;
  }

  updateUsuario(usuario: Usuario):Observable<any>{
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({
      })
    }
    let body = JSON.stringify(usuario);
    return this.http.put(this.urlBase+usuario._id, body, option);
  }
}
