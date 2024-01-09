import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { SignupuserComponent } from './auth/signupuser/signupuser.component';
import { SignupmanagerComponent } from './auth/signupmanager/signupmanager.component';
import { SignupdoctorComponent } from './auth/signupdoctor/signupdoctor.component';
import { LoginComponent } from './auth/login/login.component';
import { RouterModule } from '@angular/router';
import {AppRouting} from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './shared/loading/loading.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthIntercepters } from './shared/loading/auth.intercepter';
import { DatePipe } from '@angular/common';
import {ManagerGuard} from './shared/loading/manager-guard.service'
import{ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor/doctor.component';
import { DoctordetailsComponent } from './doctors/doctordetails/doctordetails.component';
import { SearchComponent } from './search/search.component';
import { AppointmentModalComponent } from './appointment-modal/appointment-modal.component';
import { CreateappointentComponent } from './appointments/createappointent/createappointent.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ThankyouComponent } from './appointments/thankyou/thankyou.component';
import { UserappointmentsComponent } from './appointments/userappointments/userappointments.component';
import { DoctorappointmentsComponent } from './appointments/doctorappointments/doctorappointments.component';
import {FormatTimePipe} from './shared/formattime.pipe'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthComponent,
    SignupuserComponent,
    SignupmanagerComponent,
    SignupdoctorComponent,
    LoginComponent,
    LoadingComponent,
    DoctorsComponent,
    DoctorComponent,
    DoctordetailsComponent,
    SearchComponent,
    AppointmentModalComponent,
    CreateappointentComponent,
    AppointmentsComponent,
    ThankyouComponent,
    UserappointmentsComponent,
    DoctorappointmentsComponent,
    FormatTimePipe    
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercepters,
      multi: true,
    },
    DatePipe,
    ManagerGuard
  ],
  bootstrap: [AppComponent],
  exports:[RouterModule]
})
export class AppModule { }