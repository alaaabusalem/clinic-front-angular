import { Component, OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ViewChild} from '@angular/core';
import { Location } from '../shared/models/Location.model';
import { AfterContentInit, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { EMPTY, Subscription } from 'rxjs';
import { Department } from '../shared/models/Department.model';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './search.service';
import { DoctorService } from '../doctors/doctor.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../auth/auth.component.css']
})

export class SearchComponent implements AfterContentInit,OnDestroy{
  @ViewChild('form',{ static: true }) form:NgForm;
  IsLoading=false;
  error:string;
  locationArr:Location[];
  departmentArr:Department[];
  GetLocationEvent:Subscription;
  GetDepartmentEvent:Subscription;
  constructor(private authService: AuthService,private searchService:SearchService, private docService:DoctorService) {
    
    
  }
  ngAfterContentInit() {
    
      //Get Department 
      
         this.GetDepartmentEvent=this.GetDepartmentEvent=this.authService.GetDepartments().subscribe(res=>{
     this.departmentArr=res;
     
         })
             // Get Locations
     
         this.GetLocationEvent=this.GetLocationEvent=this.authService.GetLocations().subscribe(res=>{
     
           this.locationArr=res;   
               
       })
   
     
      }

  OnSubmit(){
    const LocationIdRes=this.form.value.LocationId? true: false;
    const DepartmentIdRes=this.form.value.DepartmentId? true: false;
    //console.log(LocationIdRes);
    //console.log(DepartmentIdRes)
    this.IsLoading=true;
 if(LocationIdRes && DepartmentIdRes){
  this.searchService.SearchEvent.next(true);
  this.searchService.GetDoctorsByLocationAndDepartment(this.form.value.LocationId,this.form.value.DepartmentId);
 }
 else if(LocationIdRes){
  this.searchService.SearchEvent.next(true);

  this.searchService.GetDoctorsByLocation(this.form.value.LocationId);
}
else if(DepartmentIdRes){
  this.searchService.SearchEvent.next(true);

  this.searchService.GetDoctorsByDepartment(this.form.value.DepartmentId);

}
this.IsLoading=false;
  }
  ngOnDestroy(){
    if(this.GetDepartmentEvent){
      this.GetDepartmentEvent.unsubscribe();
     }
     if(this.GetLocationEvent){
      this.GetLocationEvent.unsubscribe();
     }
   }
}
