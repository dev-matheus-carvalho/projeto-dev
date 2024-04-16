import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule, ButtonModule, CheckboxModule } from '@decisaosistemas/angular-ds';
import { LoginLayoutRoutingModule } from '../../layouts/login-layout/login-layout-routing.module';
import { LoginLayoutComponent } from '../../layouts/login-layout/login-layout.component';
import { CriarContaComponent } from './criar-conta.component';



@NgModule({
  declarations: [
  CriarContaComponent
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
    CriarContaComponent,
  ]
})
export class CriarContaModule { }
