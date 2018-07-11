import { Component, OnInit, OnDestroy } from '@angular/core';

import { ContactViewService } from './contacts-view.service';
import { TableMessagingService } from '../common/ui-components/data-table/table-messaging.service';
import { takeWhile } from 'rxjs/operators';
import { DynamicInputsService } from '../contact-form/dynamic-inputs.service';
import { ContactTableService } from '../contact-table/contact-table.service';
import { ContactFormService } from '../contact-form/contact-form.service';

@Component({
  selector: 'app-contacts-view',
  templateUrl: './contacts-view.component.html',
  styleUrls: ['./contacts-view.component.scss'],
  providers: [
    ContactViewService,
    DynamicInputsService,
    ContactFormService,
    ContactTableService
  ]
})
export class ContactViewComponent implements OnInit, OnDestroy {

  private isAlive = true;

  isFilterPanelOpen = false;
  submitValid = false;
  modalOptions = {
    isModalOpen: false,
    headerText: 'Contact',
    submitValid: false
  };

  modalInputs: any[];
  filterInputs: any[];

  constructor(
    private contactViewService: ContactViewService,
    private tableMessagingService: TableMessagingService,
    private inputsService: DynamicInputsService,
    private formService: ContactFormService
  ) {
    tableMessagingService.rowEditClicked$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        row => {
          this.editRecordModal(row);
        }
      );

    this.subscribeToForm();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // kill all the subscribtions
    this.isAlive = false;
  }

  /**
   * Subscribe to form events
   *
   * @memberof ContactViewComponent
   */
  subscribeToForm(): void {
    // listen to form state
    this.formService.formValidated$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        isValid => {
          // timeout is a workaround to update binding properly
          setTimeout (() => {
            this.submitValid = isValid;
         }, 0);
        }
      );

    // listen to form value
    this.formService.formValueSubmitted$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(
        form => {
          this.contactViewService.processForm(form);
        }
      );
  }

  /**
   * Id to be used for record Edit form
   *
   * @readonly
   * @type {string}
   * @memberof ContactViewService
   */
  get editFormId(): string {
    return this.contactViewService.editFormId;
  }

  /**
   * Id to be used for filter form
   *
   * @readonly
   * @type {string}
   * @memberof ContactViewService
   */
  get filterFormId(): string {
    return this.contactViewService.filterFormId;
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

  /**
   * Instantiate record modal
   *
   * @param {*} [record] record to edit. If not defined, will fallback to new record creation
   * @memberof ContactViewComponent
   */
  editRecordModal(record?: any) {
    this.inputsService.getInputs(record).then(inputs => {
      this.modalInputs = inputs;
      this.openModal();
    });
  }

  /**
   * Initialize filter panel
   *
   * @memberof ContactViewComponent
   */
  openFilterPanel() {
    if (!this.filterInputs) {
      this.inputsService.getInputs(undefined).then(inputs => {
        this.filterInputs = inputs;
        this.isFilterPanelOpen = !this.isFilterPanelOpen;
      });
    } else {
      this.isFilterPanelOpen = !this.isFilterPanelOpen;
    }
  }

  /**
   * Reset filter form
   *
   * @memberof ContactViewComponent
   */
  resetFilter(): void {
    this.formService.resetForm();
  }
}
