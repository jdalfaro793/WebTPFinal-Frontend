import { Rutina } from "../rutina/rutina";

export class RutinaPersonalizada {
    _id:string;
    rutper_rutina: Rutina;
    rutper_repeticion: Array<Number>;
    rutper_serie: Array<Number>;
    rutper_peso:  Array<Number>;
    rutper_dia: string;
}
