import { Alumno } from "../alumno/alumno";
import { MesDieta } from "../mesDieta/mes-dieta";

export class RegistroDieta {
    _id:string;
    plan_dieta: MesDieta;
    fecha: Date;
    peso: number;
    foto: string;
    alumno: Alumno;
    objetivo: string;
    
    constructor() {}
}
