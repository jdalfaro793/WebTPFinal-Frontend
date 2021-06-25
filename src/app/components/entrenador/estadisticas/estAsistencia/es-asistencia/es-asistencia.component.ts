import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Asistencia } from 'src/app/models/asistencia/asistencia';
import { EstadisticaService } from 'src/app/services/estadistica/estadistica.service';

@Component({
  selector: 'app-es-asistencia',
  templateUrl: './es-asistencia.component.html',
  styleUrls: ['./es-asistencia.component.css']
})
export class EsAsistenciaComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Asistencias' }
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

  private mesActual:Date;
  private nMesActual:number;
  constructor(
    private estadisticaService:EstadisticaService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.mesActual= new Date();
    this.nMesActual = parseInt(this.datePipe.transform(this.mesActual, 'M'));
    for(let i= 0; i<this.nMesActual;i++){
      this.estadisticaService.buscarAsistenciaByMes(i+1).subscribe(
        result=>{
          let monto = 0;
          result.forEach(e=>{
            monto = monto +1;         
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
