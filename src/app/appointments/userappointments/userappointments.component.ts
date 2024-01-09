import { Component, OnInit } from '@angular/core';
import { AppointmentService, clientAppointment } from '../appointment.service';

@Component({
  selector: 'app-userappointments',
  templateUrl: './userappointments.component.html',
  styleUrls: ['./userappointments.component.css']
})
export class UserappointmentsComponent implements OnInit{
   myAppointments: clientAppointment[];
   show=false;
    count=0;
    IsLoading=false;
   constructor(private appService:AppointmentService) {}
   ngOnInit() {
    this.IsLoading=true;
     this.appService.GetClientAppointments().subscribe(res=>{
      this.myAppointments=res;
this.count=this.myAppointments.length;
this.IsLoading=false;
this.show=true;
     })

   }

   Details(){

   }

   Doctor(doctorId:number){
    console.log(doctorId)
   }
}
