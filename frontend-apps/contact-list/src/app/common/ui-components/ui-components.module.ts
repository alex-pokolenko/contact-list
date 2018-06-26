import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SldsIconComponent } from './slds-icon/slds-icon.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SldsIconComponent],
  exports: [
    SldsIconComponent
  ]
})
export class UiComponentsModule { }
