import { NgModule } from '@angular/core';
import { LoginLayoutComponent } from './login-layout.component';
import { LoginLayoutRoutingModule } from './login-layout-routing.module';
import { CriarContaModule } from '../../paginas/criar-conta/criar-conta.module';
import { LoginModule } from '../../paginas/login/login.module';

@NgModule({
  declarations: [
    LoginLayoutComponent,
  ],
  imports: [
    LoginModule,
    CriarContaModule,
    LoginLayoutRoutingModule,
  ]
})
export class LoginLayoutModule { }
