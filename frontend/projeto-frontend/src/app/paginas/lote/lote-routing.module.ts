import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Breadcrumb } from '@decisaosistemas/angular-ds';
import { LoteComponent } from './lote.component';
import { AdicionarLoteComponent } from './adicionar-lote/adicionar-lote.component';


const routes: Routes = [
  {
    path: '',
    component: LoteComponent,
    data: {
      breadcrumb: new Breadcrumb('Cliente', 'Cliente'),
    },
    children: [
      {
        path: 'adicionar-lote',
        component: AdicionarLoteComponent,
        data: {
          breadcrumb: new Breadcrumb('Adicionar Lote', 'Adicionar Lote'),
        },
      },
    ]
    //   {
    //     path: 'editar-cliente',
    //     component: EditarClienteComponent,
    //     data: {
    //       breadcrumb: new Breadcrumb('Editar cliente', 'Editar cliente'),
    //     },
    //     children: [
    //       {
    //         path: ':idCliente',
    //         children: [
    //           {
    //             path: 'dadoscadastrais',
    //             component: DadoscadastraisComponent
    //           },
    //           {
    //             path: 'localizacao',
    //             component: LocalizacaoComponent
    //           },
    //           {
    //             path: 'representantes',
    //             loadChildren: () => import('../cliente/editar-cliente/representantes/representantes.module').then((m) => m.RepresentantesModule),
    //           }
    //         ]
    //       }
    //     ]
      }
    


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoteRoutingModule { }
