import { Component, OnInit } from '@angular/core';
import { ContactViewService } from './contacts-view.service';

@Component({
  selector: 'app-contacts-view',
  templateUrl: './contacts-view.component.html',
  styleUrls: ['./contacts-view.component.scss'],
  providers: [ContactViewService]
})
export class ContactViewComponent implements OnInit {

  private filterPanelOpened = false;

  constructor(
    private contactViewService: ContactViewService
  ) { }

  ngOnInit() {

  }
}
