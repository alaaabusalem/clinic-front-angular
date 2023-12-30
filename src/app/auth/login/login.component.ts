import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms'
import { AuthService, Login } from '../auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css']
})
export class LoginComponent implements OnDestroy,OnInit{
  @ViewChild('form',{ static: true }) form:NgForm;
  LoginEvent:Subscription;
  IsLoading:boolean;
  error:string;

  constructor(private authService:AuthService,private router:Router,private Route:ActivatedRoute){
    this.error=null;
    this.IsLoading=false;
  }
ngOnInit(): void {
  const result=this.authService.checkLogin();
  if(result){
    this.router.navigate(['/'])
  }
}
  OnSubmit(){
   const login:Login={Email:this.form.value.Email,password:this.form.value.password}
   this.IsLoading=true;
 
 this.LoginEvent=this.authService.Login(login).subscribe(res=>{
  this.IsLoading=false;
  //this.authService.userEvent.next(res);
  this.form.reset();
   this.router.navigate(['/']);
 },err =>{
  this.IsLoading=false;
   //const errorObj = err.;
   this.error=err.error;
 
 } )

   

 
  }
ngOnDestroy(): void {
if(this.LoginEvent){
  this.LoginEvent.unsubscribe();

}
  
  this.form.reset();

}
  
}
