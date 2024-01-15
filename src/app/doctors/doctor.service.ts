import {Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Doctor } from '../shared/models/Doctor.model';
@Injectable({ providedIn: 'root' })
export class DoctorService {
    doctorsArr:Doctor[]=[];

    constructor(private http:HttpClient) {  

}
     
public GetDoctorApointment(doctorId: number){
   return this.http.get<Doctor>(`https://localhost:7197/api/Doctors/Doctor/${doctorId}`) 
}
}