import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Cuota } from 'src/app/models/cuota/cuota';
import { CuotaService } from 'src/app/services/cuota/cuota.service';
import { EstadisticaService } from 'src/app/services/estadistica/estadistica.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Ingresos' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions = {
    responsive: true
  };
  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  listaCuotas: Array<Cuota>;
  cuota:Cuota;
  mesActual:Date;
  nMesActual:number;
  constructor(
    private estadisticaService:EstadisticaService,
    private cuotaService: CuotaService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.mesActual= new Date();
    this.nMesActual = parseInt(this.datePipe.transform(this.mesActual, 'M'));
    for(let i= 0; i<this.nMesActual;i++){
      this.estadisticaService.buscarCuotaByMes(i+1).subscribe(
        result=>{

          let monto = 0;
          result.forEach(e=>{
            this.cuota = new Cuota();
            Object.assign(this.cuota, e);
            monto = monto + this.cuota.monto;          
          })
          this.lineChartData[0].data[i]=monto;
        }
      )
    }
  }



  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
