import { Injectable } from '@angular/core';

import { InputBase } from './input-base';
import { StringInput } from './input-string';
import { ContactTableService } from '../contact-table/contact-table.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicInputsService {
  inputs: InputBase<any>[];

  constructor(private contactTableService: ContactTableService) { }

  // TODO: get fields from fieldset
  async getInputs() {

    const columns = await this.contactTableService.initColumns();
    console.log(columns);

    this.inputs = [

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

    return this.inputs.sort((a, b) => a.order - b.order);
  }
}
