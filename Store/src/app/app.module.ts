import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { AddbookComponent } from './book/addbook.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth/auth.service';
import { NavComponent } from './nav/nav.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthRoleGuard } from './auth/auth.role.guard';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    AddbookComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path:'login', component: LoginComponent},
      { path:'home', component: BookComponent, canActivate:[AuthGuard]},
      { path:'register', component: RegisterComponent},
      { path:'addbook', component: AddbookComponent, canActivate:[AuthGuard,AuthRoleGuard]},
      { path: '', redirectTo:'login',pathMatch:'full'},
      { path: '**', redirectTo:'welcome',pathMatch:'full'},
    ]),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
