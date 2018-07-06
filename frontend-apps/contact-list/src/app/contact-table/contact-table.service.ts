import { Injectable } from '@angular/core';
import { SfdcRemotingService } from '../core/sfdc-remoting/sfdc-remoting.service';

@Injectable()
export class ContactTableService {

  constructor(
    private sfdcService: SfdcRemotingService
  ) { }

  async initColumns(): Promise<any[]> {
    return await this.sfdcService.remoteRequest(
      'ContactListProvider',
      'initColumns'
    );
  }

  async getRecords(): Promise<any[]> {
    return await this.sfdcService.remoteRequest(
      'ContactListProvider',
      'getRecords'
    );
  }

  mapFields(contacts: any, columns: any): any {
    return contacts.map(contact => {
      const row = {
        id: contact.Id
      };
      for (const column of columns) {
        const path = column.fieldPath.split('.');
        row[column.fieldPath] = path.length === 2
          ? contact[path[0]][path[1]]
          : contact[path[0]];
      }
      return row;
    });
  }
}

