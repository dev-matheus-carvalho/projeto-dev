import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from '@decisaosistemas/angular-ds';
//import { NgbModalModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
//import { ModalEditarPerfilModule } from '../../modals/modal-editar-perfil/modal-editar-perfil.module';
import { CabecalhoComponent } from './cabecalho.component';



@NgModule({
  declarations: [
    CabecalhoComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
  ],
  exports: [
    CabecalhoComponent
  ]
})
export class CabecalhoModule { }
