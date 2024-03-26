import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule, InputModule } from '@decisaosistemas/angular-ds';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { LoginLayoutModule } from './layouts/login-layout/login-layout.module';
import { ToasterControllerComponent } from './shared/services/components/toaster-controller/toaster-controller/toaster-controller.component';

@NgModule({
  declarations: [
    AppComponent,
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
