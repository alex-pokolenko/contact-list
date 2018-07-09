import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InputBase } from './input-base';
import { InputControlService } from './input-control.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  providers: [ InputControlService ]
})
export class ContactFormComponent implements OnInit {

  @Input() inputs: InputBase<any>[] = [];

  form: FormGroup;
  payLoad = '';

  constructor(private qcs: InputControlService) {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.inputs);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
