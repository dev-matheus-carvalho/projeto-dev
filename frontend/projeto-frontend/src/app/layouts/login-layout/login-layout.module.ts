import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginLayoutComponent } from './login-layout.component';
import { LoginComponent } from './login/login.component';
import { CriarContaComponent } from './criar-conta/criar-conta.component';
import { ButtonModule, CheckboxModule, InputModule } from '@decisaosistemas/angular-ds';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginLayoutRoutingModule } from './login-layout-routing.module';

@NgModule({
  declarations: [
    LoginLayoutComponent,
    LoginComponent,
    CriarContaComponent
  ],
  imports: [
    LoginLayoutRoutingModule,
    CommonModule,
    InputModule,
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
  ]
})
export class LoginLayoutModule { }
