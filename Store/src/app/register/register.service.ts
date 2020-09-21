import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRegister } from './register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registerUrl:string='http://localhost:8090/register';

  constructor(private http:HttpClient) { }

  addUser(register:IRegister):Observable<any>{
    console.log(register);
    return this.http.post<any>(this.registerUrl,register).pipe(
      catchError(this.handleError)
      )
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
}
