import { Injectable } from '@angular/core';
import { SfdcRemotingService } from '../core/sfdc-remoting/sfdc-remoting.service';
import { ContactTableService } from '../contact-table/contact-table.service';

const EDIT_FORM_ID = 'editForm';
const FILTER_FORM_ID = 'filterForm';

@Injectable()
export class ContactViewService {

  constructor(
    private sfdcService: SfdcRemotingService,
    private contactTableService: ContactTableService
  ) { }

  /**
   * Id to be used for record Edit form
   *
   * @readonly
   * @type {string}
   * @memberof ContactViewService
   */
  get editFormId(): string {
    return EDIT_FORM_ID;
  }

  /**
   * Id to be used for filter form
   *
   * @readonly
   * @type {string}
   * @memberof ContactViewService
   */
  get filterFormId(): string {
    return FILTER_FORM_ID;
  }

  /**
   * Handler for the form submit subscription
   *
   * @param {*} [form] submitted form value
   * @returns {Promise<any>}
   * @memberof ContactViewService
   */
  async processForm(form?: any): Promise<any> {
    let result: Promise<any>;

    if (!form) {
      result = await this.contactTableService.getRecords();
    } else if (form.id === FILTER_FORM_ID) {
      result = await this.contactTableService.getRecords(form.value);
    } else if (form.id === EDIT_FORM_ID) {
      result = await this.sfdcService.remoteRequest(
        'ContactListProvider',
        'saveRecord',
        form.value
      );
    }
  }

  async saveRecord(record: any): Promise<any> {
    return await this.sfdcService.remoteRequest(
      'ContactListProvider',
      'saveRecord',
      record
    );
  }

}
