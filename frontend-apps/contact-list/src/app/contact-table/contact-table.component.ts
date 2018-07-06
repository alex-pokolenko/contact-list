import { Component, OnInit } from '@angular/core';
import { ContactTableService } from './contact-table.service';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss'],
  providers: [ContactTableService]
})
export class ContactTableComponent implements OnInit {

  private table: DataTable = {
    columns: [],
    rows: []
  };

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

