import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadonoticia'
})
export class EstadonoticiaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value != null) {
      
      if (value==true) {
        return "Activado";
 
      }
      if (value==false) {
        return "Desactivado";
    }
  }
  }

}
