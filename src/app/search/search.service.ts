import { AfterContentInit, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../shared/models/Doctor.model';
import { DoctorService } from '../doctors/doctor.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService implements OnDestroy{
    doctors= new Subject<Doctor[]>();
    doctorsArr:Doctor[]=[];

    constructor(private http:HttpClient,private docService:DoctorService,private router: Router){
       
    }

    public GetDoctorsByLocation(locationId: number){
        this.http.get<Doctor[]>(`https://localhost:7197/api/Doctors/doctors/location/${locationId}`).subscribe(res=>{
            //console.log(res);
            const doc:Doctor[]=res;
            this.doctorsArr=doc;
            this.doctors.next(doc);
            this.router.navigate(['/Doctors'])
        })
    }
    public GetDoctorsByDepartment(departmentId: number){
        this.http.get<Doctor[]>(`https://localhost:7197/api/Doctors/doctors/department/${departmentId}`).subscribe(res=>{
            //console.log(res);
            const doc:Doctor[]=res;
            this.doctorsArr=doc;

            this.doctors.next(doc);
            this.router.navigate(['/Doctors'])

        })
    }
    public GetDoctorsByLocationAndDepartment(locationId: number,departmentId:number){
        this.http.get<Doctor[]>(`https://localhost:7197/api/Doctors/doctors/location/${locationId}/department/${departmentId}`).subscribe(res=>{
            //console.log(res);
            const doc:Doctor[]=res;
            this.doctorsArr=doc;

        this.doctors.next(doc);
        this.router.navigate(['/Doctors'])

        })
    }

ngOnDestroy() {
    
}
}