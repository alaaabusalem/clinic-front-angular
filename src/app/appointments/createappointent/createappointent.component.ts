import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Doctor } from 'src/app/shared/models/Doctor.model';
import { AppointmentService, createAppointment } from '../appointment.service';

@Component({
  selector: 'app-createappointent',
  templateUrl: './createappointent.component.html',
  styleUrls: ['./createappointent.component.css','../../auth/auth.component.css']
})
export class CreateappointentComponent implements OnInit{
  time:string;
  date:string
  @ViewChild('form',{ static: true }) form:NgForm;
  IsLoading=false;
  doctor:Doctor=null;
err:string;  
constructor(private route: ActivatedRoute,private appointmentSer: AppointmentService,private router:Router){
}
ngOnInit() {
  this.doctor= this.appointmentSer.doctorToBook;

  if(this.doctor==null){
    this.router.navigate(['/Doctors'],{relativeTo: this.route});
  }
  this.route.params.subscribe(Params=>{
    this.time=Params['time'];
    this.date=Params['date'];
  })
  this.time = decodeURIComponent(this.time);
  this.date = decodeURIComponent(this.date);
}

OnSubmit(){
  const appointment: createAppointment = {
    patientName: this.form.value.name,
    patientAge: this.form.value.age.toString(),
    contactNumber: this.form.value.contact,
    doctorId: this.doctor.doctorId,
    date: this.date,
    time: this.time
  };
  this.IsLoading=true;
  this.appointmentSer.AddAppointment(appointment).subscribe(res=>{
    this.IsLoading=false;
    this.router.navigate(['appointments/thankyou']);

    console.log(res);
  },err=>{
    this.IsLoading=false;

this.err="Sorry! somthing went wrong";
  })
}

}
