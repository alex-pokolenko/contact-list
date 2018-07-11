import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  private validitySubject = new Subject<boolean>();
  private formValueSubject = new Subject<any>();
  private formResetSubject = new Subject<void>();

  constructor() { }

  /**
   * Observable that will broadcast form validity
   *
   * @readonly
   * @type {Observable<boolean>}
   * @memberof ContactFormService
   */
  get formValidated$(): Observable<boolean> {
    return this.validitySubject.asObservable();
  }

  setValidity(isValid: boolean): void {
    this.validitySubject.next(isValid);
  }

  /**
   * Observable that will broadcast form value once form is submitted
   *
   * @readonly
   * @type {Observable<any>}
   * @memberof ContactFormService
   */
  get formValueSubmitted$(): Observable<any> {
    return this.formValueSubject.asObservable();
  }

  setFormValue(value?: any): void {
    this.formValueSubject.next(value);
  }

  /**
   * Observable that will broadcast a request to reset form
   *
   * @readonly
   * @type {Observable<void>}
   * @memberof ContactFormService
   */
  get formReset$(): Observable<void> {
    return this.formResetSubject.asObservable();
  }

  resetForm(): void {
    this.formResetSubject.next();
    this.setFormValue();
  }
}
