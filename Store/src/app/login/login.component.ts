import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginUser } from '../auth/loginUser';
import { IUser } from './login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pageTitle:string="Login";

  isError:boolean=false;
  

  user:IUser={
    username:null,
    password:null
  }


  constructor(private loginService:LoginService,private router:Router){}

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm){
    if(loginForm.valid)
      this.loginService.login(this.user).subscribe((res)=>{
        console.log(typeof res.status);
        if(this.loginService.currentUser && this.loginService.currentUser.token!=null && res.status===200){
          this.router.navigate(['/home']);
        }
      },error=>{
        this.isError=true;
      });
  }
}
