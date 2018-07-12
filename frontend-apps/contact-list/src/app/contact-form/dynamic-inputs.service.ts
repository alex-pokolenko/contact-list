import { Injectable } from '@angular/core';

import { InputBase } from './input-base';
import { StringInput } from './input-string';
import { ContactTableService } from '../contact-table/contact-table.service';
import { LookupInput } from './input-lookup';

@Injectable({
  providedIn: 'root'
})
export class DynamicInputsService {
  private fieldsetFields: any;
  private inputs: InputBase<any>[];

  constructor(private contactTableService: ContactTableService) { }

  /**
   * Get inputs for dynamic form
   *
   * @param {*} record data that will be used to prepopulate form fields
   * @returns {Promise<InputBase<any>[]>} promise resolved to array of dynamic form members
   * @memberof DynamicInputsService
   */
  async getInputs(record: any): Promise<InputBase<any>[]> {
    // if form inputs are already defined, return them right away
    if (!this.inputs) {
      // TODO: reduce unnecessary remoting call if columns are already retrieved as table definition
      this.fieldsetFields = await this.contactTableService.initColumns();
    }

    this.inputs = this.initFormFromFieldset(this.fieldsetFields, record);

    return this.inputs;
  }

  /**
   * Initializes form members from fieldset members
   *
   * @private
   * @param {any[]} fieldsetFields array of SFDC fieldSetMembers
   * @param {*} [record] data that will be used to prepopulate form fields
   * @returns {InputBase<any>[]} array of dynamic form members
   * @memberof DynamicInputsService
   */
  private initFormFromFieldset(fieldsetFields: any[], record?: any): InputBase<any>[] {
    const inputs: InputBase<any>[] = [];

    for (const field of fieldsetFields) {
      // populate Inputs for each fieldset field
      // set Input options according to fieldsetMember properties
        inputs.push(
          this.initInputFromFieldset(
            field,
            record && record[field.fieldPath]
          )
        );
      }

    // store record Id as a hidden input on form
    inputs.push(new StringInput({
      key: 'Id',
      type: 'hidden',
      required: false,
      value: record && record.Id
    }));

    // filter out undefined inputs
    return inputs.filter(input => input);
  }

  /**
   * Initialize form input from fieldset member definition
   *
   * @private
   * @param {*} field fieldsetMember
   * @param {*} [value] if defined, initial input value
   * @returns {InputBase<any>} dynamic form member
   * @memberof DynamicInputsService
   */
  private initInputFromFieldset(field: any, value?: any): InputBase<any> {
    let input: InputBase<any>;

    const genericOptions = {
      key: field.fieldPath,
      label: field.label,
      required: field.dbRequired || field.required
    };

    switch (field.type) {
      case 'string':
        input = new StringInput(Object.assign({}, genericOptions, {
          type: 'string',
          value
        }));
        break;
      case 'double':
      case 'integer':
        input = new StringInput(Object.assign({}, genericOptions, {
          type: 'number',
          value: value ? value.toString() : value
        }));
        break;
      case 'date':
        // TODO: use custom datepicker
        input = new StringInput(Object.assign({}, genericOptions, {
          type: 'date',
          value
        }));
        break;
      case 'reference':
        // init lookup
        input = new LookupInput(Object.assign({}, genericOptions, {
          type: 'reference',
          value
        }));
        break;
      case 'picklist':
        // TODO: populate select with picklist options
        break;
      default:
        break;
    }

    return input;
  }

}
