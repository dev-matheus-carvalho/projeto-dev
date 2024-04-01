import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogadoLayoutRoutingModule } from './logado-layout-routing.module';
import { LogadoLayoutComponent } from './logado-layout.component';
import { SideNavModule } from '@decisaosistemas/angular-ds';
import { InicioModule } from '../../paginas/inicio/inicio.module';
import { CabecalhoModule } from '../../shared/components/cabecalho/cabecalho.module';



@NgModule({
  declarations: [
    LogadoLayoutComponent,
  ],
  imports: [
    CommonModule,
    CabecalhoModule,
    LogadoLayoutRoutingModule,
    SideNavModule,
    InicioModule,
  ]
})
export class LogadoLayoutModule { }