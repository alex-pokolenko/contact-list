import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';

import { InputBase } from './input-base';
import { InputControlService } from './input-control.service';
import { ContactFormService } from './contact-form.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  providers: [ InputControlService ]
})
export class ContactFormComponent implements OnInit, OnDestroy {

  @Input() inputs: InputBase<any>[] = [];
  @Input() formId: string;
  @Input() bypassRequired: boolean;

  isAlive = true;

  form: FormGroup;

  constructor(
    private inputControlService: InputControlService,
    private formService: ContactFormService
  ) {
    formService.formReset$
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(() => this.form.reset());
  }

  ngOnInit() {
    this.form = this.inputControlService.toFormGroup(this.inputs, this.bypassRequired);

    // emit form validity. This will allow to maintain submit button outside of form component
    this.formService.setValidity(this.form.valid);

    // subscribe to form changes and emit form validity
    this.form.valueChanges.subscribe(
      () => {
        this.formService.setValidity(this.form.valid);
      }
    );
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  /**
   * Broadcast submitted value to Observers
   *
   * @memberof ContactFormComponent
   */
  onSubmit() {
    // broadcast form value to outer components
    this.formService.setFormValue({
      id: this.formId,
      value: this.form.value
    });
  }
}
