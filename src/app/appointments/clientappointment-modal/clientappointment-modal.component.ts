import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DoctorService } from '../../doctors/doctor.service';
import { Router } from '@angular/router';
import { AppointmentService, clientAppointment } from '../../appointments/appointment.service';
@Component({
  selector: 'app-clientappointment-modal',
  templateUrl: './clientappointment-modal.component.html',
  styleUrls: ['./clientappointment-modal.component.css']
})
export class ClientappointmentModalComponent implements OnInit,OnDestroy{
  @Input() Id:number;
  app:clientAppointment;
  isLoading=false;
  
  constructor(public activeModal: NgbActiveModal,
    private docService:DoctorService,
    private router:Router,
    private appointmentService:AppointmentService) {}
ngOnInit(){
  this.isLoading=true;
this.appointmentService.GetClientAppointment(this.Id).subscribe(res=>{
console.log(res);
this.app=res;
this.isLoading=false;
})
  
}




  ngOnDestroy() {
   
  }
}
