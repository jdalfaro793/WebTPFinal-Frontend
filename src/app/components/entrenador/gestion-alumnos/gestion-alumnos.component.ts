import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno/alumno';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
@Component({
  selector: 'app-gestion-alumnos',
  templateUrl: './gestion-alumnos.component.html',
  styleUrls: ['./gestion-alumnos.component.css']
})
export class GestionAlumnosComponent implements OnInit {

  alumnos: Array<Alumno>;
  findByApellido: string;
  findByDni: string;
  alumnoBuscado: string;
  fechaNueva: Date;
  fechaVencida: boolean = false;

  constructor(private alumnoService: AlumnoService,
              private usuarioService: UsuarioService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.findByApellido = "";
    this.findByDni = "";
    this.alumnoBuscado= "";
    this.cargarAlumnos();
  }

  verificarApellidoOrDni(){
   const valoresAceptados = /^[0-9]*$/;
       if (this.alumnoBuscado.match(valoresAceptados)){
         this.findByDni = this.alumnoBuscado;
       }else{
         this.findByApellido = this.alumnoBuscado;
       }
  }

  cargarAlumnos():void{
    this.verificarApellidoOrDni();
    this.alumnos = new Array<Alumno>();
    this.alumnoService.get(this.findByApellido, this.findByDni).subscribe(
      result=>{
        result.forEach(element => {
          let alumno = new Alumno();
          Object.assign(alumno, element);
          this.alumnos.push(alumno);
        });
      },
      error=>{
        console.log(error);
      }
    )
  }

  verificarFecha(alumno: Alumno): boolean{
    this.fechaNueva = new Date();
    this.fechaNueva.setMonth(this.fechaNueva.getMonth() - alumno.mes);
    var fechaInicio = Date.parse(alumno.fecha_inicio.toString());
    if(this.fechaNueva.valueOf() < fechaInicio.valueOf()){
      return true;
    }else{
      return false;
    }
  }

limpiarFiltro(){
  this.findByApellido= "";
  this.findByDni= "";
  this.alumnoBuscado = "";
  this.cargarAlumnos();
}

agregarCuota(alumno: Alumno){
  this.router.navigate(["cuota/", alumno._id ]);
}

agregarAsistencia(alumno: Alumno){
  this.router.navigate(["asistencia/", alumno._id ]);
}

agregarRutina(alumno: Alumno){
  this.router.navigate(["rutina/", alumno._id ]);
}

activarAlumno(alumno: Alumno){
  if (confirm("Esta seguro que desea cambiar el estado del usuario?")){
    alumno.usuario.state = !(alumno.usuario.state);
    this.usuarioService.updateUsuario(alumno.usuario).subscribe(
      result=>{
        if(result.status=="1"){
          this.toastr.success("El usuario fue modificado correctamente", "OPERACION EXITOSA");
        }else{
          this.toastr.error("Error al modificar el usuario", "OPERACION FALLIDA");
        }
      },
      error=>{
        console.log(error);
        alert("Error al modificar el usuario");
      }
    )
  }
}

}

