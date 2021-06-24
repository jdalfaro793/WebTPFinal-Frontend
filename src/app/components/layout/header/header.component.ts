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

  habilitarMenuAlumno:string;
  habilitarMenuEntrenador:string;
  idAlumno:string="0";
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
  verificarPermiso(){
    if(this.usuarioService.userLoggedIn()){
      if(this.usuarioService.isLoggedAlumno()){
      
        this.habilitarMenuAlumno="";
        this.habilitarMenuEntrenador="disabled";
        this.idAlumno=this.usuarioService.idLogged();
      }else{
       
        this.habilitarMenuAlumno="disabled";
        this.habilitarMenuEntrenador="";
        
      }
      
    }else{
      this.toastr.info("Debe iniciar sesion para continuar");
      this.habilitarMenuAlumno="disabled";
      this.habilitarMenuEntrenador="disabled";
    }
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
}
