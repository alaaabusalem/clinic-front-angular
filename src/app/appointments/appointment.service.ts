import {Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Doctor } from '../shared/models/Doctor.model';

export interface createAppointment {
    patientName: string,
    patientAge: string,
    contactNumber: string,
    date: string,
    time: string,
    doctorId: number
}
export interface clientAppointment{
    appointmentId: number,
    patientName: string,
    patientAge: string,
    contactNumber: string,
    date: string,
    time: string,
    doctorId: number,
    doctorName: string,
    appointmentStatus: {
      appointmentStatusId: number,
      name: string
    }
}
@Injectable({ providedIn: 'root' })
export class AppointmentService {
    doctorAppointmentEvent = new BehaviorSubject<Doctor>(null);
        doctorToBook:Doctor=null;
    constructor(private http: HttpClient) { }

    AddAppointment(creatapp:createAppointment){
  return this.http.post('https://localhost:7197/api/Appointments/creat',creatapp)
    }

    GetClientAppointments(){
        return this.http.get<clientAppointment[]>('https://localhost:7197/api/Appointments/Client/appointments')
          }
}