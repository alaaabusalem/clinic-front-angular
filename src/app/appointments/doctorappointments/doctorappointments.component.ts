import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppointmentService, DoctorAppointment, clientAppointment } from '../appointment.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-doctorappointments',
  templateUrl: './doctorappointments.component.html',
  styleUrls: ['./doctorappointments.component.css']
})
export class DoctorappointmentsComponent {
  myAppointments: DoctorAppointment[];
  show=false;
   count=0;
   IsLoading=false;
   GetClientAppointmentsEvent:Subscription;
   appointmentsFilter: string = '';

  constructor(private appService:AppointmentService, private router:Router) {}
  ngOnInit() {
   this.IsLoading=true;
  this.GetClientAppointmentsEvent=  this.appService.GetDoctorAppointments().subscribe(res=>{
     this.myAppointments=res;
this.count=this.myAppointments.length;
this.IsLoading=false;
this.show=true;
    })

  }

  Details(){

  }
  Update(appointmentId:number){
this.router.navigate([`/appointments/doctor/update/${appointmentId}`])
  }
  ngOnDestroy(){
    if(this.GetClientAppointmentsEvent){
this.GetClientAppointmentsEvent.unsubscribe();
    }
  }
}
