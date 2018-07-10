import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InputBase } from './input-base';
import { InputControlService } from './input-control.service';
import { ContactFormService } from './contact-form.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  providers: [ InputControlService ]
})
export class ContactFormComponent implements OnInit {

  @Input() inputs: InputBase<any>[] = [];

  form: FormGroup;

  constructor(
    private inputControlService: InputControlService,
    private formService: ContactFormService
  ) {  }

  ngOnInit() {
    this.form = this.inputControlService.toFormGroup(this.inputs);

    // emit form validity. This will allow to maintain submit button outside of form component
    this.formService.setValidity(this.form.valid);

    // subscribe to form changes and emit form validity
    this.form.valueChanges.subscribe(
      () => {
        this.formService.setValidity(this.form.valid);
      }
    );
  }

  onSubmit() {
    // broadcast form value to outer components
    this.formService.setFormValue(this.form.value);
  }
}
