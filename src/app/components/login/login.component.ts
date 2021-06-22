import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Usuario;
  returnUrl: string;
  datosCorrectos:boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.datosCorrectos=true;
    this.user = new Usuario();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home'
  }

  iniciarSesion():void {
    this.usuarioService.login(this.user.username, this.user.password)
      .subscribe(
        (result) => {
          
          if (result.status == 1) {
            this.datosCorrectos = true;
            //guardamos el user en cookies en el cliente
            sessionStorage.setItem("user", result.username);
            sessionStorage.setItem("userid", result._id);
            sessionStorage.setItem("perfil", result.rol);
            //redirigimos a home o a pagina que llamo
            this.router.navigateByUrl(this.returnUrl);
          } else {
            //usuario no encontrado muestro mensaje en la vista
            this.datosCorrectos=false;
            this.toastr.warning("usuario y/o password incorrecto");
          }
        },
        error => {
          alert("Error de conexion");
          console.log("error en conexion");
          console.log(error);
        });
  }


  mostrarPassword() {
    let elemento: any = document.getElementById('pass');
    if (elemento.type == "text") {
      elemento.type = "password";
    } else {
      elemento.type = "text"
    }
  }

}