import { Injectable } from '@angular/core';

import { InputBase } from './input-base';
import { StringInput } from './input-string';

@Injectable({
  providedIn: 'root'
})
export class DynamicInputsService {
  // TODO: get fields from fieldset
  getInputs() {

    const inputs: InputBase<any>[] = [

      new StringInput({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new StringInput({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return inputs.sort((a, b) => a.order - b.order);
  }

  constructor() { }
}

