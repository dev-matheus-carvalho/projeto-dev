import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, ButtonDropdownModule } from '@decisaosistemas/angular-ds';
import { CardsContasReceberComponent } from './cards-contas-receber.component';



@NgModule({
  declarations: [
    CardsContasReceberComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ButtonDropdownModule,
  ]
})
export class CardsContasReceberModule { }
