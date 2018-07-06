import { Component, OnInit } from '@angular/core';
import { ContactViewService } from './contacts-view.service';

@Component({
  selector: 'app-contacts-view',
  templateUrl: './contacts-view.component.html',
  styleUrls: ['./contacts-view.component.scss'],
  providers: [ContactViewService]
})
export class ContactViewComponent implements OnInit {

  private isFilterPanelOpen = false;
  private modalOptions = {
    isModalOpen: false,
    headerText: 'Contact'
  }
  // private isModalOpen = false;

  constructor(
    private contactViewService: ContactViewService
  ) { }

  ngOnInit() {

  }

  /**
   * Opens modal dialog
   *
   * @memberof ContactViewComponent
   */
  openModal(): void {
    this.modalOptions.headerText = 'New Contact';
    this.modalOptions.isModalOpen = true;
  }

  /**
   * Handler for modal close event
   *
   * @param {*} $event modal response (action result)
   * @memberof ContactViewComponent
   */
  onClose($event: any) {
    this.modalOptions.isModalOpen = false;
  }
}
