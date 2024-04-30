import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemTitulosComponent } from './listagem-titulos.component';
import { BadgeModule, ButtonDropdownModule, CheckboxModule, DividerModule, IconModule, InputDateModule, InputModule, SelectModule } from '@decisaosistemas/angular-ds';
import { RouterModule } from '@angular/router';
import { CardTitulosComponent } from './card-titulos/card-titulos.component';



@NgModule({
  declarations: [ListagemTitulosComponent, CardTitulosComponent],
  imports: [
    CommonModule, 
    IconModule,
    InputModule,
    ButtonDropdownModule,
    InputDateModule,
    RouterModule,
    DividerModule,
    BadgeModule,
    SelectModule,
    CheckboxModule,
    IconModule,],
  exports: [ListagemTitulosComponent],
})
export class ListagemTitulosModule { }
