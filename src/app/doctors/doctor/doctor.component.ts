import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/shared/models/Doctor.model';
import { Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentModalComponent } from 'src/app/appointment-modal/appointment-modal.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['../doctors.component.css']
})
export class DoctorComponent implements OnInit{
@Input() doctor:Doctor

IsAuth=false;
Role=""
constructor(private modalService: NgbModal,private authService: AuthService) {
  
}
ngOnInit(): void {
  this.authService.userEvent.subscribe(user=>{
    if(user !=null){
      this.IsAuth=true;
      this.Role=user.role;
    }
    else{
      this.IsAuth=false;
      this.Role=null;
    }
  })
}
openModal() {
  const modalRef = this.modalService.open(AppointmentModalComponent);
  modalRef.componentInstance.Id = this.doctor.doctorId;

}
}
