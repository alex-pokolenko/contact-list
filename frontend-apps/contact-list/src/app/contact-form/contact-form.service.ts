import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  private subject = new Subject<any>();

  constructor() { }

  get formValidated$(): Observable<any> {
    return this.subject.asObservable();
  }

  setValidity(row: any): void {
    this.subject.next(row);
  }
}
