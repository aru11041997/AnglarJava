import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
declare let alertify:any;

@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {

  constructor(private loginService:LoginService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.loginService.currentUser.role==='Admin'){
        alertify.error('You are not admin');
        this.router.navigate(['/home']);
        
      }
    return true;
  }
  
}
