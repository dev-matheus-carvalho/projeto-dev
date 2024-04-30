import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDefaultComponent } from './modal-default.component';
import { ButtonDropdownModule, ButtonModule } from '@decisaosistemas/angular-ds';



@NgModule({
  declarations: [
    ModalDefaultComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ButtonDropdownModule,
  ],
})
export class ModalDefaultModule { }
