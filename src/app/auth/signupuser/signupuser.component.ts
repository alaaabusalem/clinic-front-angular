import { Component, OnDestroy, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms'
import { AuthService,registeruser } from '../auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signupuser',
  templateUrl: './signupuser.component.html',
  styleUrls: [ '../auth.component.css']
})
export class SignupuserComponent implements OnDestroy{
@ViewChild('form',{ static: true }) form:NgForm;
CreateUserEvent:Subscription;
IsLoading:boolean=false;
errArray:string[];
constructor(private authService:AuthService,private router:Router){}

  async OnSubmit(){
   
 
   const user:registeruser={ name: this.form.value.name, Email: this.form.value.Email,
     password: this.form.value.password,
     PhoneNumber: this.form.value.PhoneNumber };
this.IsLoading=true;
 this.CreateUserEvent=this.authService.CreateUser(user).subscribe(res=>{
  this.IsLoading=false;
  this.form.reset();
  this.router.navigate(['/auth/login'])
 },err =>{
  this.IsLoading=false;

  if(err.error != null){
  const errorObj = err.error.errors;
this.errArray=[];
        for (let key in errorObj) {
         
            this.errArray.push(...errorObj[key]);
          }
        }
 } )
}

 ngOnDestroy(): void {

  if (this.CreateUserEvent) {
    this.CreateUserEvent.unsubscribe();  }
   
   this.form.reset();
 }
}