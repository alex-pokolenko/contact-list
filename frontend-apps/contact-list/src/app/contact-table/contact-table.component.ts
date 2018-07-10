import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ContactTableService } from './contact-table.service';
import { DataTable } from '../common/ui-components/data-table/data-table';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss'],
  providers: []
})
export class ContactTableComponent implements OnInit {

  @Output() editRecord = new EventEmitter();

  table = new DataTable();

  constructor(
    private contactTableService: ContactTableService
  ) { }

  ngOnInit() {
    this.getData();
  }

  private async getData(): Promise<any> {
    this.table.columns = await this.contactTableService.initColumns();
    const contacts = await this.contactTableService.getRecords();

    this.table.rows = this.contactTableService.mapFields(contacts, this.table.columns);
    console.log(this.table.rows);
  }

}
