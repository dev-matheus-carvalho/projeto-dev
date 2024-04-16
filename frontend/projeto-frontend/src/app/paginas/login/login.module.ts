import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginLayoutComponent } from '../../layouts/login-layout/login-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule, ButtonModule, CheckboxModule } from '@decisaosistemas/angular-ds';
import { LoginLayoutRoutingModule } from '../../layouts/login-layout/login-layout-routing.module';
import { LoginComponent } from './login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    LoginLayoutRoutingModule,
    CommonModule,
    InputModule,
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
