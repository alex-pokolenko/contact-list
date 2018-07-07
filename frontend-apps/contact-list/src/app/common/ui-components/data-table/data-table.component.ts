import { Component, OnInit, Input } from '@angular/core';
import { TableMessagingService } from './table-messaging.service';
import { DataTable } from './data-table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {

  @Input() table: DataTable;

  constructor() { }

  ngOnInit() {
  }

}
