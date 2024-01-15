import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Doctor } from '../shared/models/Doctor.model';
import { DoctorService } from './doctor.service';
import { ChangeDetectorRef } from '@angular/core';
import { SearchService } from '../search/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit,OnDestroy{
  doctorsArr:Doctor[]=[];
  processingComplete = false;
  docEvent:Subscription;
  IsLoading=false;
  searchEvent:Subscription;
constructor(private doctorService: DoctorService,private searchService: SearchService ) {}
ngOnInit() {
 this.doctorsArr=this.searchService.doctorsArr;
 this.processingComplete = true;

 this.searchEvent=this.docEvent=this.searchService.doctors.subscribe(res=>{
  this.doctorsArr=res;
 console.log(res);
  this.processingComplete = true;
})

this.searchService.SearchEvent.subscribe(result=>{
  this.IsLoading=result;
})

}

ngOnDestroy() {
  if(this.docEvent){
    this.docEvent.unsubscribe();
  }
  if(this.searchEvent){
    this.searchEvent.unsubscribe();
  }
}
}