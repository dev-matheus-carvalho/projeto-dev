import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from '@decisaosistemas/angular-ds';
import { NgbModalModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CabecalhoComponent } from './cabecalho.component';


@NgModule({
  declarations: [
    CabecalhoComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    NgbPopoverModule,
  ],
  exports: [
    CabecalhoComponent
  ]
})
export class CabecalhoModule { }
