import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno/alumno';
import { Cuota } from 'src/app/models/cuota/cuota';
import { CuotaService } from 'src/app/services/cuota/cuota.service';

@Component({
  selector: 'app-mis-cuotas',
  templateUrl: './mis-cuotas.component.html',
  styleUrls: ['./mis-cuotas.component.css']
})
export class MisCuotasComponent implements OnInit {

  cuotas: Array<Cuota>;

  filters: Cuota;

  constructor(private cuotaService: CuotaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initFilters();
    this.cuotas = new Array<Cuota>();
    this.activatedRoute.params.subscribe((params) => {
      if (params.id == '0') {
        this.cargarCuotas();
      } else {
        this.cargarMisCuotas(params.id);
      }
    });
  }

  cargarCuotas(): void {
    this.cuotaService.get(this.filters).subscribe(
      (result) => {
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

  cargarMisCuotas(id: string): void {
    this.cuotaService.getByAlumno(id).subscribe(
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
}
