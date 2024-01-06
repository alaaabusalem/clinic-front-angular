import {Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Doctor } from '../shared/models/Doctor.model';
@Injectable({ providedIn: 'root' })
export class AppointmentService {
    doctorAppointmentEvent = new BehaviorSubject<Doctor>(null);

    constructor(private http: HttpClient) { }

    AddAppointment(time:string,date:string,doctor: Doctor){
  
    }
}