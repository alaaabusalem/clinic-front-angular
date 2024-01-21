import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { User } from './user.model';
import { BehaviorSubject, tap,Observable, map, take,throwError } from 'rxjs';
import { Time } from '@angular/common';
import { Department } from '../shared/models/Department.model';
import { Location } from '../shared/models/Location.model';
import {NgForm,FormControl,FormGroup,Validators} from '@angular/forms'
import { catchError,switchMap } from 'rxjs/operators';

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


    return this.http.post('https://localhost:7197/api/user/login', login).pipe(tap(user => {
      localStorage.setItem('user', JSON.stringify(user));
      //myUser.token;
      //console.log(myUser.token);
      const myUser = user as {
        name: string,
        email: string,
        _token: string,
        expired: string,
        role: string
      };
      const thisUser = new User(myUser.name, myUser.email, myUser._token, new Date(myUser.expired), myUser.role);
this.userEvent.next(thisUser);

      this.AutoLogout(new Date(myUser.expired))

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

  CreatDoctor(postDtoJson: string, formData: FormData): Observable<number> {
    return this.http.post<number>(`https://localhost:7197/api/User/RegisterDoctor?postDtoJson=${postDtoJson}`, formData);
}

  StoreTheImage(image: File): Observable<any> {
    console.log('Image Object:', image);
  
    return this.convertImageToByteArray(image).pipe(
      switchMap((byteArray) => {
        console.log('Byte Array:', byteArray);
  
        const base64Image = btoa(new Uint8Array(byteArray).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  
        var doctorProfilePictureFormData = {
          image: base64Image,
        };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
        return this.http.post('https://localhost:7197/api/user/RegisterDoctorImg', JSON.stringify(doctorProfilePictureFormData), { headers });
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(`Backend returned code ${error.status}, body was:`, error.error);
        }
  
        return throwError('Something bad happened; please try again later.');
      })
    );
  }
  
  
  
  
  
  private convertImageToByteArray(image: File): Observable<ArrayBuffer> {
    const reader = new FileReader();
  
    return new Observable<ArrayBuffer>((observer) => {
      reader.onloadend = () => {
        observer.next(reader.result as ArrayBuffer);
        observer.complete();
      };
  
      reader.onerror = (error) => {
        observer.error(error);
      };
  
      reader.readAsArrayBuffer(image);
    });
  }
  
}
