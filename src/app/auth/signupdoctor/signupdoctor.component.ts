import { Component, OnDestroy, OnInit, ViewChild, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms'
import { AuthService, registerdoctor, registeruser } from '../auth.service';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../shared/models/Department.model';
import { Location } from '../../shared/models/Location.model';
import { BlobStorageService } from 'src/app/shared/blobstorage.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-signupdoctor',
  templateUrl: './signupdoctor.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignupdoctorComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild('form', { static: true }) form: NgForm;
  CreateDoctorEvent: Subscription;
  GetLocationEvent: Subscription;
  GetDepartmentEvent: Subscription;

  IsLoading: boolean = false;
  showHtml = false;
  errArray: string[];
  departmentArr: Department[];
  locationArr: Location[];
  //formData:FormData;
  image: File;


  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private blobService: BlobStorageService) {
    // Get Departments


  }

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.GetDepartmentEvent = this.authService.GetDepartments().pipe(
      switchMap(departmentRes => {
        console.log(departmentRes);
        this.departmentArr = departmentRes;

        // Return the observable for the next subscription
        return this.authService.GetLocations();
      })
    ).subscribe(locationRes => {
      console.log(locationRes);

      this.locationArr = locationRes;

      this.form.form.patchValue({
        LocationId: this.locationArr[0].locationId,
        DepartmentId: this.departmentArr[0].departmentId
      });

      this.showHtml = true;
    });

  }
  async OnSubmit(){
    // Create registerdoctor obj
    const doctor:registerdoctor = { 
      name: this.form.value.name, 
      Email: this.form.value.Email,
      password: this.form.value.password,
      PhoneNumber: this.form.value.PhoneNumber,
      LocationDetailes: this.form.value.LocationDetailes,
      LocationId:parseFloat(this.form.value.LocationId),
      DepartmentId:parseFloat(this.form.value.DepartmentId),
      fees:(this.form.value.fees.toString()),
      Gender:this.form.value.Gender,
      Description:this.form.value.Description,
      Specialization:this.form.value.Specialization,
      OpeningTime:this.form.value.OpeningTime,
      CloseTime:this.form.value.CloseTime
    };
    this.IsLoading=true;
  
    const postDtoJson = JSON.stringify(doctor);

    // Create a new FormData instance and append the image
    let formData = new FormData();
    formData.append('img', this.image);
    console.log(formData.get('img'));

  
    // Submit the form
    this.CreateDoctorEvent=this.authService.CreatDoctor(postDtoJson, formData).subscribe(res=>{
      this.IsLoading=false;
      this.router.navigate(['/auth/success'])
    }, err =>{
      this.IsLoading=false;
      if(err.error != null){
        const errorObj = err.error.errors;
        this.errArray=[];
        for (let key in errorObj) {
          this.errArray.push(...errorObj[key]);
        }
      }
    })
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
    
  }
 


 



  ngOnDestroy() {
    if (this.CreateDoctorEvent) {
      this.CreateDoctorEvent.unsubscribe();
    }
    if (this.GetDepartmentEvent) {
      this.GetDepartmentEvent.unsubscribe();
    }
    if (this.GetLocationEvent) {
      this.GetLocationEvent.unsubscribe();
    }
  }

}