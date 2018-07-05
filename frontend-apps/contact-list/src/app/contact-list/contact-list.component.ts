import { Component, OnInit } from '@angular/core';
import { ContactListService } from './contact-list.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [ContactListService]
})
export class ContactListComponent implements OnInit {

  private filterPanelOpened = false;

  private table: DataTable = {
    columns: [],
    rows: []
  };

  constructor(
    private contactListService: ContactListService
  ) { }

  ngOnInit() {
    this.getData();
  }

  private async getData(): Promise<any> {
    this.table.columns = await this.contactListService.initColumns();
    const contacts = await this.contactListService.getRecords();

    this.table.rows = this.contactListService.mapFields(contacts, this.table.columns);
    console.log(this.table.rows);
  }

}
