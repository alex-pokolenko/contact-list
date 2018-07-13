import { InputBase } from './input-base';

export class DateInput extends InputBase<string> {
  controlType = 'datePicker';
  type: string;
  min: string;
  max: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.min = options['min'] || '';
    this.max = options['max'] || '';
  }
}
