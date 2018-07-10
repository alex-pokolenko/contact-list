import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InputBase } from './input-base';

@Injectable()
export class InputControlService {
  constructor() { }

  toFormGroup(inputs: InputBase<any>[], bypassRequired = false) {
    const group: any = {};

    inputs.forEach(input => {
      group[input.key] = !bypassRequired && input.required
        ? new FormControl(input.value || '', Validators.required) // add validator
        : new FormControl(input.value || '');
    });

    return new FormGroup(group);
  }
}