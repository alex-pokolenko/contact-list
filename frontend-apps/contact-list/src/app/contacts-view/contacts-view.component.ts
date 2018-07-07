import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactViewService } from './contacts-view.service';
import { TableMessagingService } from '../common/ui-components/data-table/table-messaging.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-contacts-view',
  templateUrl: './contacts-view.component.html',
  styleUrls: ['./contacts-view.component.scss'],
  providers: [ContactViewService]
})
export class ContactViewComponent implements OnInit, OnDestroy {

  private isAlive = true;

  private isFilterPanelOpen = false;
  private modalOptions = {
    isModalOpen: false,
    headerText: 'Contact'
  };

  constructor(
    private contactViewService: ContactViewService,
    private tableMessagingService: TableMessagingService
  ) {
    tableMessagingService.rowEditClicked$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        row => {
          this.editRecordModal(row);
        }
      );
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.isAlive = false;
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

  editRecordModal($event: any) {
    this.openModal();
  }
}
