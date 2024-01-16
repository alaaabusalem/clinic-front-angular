import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppointmentService, clientAppointment } from '../appointment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userappointments',
  templateUrl: './userappointments.component.html',
  styleUrls: ['./userappointments.component.css']
})
export class UserappointmentsComponent implements OnInit,OnDestroy{
   myAppointments: clientAppointment[];
   show=false;
    count=0;
    IsLoading=false;
    GetClientAppointmentsEvent:Subscription;
    appointmentsFilter: string = '';

   constructor(private appService:AppointmentService) {}
   ngOnInit() {
    this.IsLoading=true;
   this.GetClientAppointmentsEvent=  this.appService.GetClientAppointments().subscribe(res=>{
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

   ngOnDestroy(){
     if(this.GetClientAppointmentsEvent){
this.GetClientAppointmentsEvent.unsubscribe();
     }
   }
}
