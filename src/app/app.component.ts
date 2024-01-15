import { Component } from '@angular/core';
import { DoctorService } from './doctors/doctor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinic-front-angular';
  
  constructor(private docService: DoctorService) {
   
    
  }
}
