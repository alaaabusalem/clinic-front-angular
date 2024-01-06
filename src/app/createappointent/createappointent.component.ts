import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createappointent',
  templateUrl: './createappointent.component.html',
  styleUrls: ['./createappointent.component.css']
})
export class CreateappointentComponent implements OnInit{
  time:string;
  date:string

constructor(private route: ActivatedRoute){
}
ngOnInit() {
  this.route.params.subscribe(Params=>{
    this.time=Params['time'];
    this.date=Params['date'];
  })
  this.time = decodeURIComponent(this.time);
  this.date = decodeURIComponent(this.date);
  console.log(this.date);
  console.log(this.time);

}
}
