import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule, InputModule, ButtonDropdownModule, InputDateModule, DividerModule, BadgeModule, SelectModule, InputSearchItem, CheckboxModule, IconModule } from '@decisaosistemas/angular-ds';
import { ListarLoteComponent } from '../listar-lote/listar-lote.component';
import { LoteRoutingModule } from '../lote-routing.module';
import { LoteComponent } from '../lote.component';
import { DuplicataComponent } from './components/duplicata/duplicata.component';
import { ChequeComponent } from './components/cheque/cheque.component';
import { NotaPromissoriaComponent } from './components/nota-promissoria/nota-promissoria.component';
import { AdicionarTituloComponent } from './adicionar-titulo.component';



@NgModule({
  declarations: [
    AdicionarTituloComponent,
    DuplicataComponent,
    ChequeComponent,
    NotaPromissoriaComponent,
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
    SelectModule,
    CheckboxModule,
    IconModule,
  ],
  exports: [
    AdicionarTituloComponent,
  ],
  bootstrap: [LoteComponent],
})
export class AdicionarTituloModule { }
