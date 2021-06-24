import { Component, OnInit } from '@angular/core';
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
  constructor(
    public usuarioService:UsuarioService,
    private toastr: ToastrService
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
}
