import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ILoginUser } from '../auth/loginUser';
import { IUser } from './login';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginURL:string='http://localhost:8090/login';

  currentUser:ILoginUser={} as ILoginUser;

  decodeToken:any;
  splitToken:any;

  constructor(private http:HttpClient){}

  login(user:IUser):Observable<any>{
    return this.http.post<any>(this.loginURL, user,{observe:'response'})
    .pipe(
            tap((res)=>{
              this.currentUser.username=user.username;
              this.currentUser.token=res.headers.get('Authorization');
              this.currentUser.role=this.decodeJwt(res.headers.get('Authorization'));
            }),
            catchError(this.handleError)
        );
  }

  private handleError(err:HttpErrorResponse){
    let errorMessage='';
    if(err.error instanceof ErrorEvent){
        errorMessage='An error occurred :' +(err.error.message);
    }else{
        errorMessage='Server returned code : '+(err.status)+' error message is : '+(err.message);
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  private decodeJwt(token:string):string{
    this.splitToken=token.split(' ');
    this.decodeToken=jwt_decode(this.splitToken[1]);
    return this.decodeToken.role;
  }
}
