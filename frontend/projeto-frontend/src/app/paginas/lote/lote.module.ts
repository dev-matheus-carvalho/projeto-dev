import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonDropdownModule, ButtonModule, InputDateModule, InputModule, MascaraDiretiveModule
} from '@decisaosistemas/angular-ds';
import { AdicionarLoteComponent } from './adicionar-lote/adicionar-lote.component';
import { ListarLoteComponent } from './listar-lote/listar-lote.component';
import { LoteComponent } from './lote.component';
import { LoteRoutingModule } from './lote-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoteComponent,
    AdicionarLoteComponent,
    ListarLoteComponent,
  ],
  imports: [
    CommonModule,
    LoteRoutingModule,
    ButtonModule,
    InputModule,
    ButtonDropdownModule,
    InputDateModule,
    RouterModule
  ],
  bootstrap: [LoteComponent],
})
export class LoteModule { }
