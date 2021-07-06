import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 
  idAlumno:string="0";
  alumnoLogeado:boolean;
  entrenadorLogeado: boolean;
  constructor(
    public usuarioService:UsuarioService,
    private toastr: ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {

  }

  logout(){
    this.usuarioService.logout();
  }
 
  miPlan(){
    this.router.navigate(["mi-plan/"+this.idAlumno])
  }
  misAsistencias(){
    this.router.navigate(["mis-asistencias/"+this.idAlumno])
  }
  misCuotas(){
    this.router.navigate(["mis-cuotas/"+this.idAlumno])
  }
  misRutinas(){
    this.router.navigate(["mis-rutinas/"+this.idAlumno])
  }

  misRegistros(){
    this.router.navigate(["misDietas/"+this.idAlumno])
  }
}
