import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { UtilsModule } from '../utils/utils.module';
import { SfdcRemotingService } from '../../../core/sfdc-remoting/sfdc-remoting.service';

import * as isEqual from 'lodash.isEqual';

export const LOOKUP_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LookupComponent),
  multi: true
};

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
  providers: [LOOKUP_VALUE_ACCESSOR]
})
export class LookupComponent implements OnInit, OnChanges, ControlValueAccessor {

  // placeholder to show for blank input
  @Input() placeholder = 'Search...';
  // SFDC object to search
  @Input() objectName: string;
  // SFDC object field name that holds label to show

  private _lookupField: string;
  @Input() set lookupField(value: string) {
    this._lookupField = value;
  }
  get lookupField(): string {
    return this._lookupField;
  }

  // initially selected value
  @Input() selection: any;
  @Input() hiddenValues: any;
  // custom remote class and function
  // default value for class: MeetingBlockService
  // default value for function: lookupFilter
  @Input() remoteClass: string;
  @Input() remoteFunction: string;

  // callback with selected value
  @Output() selectionChange = new EventEmitter<String>();
  @Output() onChange = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  inputValue: string = null;
  // values returned from salesforce
  suggestions = [];

  // variables to control lookup state
  isOpen: boolean = false;
  isSelected: boolean = false;
  focusedSugestion:number = -1;

  // generate unique Ids for DOM elements
  comboboxId: string = UtilsModule.getUniqueId('lookup-input');
  listboxId: string = UtilsModule.getUniqueId('listbox');
  listboxOptionId: string = UtilsModule.getUniqueId('listbox-option');

  // suggestion that was selected (by click or Enter).
  // selection: any = null;

  writeValue(obj: any): void {
    this.inputValue = this.resolveLabel(obj) || obj;
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  onInputChange($event: any): void {
    this.lookup($event);
  }

  isHidden(option: any): boolean {
    return typeof(this.hiddenValues) !== 'undefined' && this.hiddenValues.includes(option.id);
  }

  // simulate SFDC response
  mockupFilter = (query: string): Promise<any> => {
    let params = {
      searchString: query,
      searchObject: this.objectName
    }
    return this.sfdcService.remoteRequest(this.remoteClass, this.remoteFunction, params);
  }

  lookup(query: string): void {
    // TODO: mock call, replace with SFDCService
    this.mockupFilter(query).then(result => {
      this.suggestions = result.data;
      this.isOpen = this.suggestions && this.suggestions.length > 0;
    });
  }

  resolveLabel(value: any): any {
    /* if lookup field name is specified and suggestion type is object - get corresponding field
     * if suggestion is string - just return it
    **/
    return this._lookupField && typeof value !== 'string' ? value[this._lookupField] : value;
  }

  constructor(private sfdcService: SfdcRemotingService) { }

  ngOnInit() {
    if (this.selection != null && this.selection[this._lookupField]) {
      this.inputValue = this.resolveLabel(this.selection);
      this.selection = this.selection;
      this.isSelected = this.selection != null;
    }
    // define default remote function if custom is empty
    if (this.remoteClass == null || this.remoteFunction == null) {
      this.remoteClass = 'ContactListProvider';
      this.remoteFunction = 'lookupFilter';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selection && !changes.selection.firstChange && changes.selection.currentValue
      && !isEqual(changes.selection.currentValue, changes.selection.previousValue)
      && changes.selection.currentValue[this._lookupField]) {
      this.changeSelection(changes.selection.currentValue);
    }
  }

  toggle(): void {
    if (!this.isSelected) {
      this.isOpen = !this.isOpen && this.inputValue != null;
      this.clearFocus();
    }
  }

  close(): void {
    this.isOpen = false;
    this.clearFocus();
  }

  clearFocus() {
    this.focusedSugestion = -1;
  }

  changeSelection(suggestion: any, $event?: any): void {
    if ($event) {
      $event.stopPropagation();
    }

    this.inputValue = this.resolveLabel(suggestion);
    this.selection = suggestion;
    this.isSelected = suggestion != null;
    this.close();

    this.selectionChange.emit(this.selection);
    this.triggerChange(this.selection);
  }

  clearSelection(): void {
    this.triggerRemove(this.selection);
    this.inputValue = null;
    this.selection = null;
    this.isSelected = false;
  }

  keyEventsHandler($event: KeyboardEvent): void {
    $event.stopPropagation();
    switch ($event.code) {
      case 'ArrowDown':
        if (this.focusedSugestion < this.suggestions.length - 1) {
          this.focusedSugestion++;
        }
        break;
      case 'ArrowUp':
        if (this.focusedSugestion > -1) {
          this.focusedSugestion--;
        }
        break;
       case 'Enter':
         if (this.focusedSugestion > -1) {
           console.log($event);
           // view doesn't change - use temporary workaround with timeout
           setTimeout (() => {
              this.changeSelection(this.suggestions[this.focusedSugestion]);
            }, 0)
         }
         break;
       case 'Escape':
         this.close();
         break;
      default:
        break;
    }
  }

  triggerChange(item: any) {
    this.onChange.emit(item);
  }

  triggerRemove(item: any) {
    this.onRemove.emit(item);
  }
}
