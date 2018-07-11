import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SldsIconComponent } from './slds-icon/slds-icon.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableRowComponent } from './data-table/data-table-row/data-table-row.component';
import { ModalComponent } from './modal/modal.component';
import { TableMessagingService } from './data-table/table-messaging.service';
import { OrderModule } from 'ngx-order-pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    OrderModule,
    NgbModule
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
