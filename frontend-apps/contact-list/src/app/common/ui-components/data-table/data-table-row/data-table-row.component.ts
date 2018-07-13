import { Component, OnInit, Input } from '@angular/core';
import { TableMessagingService } from '../table-messaging.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-data-table-row]',
  templateUrl: './data-table-row.component.html',
  styleUrls: ['./data-table-row.component.scss']
})
export class DataTableRowComponent implements OnInit {

  @Input() row: any;
  @Input() columns: any;

  constructor(private messagingService: TableMessagingService) {}

  ngOnInit() {

  }

  edit(row: any): void {
    // fire event
    this.messagingService.edit(row);
  }

  getReferenceValue(referenceField) {
    return referenceField ? referenceField['Name'] : '';
  }

}
