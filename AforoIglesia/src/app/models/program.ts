import { UserProfile } from "./user-profile";


export interface Schedule {
    aforo: number;
    horas: string[];
}

export interface ListDetail {
    hora?: string;
    total?: number;
    available?: string;
    col?: string;
}

export interface ScheduleList{
    items: ListDetail[]
}
