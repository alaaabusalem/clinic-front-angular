import { Component, OnDestroy, OnInit, ViewChild,AfterContentInit,ChangeDetectorRef } from '@angular/core';
import {NgForm,FormControl,FormGroup,Validators,FormBuilder} from '@angular/forms'
import { AuthService,registerdoctor,registeruser } from '../auth.service';
import { Subscription,Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../shared/models/Department.model';
import { Location } from '../../shared/models/Location.model';

@Component({
  selector: 'app-signupdoctor',
  templateUrl: './signupdoctor.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignupdoctorComponent implements OnInit,OnDestroy,AfterContentInit{
  @ViewChild('form',{ static: true }) form:NgForm;
  CreateDoctorEvent:Subscription;
  GetLocationEvent:Subscription;
  GetDepartmentEvent:Subscription;

  IsLoading:boolean=false;
  errArray:string[];
    departmentArr:Department[];
    locationArr:Location[];
     formData:FormData;

    
  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute){
      // Get Departments
     
            
  }

  ngOnInit() {
  
  }

  ngAfterContentInit() {
  
 //Get Department 
 
    this.GetDepartmentEvent=this.GetDepartmentEvent=this.authService.GetDepartments().subscribe(res=>{
      console.log(res)
this.departmentArr=res;

    })
        // Get Locations

    this.GetLocationEvent=this.GetLocationEvent=this.authService.GetLocations().subscribe(res=>{
      console.log(res)

      this.locationArr=res;
 
            this.form.form.patchValue({
              LocationId: this.locationArr[0].locationId,
              DepartmentId:this.departmentArr[0].departmentId
            
          });
          })
          
  }
    async OnSubmit(){
      // Creat registerdoctor obj
     /*const doctor:registerdoctor={ name: this.form.value.name, Email: this.form.value.Email,
       password: this.form.value.password,
       PhoneNumber: this.form.value.PhoneNumber,LocationDetailes: this.form.value.LocationDetailes,
       LocationId:parseFloat(this.form.value.LocationId),
      DepartmentId:parseFloat(this.form.value.DepartmentId),fees:(this.form.value.fees.toString()),
    Gender:this.form.value.Gender,Description:this.form.value.Description,
  Specialization:this.form.value.Specialization,OpeningTime:this.form.value.OpeningTime,CloseTime:this.form.value.CloseTime};
  this.IsLoading=true;*/



    // Convert the rest of the form controls to a JSON string
    const postDtoJson = JSON.stringify(this.form.form.value);
  // submit the form
   this.CreateDoctorEvent=this.authService.CreatDoctor(this.formData,postDtoJson).subscribe(res=>{
   // this.onSubmitPic(res);
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
  
 /* onSubmitPic(event: any) {
    const files = event.target.files;
  
    if (files && files.length > 0) {
      const file = files[0]; // Assuming you are interested in the first file
  
      let formData = new FormData();
      formData.append('ImageFile', file);
  
      console.log("formData", formData);
  
      this.authService.StoreTheImage(8, formData).subscribe(
        res => {
          // Handle the response if needed
        },
        err => {
          console.log(err);
        }
      );
    }
  }*/

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.formData = new FormData();
      this.formData.append('img',file);
      console.log(file);

    }
  }
 // }

  //onFileSelected() {
   /* if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      this.Imgform.controls['Imgs'].setValue(file);
      //console.log(file);
      this.onSubmitPic();
    }*/
    
    //let file = event.target.files[0];
   // let formData = new FormData();
    //formData.append('ImageFile', file);
    //console.log("formData",formData);

 // }

   ngOnDestroy(){
    if(this.CreateDoctorEvent){
     this.CreateDoctorEvent.unsubscribe();
    }
    if(this.GetDepartmentEvent){
      this.GetDepartmentEvent.unsubscribe();
     }
     if(this.GetLocationEvent){
      this.GetLocationEvent.unsubscribe();
     }
   }

  }