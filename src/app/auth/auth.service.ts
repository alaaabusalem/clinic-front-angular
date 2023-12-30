import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { BehaviorSubject, tap,Observable, map } from 'rxjs';
import { Time } from '@angular/common';
import { Department } from '../shared/models/Department.model';
import { Location } from '../shared/models/Location.model';
import {NgForm,FormControl,FormGroup,Validators} from '@angular/forms'

export interface registeruser {
  name: string;
  Email: string;
  PhoneNumber: string;
  password: string;
}
export interface registerdoctor {
  name: string;
  Email: string;
  PhoneNumber: string;
  password: string;
  Gender:string;
  Specialization:string;
  LocationDetailes:string;
  OpeningTime: string;
  CloseTime:string;
    Description:string;
  fees:string;
  DepartmentId:number;
  LocationId:number;
}
export interface Login {

  Email: string;
  password: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
LoguotTime:any;
  constructor(private http: HttpClient) { }

  userEvent = new BehaviorSubject<User>(null);
  CreateUser(user: registeruser) {
    return this.http.post('https://localhost:7197/api/user/RegisterUser', user);
  }
  CreateManager(admin: registeruser) {
    return this.http.post('https://localhost:7197/api/user/RegisterAdmin', admin);

  }
  Login(login: Login) {


    return this.http.post<User>('https://localhost:7197/api/user/login', login).pipe(tap(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userEvent.next(user);
      this.AutoLogout(new Date(user.expired))

    }));


  }
  Logout() {
    this.userEvent.next(null);
    localStorage.removeItem('user');
    if(this.LoguotTime){
      clearTimeout(this.LoguotTime);
      this.LoguotTime=null;
    }

  }

  checkLogin() {

    const user: {
      name: string,
      email: string,
      _token: string,
      expired: Date,
      role: string
    }
      = JSON.parse(localStorage.getItem('user'));
 

    if (user) {
      const thisUser = new User(user.name, user.email, user._token, new Date(user.expired), user.role);

    

      if (thisUser.token) {
        this.userEvent.next(thisUser);
        this.AutoLogout(new Date(thisUser.expired));
        return true;
      }

    }

     this.userEvent.next(null);

    localStorage.removeItem('user');
    return false;
  }



AutoLogout(date: Date){
  const currentTime = new Date();
  let time=date.getTime()-currentTime.getTime();
  this.LoguotTime=setTimeout(() => {
    this.Logout();
  }, time);
}

GetDepartments():Observable<Department[]>{
  return this.http.get<Department[]>('https://localhost:7197/api/Departments/GetDepartments').pipe(map(res=>{
    return res.filter(dep => dep.isDisabal==false)
  }));
}
  GetLocations():Observable<Location[]>{
    return this.http.get<Location[]>('https://localhost:7197/api/Departments/GetLocations').pipe(map(res=>{
      return res.filter(dep => dep.isDisabal==false)
    }));
  }

CreatDoctor(doctor:registerdoctor){
  return this.http.post<number>('https://localhost:7197/api/user/RegisterDoctor', doctor,);
}
StoreTheImage(doctorId:number,formData: FormData){
  const headers = new HttpHeaders({
    'Content-Type': 'multipart/form-data',
  });
  return this.http.post(`https://localhost:7197/api/user/RegisterDoctorImg/${doctorId}`, formData,{ headers });
}
}