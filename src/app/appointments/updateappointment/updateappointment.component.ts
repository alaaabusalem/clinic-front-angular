import { AfterContentInit, Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService, DoctorAppointment, UpdateAppointment, appointmentStatus } from '../appointment.service';
import { switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-updateappointment',
  templateUrl: './updateappointment.component.html',
  styleUrls: ['./updateappointment.component.css']
})
export class UpdateappointmentComponent implements OnInit, AfterContentInit{
  @ViewChild('form',{ static: true }) form:NgForm;
isLoading=false;
appointmentId;
appointment:DoctorAppointment;
appStatusArray:appointmentStatus[];
showHtml=false;
err:string;
constructor(private route: ActivatedRoute,private appointmentservice: AppointmentService) {}

ngOnInit(){
  this.isLoading=true;

  this.route.params.subscribe(params=>{
    this.appointmentId=params['appointmentId'];
  })

  this.appointmentservice.GetDoctorAppointment(this.appointmentId).pipe(
    switchMap((firstResponse) => {
      // Process the first response if needed
      this.appointment = firstResponse;
      console.log(this.appointment);
  
      // Now return the second observable
      return this.appointmentservice.GetAppointmentStatus();
    })
  ).subscribe((secondResponse) => {
    // Process the second response
    this.appStatusArray = secondResponse;
    console.log(this.appStatusArray);
    this.form.setValue({
      patientName: this.appointment.patientName,
      patientAge: this.appointment.patientAge,
      contactNumber: this.appointment.contactNumber,
      description: "",
      medicines: "",
      appointmentStatusId: this.appointment.appointmentStatus.appointmentStatusId
      });
  });
}
ngAfterContentInit() {
  this.isLoading=false;

}
OnSubmit(){}
}

