import { Component } from '@angular/core';
import { Doctor } from 'src/app/shared/models/Doctor.model';
import { Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentModalComponent } from 'src/app/appointment-modal/appointment-modal.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['../doctors.component.css']
})
export class DoctorComponent {
@Input() doctor:Doctor


constructor(private modalService: NgbModal) {
  
}

openModal() {
  const modalRef = this.modalService.open(AppointmentModalComponent);
  modalRef.componentInstance.Id = this.doctor.doctorId;

}
}
