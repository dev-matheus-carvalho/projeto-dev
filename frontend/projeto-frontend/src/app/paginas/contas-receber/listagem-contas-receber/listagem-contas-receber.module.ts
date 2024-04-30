import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemContasReceberComponent } from './listagem-contas-receber.component';
import { CardsContasReceberComponent } from './cards-contas-receber/cards-contas-receber.component';
import { BadgeModule, ButtonDropdownModule, ButtonModule, DividerModule, InputDateModule, InputModule, SelectModule } from '@decisaosistemas/angular-ds';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListagemContasReceberComponent,
    CardsContasReceberComponent,

  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputModule,
    ButtonDropdownModule,
    InputDateModule,
    RouterModule,
    DividerModule,
    BadgeModule,
    SelectModule
  ]
})
export class ListagemContasReceberModule { }
