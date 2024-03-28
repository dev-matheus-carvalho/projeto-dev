import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule, InputModule } from '@decisaosistemas/angular-ds';
import { LoginLayoutModule } from './layouts/login-layout/login-layout.module';
import { LogadoLayoutComponent } from './layouts/logado-layout/logado-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    LogadoLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputModule,
    LoginLayoutModule,
    LoginLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
