import { Injectable } from '@angular/core';
import { SfdcRemotingService } from '../core/sfdc-remoting/sfdc-remoting.service';

@Injectable()
export class ContactListService {

  constructor(
    private sfdcService: SfdcRemotingService
  ) { }

  async initColumns(): Promise<any> {
    return await this.sfdcService.remoteRequest(
      'ContactListProvider',
      'initColumns',
      JSON.stringify({})
    );
  }
}
