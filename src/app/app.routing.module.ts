import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router'
import { AuthComponent } from './auth/auth.component';
import { SignupuserComponent } from './auth/signupuser/signupuser.component';
import { SignupmanagerComponent } from './auth/signupmanager/signupmanager.component';
import { SignupdoctorComponent } from './auth/signupdoctor/signupdoctor.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import {ManagerGuard} from './shared/loading/manager-guard.service'
const appRoutes:Routes=[
    {path: '', component: HomeComponent},
    {path:'auth',component:AuthComponent,children:[
        {path: '', component: LoginComponent},
        {path:'login',component:LoginComponent},
        {path:'Signup/user',component:SignupuserComponent},
        {path:'Signup/manager',component:SignupmanagerComponent,canActivate:[ManagerGuard]},
        {path:'Signup/doctor',component:SignupdoctorComponent,canActivate:[ManagerGuard]},

    ]}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
        ],
        exports:[RouterModule],
        
    })

    export class AppRouting{
    
    
    }