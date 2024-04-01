import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule, InputModule } from '@decisaosistemas/angular-ds';
import { LoginLayoutModule } from './layouts/login-layout/login-layout.module';
import { LogadoLayoutComponent } from './layouts/logado-layout/logado-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { LogadoLayoutModule } from './layouts/logado-layout/logado-layout.module';
import { ToasterControllerModule } from './shared/components/toaster-controller/toaster-controller.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginLayoutModule,
    LogadoLayoutModule,
    ToasterControllerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
