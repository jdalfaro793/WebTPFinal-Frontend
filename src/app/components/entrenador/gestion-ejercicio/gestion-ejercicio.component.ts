import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ejercicio } from 'src/app/models/ejercicio/ejercicio';
import { Rutina } from 'src/app/models/rutina/rutina';
import { EjercicioService } from 'src/app/services/ejercicio/ejercicio.service';
import { RutinaService } from 'src/app/services/rutina/rutina.service';

@Component({
  selector: 'app-gestion-ejercicio',
  templateUrl: './gestion-ejercicio.component.html',
  styleUrls: ['./gestion-ejercicio.component.css']
})
export class GestionEjercicioComponent implements OnInit {

  @ViewChild('imagen') miImagen: ElementRef;
  ejercicio: Ejercicio;
  listaEjercicios: Array<Ejercicio>;
  nombre:string;
  foto:string;
  ejercicioBuscado: string;
  fotoSubida: boolean = true;
  accion: string = 'new';

  constructor(private ejercicioService: EjercicioService,
              private rutinaService: RutinaService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.iniciarVariable();
    this.cargarEjercicios();
  }

  iniciarVariable(){
    this.ejercicio = new Ejercicio();
    this.ejercicio.imagen="";
    this.ejercicioBuscado= "";
  }

  onFileChanges(files){
    this.ejercicio.imagen = files[0].base64;

  }

  verFoto(ejercicio:Ejercicio){
    this.nombre=ejercicio.nombre;
    this.foto=ejercicio.imagen;
  }

  cargarEjercicios(){
    this.listaEjercicios = new Array<Ejercicio>();
    this.ejercicioService.get(this.ejercicioBuscado).subscribe(
      result=>{
        result.forEach(element => {
          let vEjercicio = new Ejercicio();
          Object.assign(vEjercicio, element);
          this.listaEjercicios.push(vEjercicio);
        });
      },
      error=>{
        console.log(error);
        alert("Error al cargar ejercicios");
      }
    )
  }

  guardarEjercicio(formEjercicio: NgForm){
    this.ejercicioService.addEjercicio(this.ejercicio).subscribe(
      result=>{
        if(result.status=="1"){
            this.toastr.success("El ejercicio fue guardado correctamente", "OPERACION EXITOSA");
            this.cargarEjercicios();
            this.ejercicio = new Ejercicio();
            formEjercicio.reset();
            this.miImagen.nativeElement.value = '';
          }else{
            this.toastr.error("No pueden haber campos vacíos.", "OPERACION FALLIDA");
            this.fotoSubida = false;
          }
      },
      error=>{
        console.log(error);
      }

    )
  }

  limpiarFiltro(){
    this.ejercicioBuscado = "";
    this.cargarEjercicios();
  }

  modificarEjercicio(ejercicio: Ejercicio){
    this.ejercicio = ejercicio;
    this.accion = "update";
  }

  eliminarEjercicio(ejercicio2: Ejercicio){
    var encontrado = false;
    this.rutinaService.getRutinas().subscribe(
      result=>{
          result.forEach(element => {
          let vRutina = new Rutina();
          Object.assign(vRutina, element);
          for (var i=0; i < vRutina.ejercicio.length && encontrado == false; i++){
            if(vRutina.ejercicio[i]._id==ejercicio2._id){
              encontrado = true;}}})
        if (encontrado == false){
          if (confirm("Esta seguro que desea eliminar este ejercicio?")){
            this.ejercicioService.deleteEjercicio(ejercicio2).subscribe(
              result=>{
                if (result.status == '1' ){
                  this.toastr.success("El ejercicio fue eliminado correctamente", "OPERACION EXITOSA");
                  this.cargarEjercicios();
                }
                else{
                  this.toastr.error("Error al eliminar el ejercicio", "OPERACION FALLIDA");
                }
              },
              error=>{
                console.log(error);
              })}
        }else{
          this.toastr.error("El ejercicio se encuentra siendo usado, no se puede eliminar", "OPERACION FALLIDA");
        }},
      error=>{
        console.log(error);
      })
  }

  updateEjercicio(formEjercicio: NgForm){
    this.ejercicioService.updateEjercicio(this.ejercicio).subscribe(
      result=>{
        if(result.status=="1"){
          this.toastr.success("El ejercicio fue modificado correctamente", "OPERACION EXITOSA");
          this.cancelarEdicion(formEjercicio);
        }else{
          this.toastr.error("Error al modificar el ejercicio", "OPERACION FALLIDA");
        }
      },
      error=>{
        console.log(error);
      }
    )
  }

  cancelarEdicion(formEjercicio: NgForm){
    this.accion = "new";
    this.ejercicio = new Ejercicio();
    formEjercicio.reset();
    this.miImagen.nativeElement.value = '';
  }
}
