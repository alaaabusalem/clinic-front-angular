import { DateSlots } from "./dateSlots.model";

export class Doctor {
    public doctorId: number;
    public name: string;
    public gender: string;
    public img: string;
    public phone: string;
    public specialization: string;
    public locationDetailes: string;
    public openingTime: string;
    public closeTime: string;
    public description: string;
    public fees: string;
    public isDisabal: boolean;
    public locationName: string;
    public departmentName: string;
    public dateSlots: DateSlots[]
}

