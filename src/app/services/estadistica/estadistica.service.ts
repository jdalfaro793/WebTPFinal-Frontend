import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CuotaService } from '../cuota/cuota.service';
import { map, filter, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  constructor(
    private cuotaService: CuotaService,
    private datePipe: DatePipe
  ) { }

  buscarCuotaByMes(mes:number):Observable<any[]>{
    return this.cuotaService.getAll().pipe(map (res => res.filter(val => this.datePipe.transform(val.fecha_pago, 'M') == ""+mes+"" ))) ;

  }
}
