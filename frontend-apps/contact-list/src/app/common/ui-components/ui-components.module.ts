import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SldsIconComponent } from './slds-icon/slds-icon.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableRowComponent } from './data-table/data-table-row/data-table-row.component';
import { ModalComponent } from './modal/modal.component';
import { DatepickerComponent } from './datepicker/datepicker.component';

import { TableMessagingService } from './data-table/table-messaging.service';
import { OrderModule } from 'ngx-order-pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';
import { UtilsModule } from './utils/utils.module';
import { LookupComponent } from './lookup/lookup.component';

@NgModule({
  imports: [
    CommonModule,
    OrderModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ClickOutsideModule,
    UtilsModule
  ],
  declarations: [
    SldsIconComponent,
    DataTableComponent,
    DataTableRowComponent,
    ModalComponent,
    DatepickerComponent,
    LookupComponent
  ],
  exports: [
    SldsIconComponent,
    DataTableComponent,
    DataTableRowComponent,
    ModalComponent,
    DatepickerComponent,
    LookupComponent
  ],
  providers: [
    TableMessagingService
  ]
})
export class UiComponentsModule { }
