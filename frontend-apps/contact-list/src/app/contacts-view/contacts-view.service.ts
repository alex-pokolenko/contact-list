import { Injectable } from '@angular/core';
import { SfdcRemotingService } from '../core/sfdc-remoting/sfdc-remoting.service';

@Injectable()
export class ContactViewService {

  constructor(
    private sfdcService: SfdcRemotingService
  ) { }

  async saveRecord(record: any): Promise<any[]> {
    return await this.sfdcService.remoteRequest(
      'ContactListProvider',
      'saveRecord'
    );
  }

}
