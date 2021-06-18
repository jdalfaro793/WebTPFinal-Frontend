import { Cuota } from './../../../models/cuota/cuota';
import { Component, OnInit } from '@angular/core';
import { CuotaService } from 'src/app/services/cuota/cuota.service';
import { Alumno } from 'src/app/models/alumno/alumno';

@Component({
  selector: 'app-gestion-cuota',
  templateUrl: './gestion-cuota.component.html',
  styleUrls: ['./gestion-cuota.component.css']
})
export class GestionCuotaComponent implements OnInit {

  cuotas: Array<Cuota>;

  filters: Cuota;

  constructor(private cuotaService: CuotaService) { }

  ngOnInit(): void {
    this.initFilters();
    this.cuotas = new Array<Cuota>();
    this.cargarCuotas();
  }

  cargarCuotas(): void {
    this.cuotaService.get(this.filters).subscribe(
      (result) => {
        console.log(result)
        this.cuotas = new Array<Cuota>();
        result.forEach((element) => {
          let cuota = new Cuota();
          Object.assign(cuota, element)
          this.cuotas.push(cuota);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initFilters(): void {
    this.filters = new Cuota();
    this.filters.alumno = new Alumno();
    this.filters.monto = 0;
    this.filters.modo_pago = '';
    this.filters.alumno.apellido = '';
    this.filters.alumno.nombre = '';
  }

  findFilters(): void {
    this.cargarCuotas();
  }

  onChangeMonto(event): void {
    this.filters.monto = event;
    this.cargarCuotas();
  }

  onChangeModoPago(event): void {
    this.filters.modo_pago = event;
    this.cargarCuotas();
  }

  cleanFilters(): void {
    this.initFilters();
    this.cargarCuotas();
  }

}
