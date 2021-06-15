import { Alumno } from "../alumno/alumno";

export class Cuota {
    _id:string;
    cuot_monto: number;
    cuot_fechaPago: Date;
    cuot_modoPago: string;
    obj_alumno: Alumno;
}
