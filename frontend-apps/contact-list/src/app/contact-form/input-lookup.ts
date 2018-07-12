import { InputBase } from './input-base';

export class LookupInput extends InputBase<string> {
  controlType = 'lookup';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}