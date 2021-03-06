import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asistencia } from 'src/app/models/asistencia/asistencia';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-mis-asistencias',
  templateUrl: './mis-asistencias.component.html',
  styleUrls: ['./mis-asistencias.component.css']
})
export class MisAsistenciasComponent implements OnInit {
  listaAsistencias: Array<Asistencia>;
  constructor(
    private asistenciaService: AsistenciaService,
    private usuarioService:UsuarioService,
    private router : Router
  ) {
    if(this.usuarioService.userLoggedIn() == false){
      alert("Debe validarse e ingresar su usuario y clave");
      this.router.navigate(['login']);
    }else if(this.usuarioService.isLoggedAlumno() == false){
      alert("No tiene permisos para esta seccion");
        this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
  
    this.cargarAluAsistencia()
  }
  iniciarLista() {
    this.listaAsistencias = new Array<Asistencia>();
  }

  cargarAluAsistencia() {
    this.asistenciaService.getAsistenciaByAlumno(this.usuarioService.alumnoLogeado._id).subscribe(
      (result) => {
        
        this.iniciarLista();
        if ((result.status == "0")) {
          alert('Error en la busqueda');
        } else {
          result.forEach((element) => {
            let vAsistencia = new Asistencia();
            Object.assign(vAsistencia, element);
            this.listaAsistencias.push(vAsistencia);
          });
          console.log(this.listaAsistencias);

        }
      },
      (error) => {
        console.log(error);
        alert('error en la peticion');
      }
    );
  }
}
