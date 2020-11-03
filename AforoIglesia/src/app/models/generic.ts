export interface ResponseObject {
    object: any;
    code: number;
    errMsg: string;
}

export enum Gender {
    male = 0,
    female = 1
}

export enum DocType {
    cedula = 0,
    tarjeta_identidad = 1,
    pasaporte = 2
}

export interface ScheduleFilter {
    location_code: string;
    date: number;
}

