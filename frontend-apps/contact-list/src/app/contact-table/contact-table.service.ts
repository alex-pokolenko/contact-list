import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { SfdcRemotingService } from '../core/sfdc-remoting/sfdc-remoting.service';
import { DataTable } from '../common/ui-components/data-table/data-table';


@Injectable({
  providedIn: 'root'
})
export class ContactTableService {

  public columns: any;
  private table = new DataTable();

  private tableSubject = new Subject<DataTable>();

  constructor(
    private sfdcService: SfdcRemotingService
  ) { }

  async initColumns(): Promise<any[]> {
    // if columns are already defined, return them right away
    if (!this.columns) {
      this.columns = await this.sfdcService.remoteRequest(
        'ContactListProvider',
        'initColumns'
      );
    }

    return this.columns;
  }

  get tableDataChanged$(): Observable<DataTable> {
    return this.tableSubject.asObservable();
  }

  async getRecords(filter?: any): Promise<any> {
    const columns = await this.initColumns();
    const contacts = await this.sfdcService.remoteRequest(
      'ContactListProvider',
      'getRecords',
      filter
    );

    this.table = new DataTable(
      columns,
      this.mapFields(contacts, columns)
    );

    this.tableSubject.next(this.table);
  }

  mapFields(contacts: any, columns: any): any {
    return contacts.map(contact => {
      const row = {
        Id: contact.Id
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

