import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ejercicio } from 'src/app/models/ejercicio/ejercicio';
import { Rutina } from 'src/app/models/rutina/rutina';
import { RutinaService } from 'src/app/services/rutina/rutina.service';

@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.component.html',
  styleUrls: ['./rutina.component.css']
})
export class RutinaComponent implements OnInit {
  listaRutina:Array<Rutina>=new Array<Rutina>();
  listaEjercicios:Array<Ejercicio>=new Array<Ejercicio>();
  foto:string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rutinaService: RutinaService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
        this.cargarAluRutina(params.id);
      });
  }

  
  verFoto(imagen:string){
    this.foto=imagen;
  }

  cargarAluRutina(id:string){
    this.rutinaService.getRutinaAlumno(id).subscribe(
      (result) => {
        if ((result.status == "0")) {
          alert('Error en la busqueda');
        } else {
          result.forEach((element) => {
            console.log(result);
            let vRutina = new Rutina();

            Object.assign(vRutina, element);

          this.listaRutina.push(vRutina);
          });
          console.log(this.listaRutina);
          


        }
      },
      (error) => {
        console.log(error);
        alert('error en la peticion');
      }
    );
  }
  }

