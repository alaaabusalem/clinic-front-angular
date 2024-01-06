import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Doctor } from '../shared/models/Doctor.model';
import { Subscription } from 'rxjs';
import { DoctorService } from '../doctors/doctor.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointments/appointment.service';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css']
})
export class AppointmentModalComponent implements OnInit,OnDestroy{
  @Input() Id:number;
  getDoctorAppEvent:Subscription;
  doctor:Doctor;
  isCompleted=false;
  currentPage = 1;
  pageSize = 1;
  totalItems:number
  maxSize = 9;

  showMore = false;
  maxHeight = 300;
  constructor(public activeModal: NgbActiveModal,
    private docService:DoctorService,
    private router:Router,
    private appointmentService:AppointmentService) {}
ngOnInit(){
  this.getDoctorAppEvent= this.docService.GetDoctorApointment(this.Id).subscribe(res=>{
this.doctor=res;
console.log(this.doctor);
this.totalItems=this.doctor.dateSlots.length;
this.isCompleted=true;
  })
}
get displayedItems() {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  return this.doctor.dateSlots.slice(startIndex, startIndex + this.pageSize);
}

toggleShowMore() {
  this.showMore = !this.showMore;
  this.maxHeight = this.showMore ? 0 : 300; // Set maxHeight to 0 when showing more, or 300 when showing less
}
AddAppointment(time:string,date:string){
this.appointmentService.doctorAppointmentEvent.next(this.doctor);
const encodedDate = encodeURIComponent(date);
const encodedTime = encodeURIComponent(time);
this.activeModal.close();
this.router.navigate([`appointments/creat/${encodedDate}/${encodedTime}`])
}
  ngOnDestroy() {
    
  }
}
