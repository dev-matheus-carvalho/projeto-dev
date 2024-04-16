import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoteComponent } from './lote.component';
import { LoteRoutingModule } from './lote-routing.module';
import { ListarLoteModule } from './listar-lote/listar-lote.module';
import { AdicionarTituloModule } from './adicionar-titulo/adicionar-titulo.module';



@NgModule({
  declarations: [
    LoteComponent,
  ],
  imports: [
    CommonModule,
    AdicionarTituloModule,
    ListarLoteModule,
    LoteRoutingModule,
  ],
  bootstrap: [LoteComponent],
})
export class LoteModule { }
