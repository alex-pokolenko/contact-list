import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

@Injectable()
export class TableMessagingService {
  private rowSubject = new Subject<any>();

  constructor() { }

  get rowEditClicked$(): Observable<any> {
    return this.rowSubject.asObservable();
  }

  edit(row: any): void {
    this.rowSubject.next(row);
  }

}
