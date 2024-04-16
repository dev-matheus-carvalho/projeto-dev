import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule, InputModule, ButtonDropdownModule, InputDateModule, DividerModule, BadgeModule, SelectModule } from '@decisaosistemas/angular-ds';
import { LoteRoutingModule } from '../lote-routing.module';
import { LoteComponent } from '../lote.component';
import { ListarLoteComponent } from './listar-lote.component';



@NgModule({
  declarations: [
    ListarLoteComponent,
  ],
  imports: [
    CommonModule,
    LoteRoutingModule,
    ButtonModule,
    InputModule,
    ButtonDropdownModule,
    InputDateModule,
    RouterModule,
    DividerModule,
    BadgeModule,
    SelectModule
  ],
  exports: [
    ListarLoteComponent,
  ],
  bootstrap: [LoteComponent],
})
export class ListarLoteModule { }
