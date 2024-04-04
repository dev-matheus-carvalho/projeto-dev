import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogadoLayoutComponent } from './logado-layout.component';
import { AuthService } from '../../shared/services/auth.service';
const routes: Routes = [
  {
    path: '',
    component: LogadoLayoutComponent,
    children: [
      {
        path: 'inicio',
        canActivate: [AuthService],
        loadChildren: () => import('../../paginas/inicio/inicio.module').then((m) => m.InicioModule),
      },
      {
        path: 'lote',
        canActivate: [AuthService],
        loadChildren: () => import('../../paginas/lote/lote.module').then((m) => m.LoteModule),
      },
    //   {
    //     path: 'contatos',
    //     canActivate: [AuthService],
    //     loadChildren: () => import('../../pages/contatos/contatos.module').then((m) => m.ContatosModule),
    //   },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogadoLayoutRoutingModule { }
