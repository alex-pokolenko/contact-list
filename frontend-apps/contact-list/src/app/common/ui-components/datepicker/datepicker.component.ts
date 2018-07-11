import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit, OnChanges {
  date: NgbDateStruct;
  // ------------------------
  inputDateVal: string;
  @Output() detectChanges = new EventEmitter<String>();
  @Output() inputDateChange = new EventEmitter<String>();
  @Input() get inputDate(): string {
    return this.inputDateVal;
  }
  set inputDate(val) {
    this.inputDateVal = val;
    this.inputDateChange.emit(this.inputDateVal);
    this.detectChanges.emit(this.inputDateVal);
    // console.log('REG EX:', /^\d{4}-\d{2}-\d{2}$/g.test(this.inputDateVal.trim()));
    if (this.inputDateVal) {
      this.date = this.parse(this.inputDateVal);
    }
  }
  // ------------------------
  constructor() {}
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {}
  private dateChanged(event: any) {
    this.inputDate = (event === null) ? null : event.year + '-' + event.month + '-' + event.day;
  }
  private parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('-');
      if (dateParts.length === 3 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2])) {
        return {
          year: this.toInteger(dateParts[0]),
          month: this.toInteger(dateParts[1]),
          day: this.toInteger(dateParts[2])
        };
      }
    }
    return null;
  }
  private toInteger(value: any):number {
    return parseInt(`${value}`, 10);
  }
  private isNumber(value: any):value is number {
    return !isNaN(this.toInteger(value));
  }
}
