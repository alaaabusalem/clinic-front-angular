import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Doctor } from '../shared/models/Doctor.model';
import { Subscription } from 'rxjs';
import { DoctorService } from '../doctors/doctor.service';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css']
})
export class AppointmentModalComponent implements OnInit,OnDestroy{
  @Input() Id:number;
  getDoctorAppEvent:Subscription;
  doctor:Doctor;
  constructor(public activeModal: NgbActiveModal,private docService:DoctorService) {}
ngOnInit(){
  this.getDoctorAppEvent= this.docService.GetDoctorApointment(this.Id).subscribe(res=>{
this.doctor=res;
console.log(this.doctor)
  })
}
  ngOnDestroy() {
    
  }
}
