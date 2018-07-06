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

  constructor(
    private contactListService: ContactListService
  ) { }

  ngOnInit() {

  }
}
