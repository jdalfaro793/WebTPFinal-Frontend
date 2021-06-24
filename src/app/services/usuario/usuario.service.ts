import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Alumno } from 'src/app/models/alumno/alumno';
import { Entrenador } from 'src/app/models/entrenador/entrenador';
import { Usuario } from 'src/app/models/usuario/usuario';
import { AlumnoService } from '../alumno/alumno.service';
import { EntrenadorService } from '../entrenador/entrenador.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public alumnoLogeado:Alumno;
  public entrenadorLogeado:Entrenador;
  urlBase: string = "http://localhost:3000/api/usuario/"
  constructor(
    private http: HttpClient,
    private alumnoService: AlumnoService,
    private entrenadorService: EntrenadorService
  ) { 
    this.alumnoLogeado = new Alumno();
    this.entrenadorLogeado = new Entrenador();
  }

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

  validarUsername(username: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({}),
      params: {
      }
    }
    return this.http.get(this.urlBase + "/validar/" + username, options);
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

  getToken(): string {
    if (sessionStorage.getItem("token") != null) {
      return sessionStorage.getItem("token");
    } else {
      return "";
    }
  }

  public logout() {
    //borro el vble almacenado mediante el storage
    //variable cookie definidas como sessionStorage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("perfil");
    sessionStorage.removeItem("id");
    
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
    var id = sessionStorage.getItem("id");
    return id;
  }

  //determina si el usuario logeado es un alumno
  public isLoggedAlumno():boolean{
      if(sessionStorage.getItem("rol")=="alumno")
        return true;
    return false;
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      params: new HttpParams({
      })
    }
    let body = JSON.stringify(usuario);
    return this.http.put(this.urlBase + usuario._id, body, option);
  }

  determinarUsuario():void{
    if(sessionStorage.getItem("rol") == "alumno"){
     this.alumnoService.getByIdUsuario(sessionStorage.getItem("id")).subscribe(
       result=>{
          Object.assign(this.alumnoLogeado,result);
          console.log(this.alumnoLogeado);
       },
       error=>{
        console.log(error);
       }
     )
    }else{
      this.entrenadorService.getByIdUsuario(sessionStorage.getItem("id")).subscribe(
        result=>{
          Object.assign(this.entrenadorLogeado, result);
          console.log(this.entrenadorLogeado);
        },
        error=>{
          console.log(error);
        }
      )
    }
  }
}
