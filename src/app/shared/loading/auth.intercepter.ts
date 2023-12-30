import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, exhaustMap,take } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";




@Injectable()
export class AuthIntercepters implements HttpInterceptor{

    constructor(private authService: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<any> {
       return  this.authService.userEvent.pipe(take(1),exhaustMap(user=>{
     if(user==null){return next.handle(req)}
     if(user.token== null){
        this.authService.userEvent.next(null);
        return next.handle(req);
     }
        const modifiedReq= req.clone({
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              })
        })
        return next.handle(modifiedReq);
       }))
    }
}