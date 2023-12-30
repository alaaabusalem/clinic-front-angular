
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ManagerGuard implements CanActivate {
    constructor(private authService: AuthService,private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.userEvent.pipe(take(1), map(user => {
            if (user != null && user.role == "Admin") {
                return true
            }
            else { 
                this.router.navigate(['/']);
             }
        }))
    }
}