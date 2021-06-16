import { Alumno } from "../alumno/alumno";

export class Cuota {
    _id:string;
    monto: number;
    fecha_pago: Date;
    modo_pago: string;
    alumno: Alumno;
    
    constructor() {}
}
