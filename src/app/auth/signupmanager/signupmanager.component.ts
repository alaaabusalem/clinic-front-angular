import { Component, OnDestroy, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms'
import { AuthService,registeruser } from '../auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-signupmanager',
  templateUrl: './signupmanager.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignupmanagerComponent {
  @ViewChild('form',{ static: true }) form:NgForm;
  CreateManagerEvent:Subscription;
  IsLoading:boolean=false;
  errArray:string[];
  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute){}
  
    async OnSubmit(){
     
     const user:registeruser={ name: this.form.value.name, Email: this.form.value.Email,
       password: this.form.value.password,
       PhoneNumber: this.form.value.PhoneNumber };
  this.IsLoading=true;
   this.CreateManagerEvent=this.authService.CreateManager(user).subscribe(res=>{
    this.IsLoading=false;
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
    if(this.CreateManagerEvent){
     this.CreateManagerEvent.unsubscribe();
    }

   }
}
