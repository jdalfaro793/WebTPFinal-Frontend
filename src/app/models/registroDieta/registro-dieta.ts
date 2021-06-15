import { Alumno } from "../alumno/alumno";
import { MesDieta } from "../mesDieta/mes-dieta";

export class RegistroDieta {
    _id:string;
    planDieta: MesDieta;
    fecha: Date;
    peso: number;
    foto: string;
    alumno: Alumno;
}
