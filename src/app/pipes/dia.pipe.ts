import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dia'
})
export class DiaPipe implements PipeTransform {

  constructor(private datePipe: DatePipe){
  }

  transform(value: Date): string {
   const dia = this.datePipe.transform(value, 'EEEE');
   let diaTrad= "";
   switch(dia){
    case 'Monday':diaTrad = "Lunes";break;
    case 'Tuesday':diaTrad = "Martes";break;
    case 'Wednesday':diaTrad = "Miércoles";break;
    case 'Thursday':diaTrad = "Jueves";break;
    case 'Friday':diaTrad = "Viernes";break;
    case 'Saturday': diaTrad = "Sábado";break;
    case 'Sunday':diaTrad = "Domingo";break;
   }
    return diaTrad;
   
  }

}
