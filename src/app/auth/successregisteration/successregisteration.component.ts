import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successregisteration',
  templateUrl: './successregisteration.component.html',
  styleUrls: ['./successregisteration.component.css']
})
export class SuccessregisterationComponent {

constructor(private router:Router) {}

Home(){
this.router.navigate(['/']);
}
}
