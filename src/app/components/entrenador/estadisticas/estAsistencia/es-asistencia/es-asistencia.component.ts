import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { EstadisticaService } from 'src/app/services/estadistica/estadistica.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-es-asistencia',
  templateUrl: './es-asistencia.component.html',
  styleUrls: ['./es-asistencia.component.css']
})
export class EsAsistenciaComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Asistencias' }
  ];
  public lineChartLabels: Label[] = [];
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
  meses: Array<string>;
  constructor(
    private estadisticaService:EstadisticaService,
    private datePipe:DatePipe,
    private usuarioService : UsuarioService,
    private router : Router
  ) { 
    if (this.usuarioService.userLoggedIn() == false) {
      alert("Debe validarse e ingresar su usuario y clave");
      this.router.navigate(['login']);
    } else if (this.usuarioService.isLoggedAlumno() == true) {
      alert("No tiene permisos para esta seccion");
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
    this.meses  = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
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
          this.lineChartLabels[i] = this.meses[i];
        }
      )
    }
  }

  
  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
