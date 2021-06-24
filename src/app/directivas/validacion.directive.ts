import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';



function verificarNumeros(c:AbstractControl){
  if (c.value == null) return null;

  if(/^[0-9 ]*$/.test(c.value) == false){
      return {soloNumeros: true};
  }
  return null;
 } 

 @Directive({
  selector: '[solo-numeros]',
  providers:[
    {provide: NG_VALIDATORS, multi: true, useValue:verificarNumeros}
    ]
})

export class SoloNumeros {
  constructor() { }
}

function verificarLetras(c:AbstractControl){
  if (c.value == null) return null;

  if(/^[a-zA-Z ]*$/.test(c.value) == false){
      return {soloLetras: true};
  }
  return null;
 } 

 @Directive({
  selector: '[solo-letras]',
  providers:[
    {provide: NG_VALIDATORS, multi: true, useValue:verificarLetras}
    ]
})

export class SoloLetras {
  constructor() { }
}
