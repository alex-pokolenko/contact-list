import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { ContactTableService } from './contact-table.service';
import { DataTable } from '../common/ui-components/data-table/data-table';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss'],
  providers: []
})
export class ContactTableComponent implements OnInit, OnDestroy {

  @Output() editRecord = new EventEmitter();

  private isAlive = true;

  table = new DataTable();

  constructor(
    private contactTableService: ContactTableService
  ) {
    this.subscribeToTableData();
  }

  ngOnInit() {
    // request records from server. Result will be broadcasted by tableDataChanged$
    this.contactTableService.getRecords();
  }

  ngOnDestroy() {
    // kill all the subscribtions
    this.isAlive = false;
  }

  /**
   * Subscribe to changes in table data
   *
   * @memberof ContactTableComponent
   */
  subscribeToTableData(): void {
    this.contactTableService.tableDataChanged$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        table => this.table = table
      );
    }

}
