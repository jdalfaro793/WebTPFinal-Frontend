import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as printJS from 'print-js';
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
  listaRutinaComprobante:Array<Rutina>=new Array<Rutina>();
  MesesRut: Array<number> = new Array<number>();
  nombre:string;
  nombreAlumno:string;
  foto:string;
  descrip:string;
  mes:number;
  btnPDF:boolean=false;

  constructor(
    private usuarioService: UsuarioService,
    private rutinaService: RutinaService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
      this.cargarAluRutina();
     
  }


  verComprobante(lista:Array<Rutina>){
    this.listaRutinaComprobante=lista;
  }
  imprimir(){
    printJS({
      printable: 'ComprobantePago',
      targetStyles: ['*'],
      documentTitle: 'Sistema Gym G-X',
      type: 'html'
    })
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
            this.nombreAlumno=this.usuarioService.alumnoLogeado.apellido+", "+this.usuarioService.alumnoLogeado.nombre;
            if(this.mes>=1){
              this.btnPDF=true;       
            }

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
            this.btnPDF=false;
          }else{
            result.forEach((element) => {
              console.log(result);
              let vRutina = new Rutina();
              Object.assign(vRutina, element);
              this.listaRutina.push(vRutina);
              this.btnPDF=true;
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
