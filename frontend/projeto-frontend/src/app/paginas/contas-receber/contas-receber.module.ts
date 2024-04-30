import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContasReceberComponent } from './contas-receber.component';
import { ContasReceberRoutingModule } from './contas-receber-routing.module';
import { ListagemContasReceberComponent } from './listagem-contas-receber/listagem-contas-receber.component';
import { CardsContasReceberComponent } from './listagem-contas-receber/cards-contas-receber/cards-contas-receber.component';




@NgModule({
  declarations: [
    ContasReceberComponent,
    ListagemContasReceberComponent,
    CardsContasReceberComponent,

  ],
  imports: [

    CommonModule,
    ContasReceberRoutingModule,
  ],
  bootstrap: [ContasReceberModule],
})
export class ContasReceberModule { }
