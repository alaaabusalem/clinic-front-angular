import { Pipe, PipeTransform } from '@angular/core';
import { DoctorAppointment } from '../appointments/appointment.service';

@Pipe({
  name: 'doctorappointmentFilter'
})
export class DoctorAppointmentFilterPipe implements PipeTransform {
  transform(appointments: DoctorAppointment[], filter: string): DoctorAppointment[] {
    if (!filter) {
      return appointments; // Return the complete array when filter is empty or not provided
    }

    //const lowerFilter = filter.toLowerCase();
    const lowerFilterDigit = filter.toLowerCase();

    return appointments.filter(appointment =>
      //appointment.patientName.toLowerCase().includes(lowerFilter) ||
      //appointment.appointmentStatus.name.toLowerCase().includes(lowerFilter)
      // Add more conditions as needed
      this.isStringMatching(appointment.date, lowerFilterDigit)||
       this.isStringMatching(appointment.appointmentStatus.name, lowerFilterDigit) ||
      this.isStringMatching(appointment.patientName, lowerFilterDigit) 
    );
  }

  private isStringMatching(value: string, filterDigit: string): boolean {
    // Treat the string as a string and check if it contains the specified digit
    return value.toLowerCase().includes(filterDigit);
  }
  
}