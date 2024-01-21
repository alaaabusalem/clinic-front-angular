import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppointmentService, clientAppointment } from '../appointment.service';
import { Subscription } from 'rxjs';
import { ClientappointmentModalComponent } from '../clientappointment-modal/clientappointment-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

   constructor(private appService:AppointmentService,private modalService:NgbModal) {}
   ngOnInit() {
    this.IsLoading=true;
   this.GetClientAppointmentsEvent=  this.appService.GetClientAppointments().subscribe(res=>{
      this.myAppointments=res;
this.count=this.myAppointments.length;
this.IsLoading=false;
this.show=true;
     })

   }

   openModal(appointmentId:number){
    const Id=Number(appointmentId);
    const modalRef = this.modalService.open(ClientappointmentModalComponent);
    modalRef.componentInstance.Id =Id ;
   }

   Doctor(doctorId:number){
   }

   ngOnDestroy(){
     if(this.GetClientAppointmentsEvent){
this.GetClientAppointmentsEvent.unsubscribe();
     }
   }
}
