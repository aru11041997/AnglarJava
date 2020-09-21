import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable()
export class AuthService implements HttpInterceptor {

  constructor(private loginService:LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq=req;
    console.log('Auth service '+this.loginService.currentUser.token);
    if(this.loginService.currentUser && this.loginService.currentUser.token!=null){
      authReq = req.clone({
        setHeaders: {
          Authorization: this.loginService.currentUser.token
        }
      });
    }
    return next.handle(authReq);
  }
}
