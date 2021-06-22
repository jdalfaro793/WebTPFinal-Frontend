import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ejercicio } from 'src/app/models/ejercicio/ejercicio';
import { EjercicioService } from 'src/app/services/ejercicio/ejercicio.service';

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

  constructor(private ejercicioService: EjercicioService,
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
}
