import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SldsIconComponent } from './slds-icon/slds-icon.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableRowComponent } from './data-table/data-table-row/data-table-row.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SldsIconComponent, DataTableComponent, DataTableRowComponent],
  exports: [
    SldsIconComponent,
    DataTableComponent,
    DataTableRowComponent
  ]
})
export class UiComponentsModule { }
