import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Breadcrumb } from '@decisaosistemas/angular-ds';
import { LoteComponent } from './lote.component';
import { AdicionarTituloComponent } from './adicionar-titulo/adicionar-titulo.component';



const routes: Routes = [
  {
    path: '',
    component: LoteComponent,
    data: {
      breadcrumb: new Breadcrumb('Cliente', 'Cliente'),
    },
    children: [
      {
        path: 'adicionar-titulos',
        component: AdicionarTituloComponent,
        data: {
          breadcrumb: new Breadcrumb('Adicionar Lote', 'Adicionar Lote'),
        },
      },
    ]
      }
    


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoteRoutingModule { }
