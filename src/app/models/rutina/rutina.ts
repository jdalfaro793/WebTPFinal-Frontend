import { Alumno } from "../alumno/alumno";
import { Ejercicio } from "../ejercicio/ejercicio";

export class Rutina {
    _id:string;
    alumno: Alumno;
    ejercicio:Array<Ejercicio>;
    peso: Array<number>;
    serie: Array<number>;
    repeticion:Array<number>;
    mes: number;
    nombreRutina: string;
    dia: string;

    constructor() {}
}