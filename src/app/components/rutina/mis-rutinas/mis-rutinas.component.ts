import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ejercicio } from 'src/app/models/ejercicio/ejercicio';
import { Rutina } from 'src/app/models/rutina/rutina';
import { RutinaService } from 'src/app/services/rutina/rutina.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-mis-rutinas',
  templateUrl: './mis-rutinas.component.html',
  styleUrls: ['./mis-rutinas.component.css']
})
export class MisRutinasComponent implements OnInit {
  listaRutina:Array<Rutina>=new Array<Rutina>();
  Meses:Array<number>= [1,2,3,4,5,6,7,8,9,10,11,12];
  MesesRut: Array<number> = new Array<number>();

  listaEjercicios:Array<Ejercicio>=new Array<Ejercicio>();
  nombre:string;
  foto:string;
  descrip:string;
  idAlum:string;
  mes:number;

  constructor(
    private usuarioService: UsuarioService,
    private rutinaService: RutinaService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
      this.cargarAluRutina();
     
  }



  
  verFoto(ejercicio:Ejercicio){
    this.nombre=ejercicio.nombre;
    this.foto=ejercicio.imagen;
    this.descrip=ejercicio.descripcion;
  }

  verDescrip(descrip:string){
    this.descrip=descrip;
  }

 cargarAluRutina(){

  this.rutinaService.getRutinaAlumno(this.usuarioService.alumnoLogeado._id).subscribe(
    (result) => {
      if (result.status == '0') {
        this.toastr.error('Error en la busqueda', 'ERROR');
      } else {
        result.forEach((element) => {
          this.MesesRut.push(element.mes);
        });
        this.rutinaService
          .getRutinaAlumnoMes(this.usuarioService.alumnoLogeado._id, Math.max.apply(null, this.MesesRut))
          .subscribe((result) => {
            result.forEach((element) => {
              let vRutina = new Rutina();
              Object.assign(vRutina, element);
              this.listaRutina.push(vRutina);
            });
            this.mes = Math.max.apply(null, this.MesesRut)

          });
      }
    },
    (error) => {
      console.log(error);
      this.toastr.error('ERROR EN LA PETICION', 'ERROR');
    }
  );

 }


  cargarRutinaMes(){
    this.listaRutina=new Array<Rutina>();

    this.rutinaService.getRutinaAlumnoMes(this.usuarioService.alumnoLogeado._id,this.mes).subscribe(
      (result) => {
        if ((result.status == "0")) {
          alert('Error en la busqueda');
        } else {
         
          if(result[0]==undefined){
            this.toastr.error("No posee rutina para este mes","ERROR")
          }else{
            result.forEach((element) => {
              console.log(result);
              let vRutina = new Rutina();
              Object.assign(vRutina, element);
              this.listaRutina.push(vRutina);
            });
          }
        }
      },
      (error) => {
        console.log(error);
        alert('error en la peticion');
      }
    );
  }



  }
