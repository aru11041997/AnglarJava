import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IRegister } from './register';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService:RegisterService) { }

  register:IRegister={
    username:null,
    password:null,
    role:null
  }

  pageTitle:string="Register";

  ngOnInit(): void {
  }

  onSubmit(registerForm:NgForm){
    if(registerForm.valid){
      console.log(this.register);
      this.registerService.addUser(this.register).subscribe((result) => {
        result => console.log(result)
      });
    }
  }

}
