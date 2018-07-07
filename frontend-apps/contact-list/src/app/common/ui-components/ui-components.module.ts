import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SldsIconComponent } from './slds-icon/slds-icon.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableRowComponent } from './data-table/data-table-row/data-table-row.component';
import { ModalComponent } from './modal/modal.component';
import { TableMessagingService } from './data-table/table-messaging.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SldsIconComponent,
    DataTableComponent,
    DataTableRowComponent,
    ModalComponent
  ],
  exports: [
    SldsIconComponent,
    DataTableComponent,
    DataTableRowComponent,
    ModalComponent
  ],
  providers: [
    TableMessagingService
  ]
})
export class UiComponentsModule { }
