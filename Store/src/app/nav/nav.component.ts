import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginUser } from '../auth/loginUser';
import { LoginService } from '../login/login.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  title = 'book Store';
  constructor(private loginService:LoginService,private router:Router) { }

  
  user=this.loginService.currentUser;
  

  ngOnInit(): void {

  }

  logout():void{
    this.loginService.currentUser={} as ILoginUser; 
    this.user=this.loginService.currentUser;
    this.router.navigate(['/login']);
  }
}