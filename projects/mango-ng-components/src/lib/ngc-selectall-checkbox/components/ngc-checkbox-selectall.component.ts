import { Component, OnInit, Input, forwardRef, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

export const CUSTOM_SELECTALL_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgcCheckboxSelectallComponent),
  multi: true
};

@Component({
  selector: 'ngc-checkbox-selectall',
  templateUrl: './ngc-checkbox-selectall.component.html',

  providers: [CUSTOM_SELECTALL_CHECKBOX_CONTROL_VALUE_ACCESSOR]
})
export class NgcCheckboxSelectallComponent implements OnInit, ControlValueAccessor {

  @Input() options: Array<any>;
  @Input() idSelectAllOption: string;
  @Input() selectAllName: string;
  @Input() selectAllValue: string;
  @Input() selectAllLabel: string;
  @Output() selectedOptions: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  selectedItems: Array<string> = [];
  selectedAll: Array<string> = [];
  isIndeterminate = false;
  checkedSelectAllOption = false;

  constructor(
    private el: ElementRef,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.selectAllLabel = this.selectAllLabel || 'Select All';
  }

  onSelectAll() {
    if ((this.isIndeterminate) || (this.selectedAll.length === 0))  {
      this.selectedItems = [];
      this.selectedAll = [];
    } else {
      this.selectedItems = this.options.map(item => item.value);
    }
    this.isIndeterminate = false;

    this.propagateChange(this.selectedItems);
    this.selectedOptions.emit(this.selectedItems);
  }

  onSelectOtherOption() {
    if (this.compareSelectedAndOptions()) {
      this.checkedSelectAllOption = true;
      this.isIndeterminate = false;
      this.selectedAll.push(this.selectAllValue);
    } else {
      this.checkedSelectAllOption = false;
      this.isIndeterminate = this.selectedItems.length > 0;
      this.selectedAll = [];
    }

    this.propagateChange(this.selectedItems);
    this.selectedOptions.emit(this.selectedItems);
  }

  private compareSelectedAndOptions() {
    const optionsValues: Array<string> = this.options.map(element => element.value);

    let cont = 0;
    this.selectedItems.forEach(item => {
      if (optionsValues.indexOf(item) !== -1) { cont++; }
    });

    return (cont === optionsValues.length);
  }

  writeValue(model: any) {

    if (model) {
      this.selectedItems = model;
      this.cd.markForCheck();
    }
  }

  propagateChange = (_p: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

}
