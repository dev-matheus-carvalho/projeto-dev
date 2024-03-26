import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterModule, ToasterService } from '@decisaosistemas/angular-ds';
import { ToasterControllerComponent } from './toaster-controller.component';


@NgModule({
  declarations: [
    ToasterControllerComponent
  ],
  imports: [
    CommonModule,
    ToasterModule,
  ],
  providers: [
    ToasterService
  ],
  exports: [ToasterControllerComponent]
})
export class ToasterControllerModule { }
