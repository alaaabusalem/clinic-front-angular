import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  userSub:Subscription;
  IsAuth=false;
  Role:string;
  isCollapsed = true;

constructor(private authService:AuthService,private router:Router){
  this.IsAuth=false;
  this.Role=null;
}

ngOnInit(): void {
  this.authService.userEvent.subscribe(user=>{
    if(user !=null){
      this.IsAuth=true;
      this.Role=user.role;
    }
    else{
      this.IsAuth=false;
      this.Role=null;
    }
  })
  this.authService.checkLogin();
}

OnLogout(){
  this.authService.Logout();
  this.router.navigate(['/'])

}
ngOnDestroy(): void {
  this.userSub.unsubscribe();
}
}
