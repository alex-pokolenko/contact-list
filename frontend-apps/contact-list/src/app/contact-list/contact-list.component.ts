import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  private filterPanelOpened = false;

  private table: DataTable = {
    columns: [
      { apiName: 'name', label: 'Name' },
      { apiName: 'gender', label: 'Gender' },
      { apiName: 'company', label: 'Company' }
    ],
    rows: [
      { name: 'Austin', gender: 'Male', company: 'Swimlane' },
      { name: 'Dany', gender: 'Male', company: 'KFC' },
      { name: 'Molly', gender: 'Female', company: 'Burger King' },
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
