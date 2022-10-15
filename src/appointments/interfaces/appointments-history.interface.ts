import { Appointment } from "../entities/appointment.entity";

export interface AppointmentsHistory {
    date: string;
    appointments: Appointment[];
}
