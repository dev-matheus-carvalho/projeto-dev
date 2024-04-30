import { RouterModule, Routes } from "@angular/router";
import { ContasReceberComponent } from "./contas-receber.component";
import { Breadcrumb } from "@decisaosistemas/angular-ds";
import { NgModule } from "@angular/core";





const routes: Routes = [
    {
      path: '',
      component: ContasReceberComponent,
      data: {
        breadcrumb: new Breadcrumb('Cliente', 'Cliente'),
      },
      children: [
        {
          path: 'adicionar-titulos',
          component: ContasReceberComponent,
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
  export class ContasReceberRoutingModule { }