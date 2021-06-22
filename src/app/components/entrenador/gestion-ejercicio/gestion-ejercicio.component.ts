import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Ejercicio } from 'src/app/models/ejercicio/ejercicio';
import { EjercicioService } from 'src/app/services/ejercicio/ejercicio.service';

@Component({
  selector: 'app-gestion-ejercicio',
  templateUrl: './gestion-ejercicio.component.html',
  styleUrls: ['./gestion-ejercicio.component.css']
})
export class GestionEjercicioComponent implements OnInit {

  ejercicio: Ejercicio;
  listaEjercicios: Array<Ejercicio>;
  nombre:string;
  foto:string;

  constructor(private ejercicioService: EjercicioService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.iniciarVariable();
    this.cargarCuotas();
  }

  iniciarVariable(){
    this.ejercicio = new Ejercicio();
    this.ejercicio.imagen="";
  }

  onFileChanges(files){
    this.ejercicio.imagen = files[0].base64;
  }

  verFoto(ejercicio:Ejercicio){
    this.nombre=ejercicio.nombre;
    this.foto=ejercicio.imagen;
  }

  cargarCuotas(){
    this.listaEjercicios = new Array<Ejercicio>();
    this.ejercicioService.getEjercicios().subscribe(
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

  guardarEjercicio(){
    this.ejercicioService.addEjercicio(this.ejercicio).subscribe(
      result=>{
        if(result.status=="1"){
            this.toastr.success("El ejercicio fue guardado correctamente", "OPERACION EXITOSA");
            this.cargarCuotas();
            this.ejercicio = new Ejercicio();
          }else{
            this.toastr.error("Error al guardar el ejercicio", "OPERACION FALLIDA");
          }
      },
      error=>{
        console.log(error);
      }

    )
  }

}
