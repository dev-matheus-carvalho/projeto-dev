import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginLayoutModule } from './layouts/login-layout/login-layout.module';
import { HttpClientModule } from '@angular/common/http';
import { LogadoLayoutModule } from './layouts/logado-layout/logado-layout.module';
import { ToasterControllerModule } from './shared/components/toaster-controller/toaster-controller.module';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { MovimentacaoTitulosComponent } from './paginas/contas-receber/movimentacao-titulos/movimentacao-titulos.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    MovimentacaoTitulosComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginLayoutModule,
    LogadoLayoutModule,
    ToasterControllerModule,
    RouterModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
