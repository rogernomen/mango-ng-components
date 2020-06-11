import { Component, Input, forwardRef, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import _ from 'lodash';

export const CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgcCheckboxComponent),
  multi: true
};

@Component({
  selector: 'ngc-checkbox',
  templateUrl: './ngc-checkbox.component.html',
  providers: [CUSTOM_CHECKBOX_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./ngc-checkbox.component.scss']
})
export class NgcCheckboxComponent implements ControlValueAccessor {

  @Input() name: string;
  @Input() value: any;
  @Input() label: string;
  @Input() disabled = false;
  @Input() checked = false;
  @Input() id: string;
  @Input() indeterminate = false;
  @Input() inline: boolean;
  @Output() selectEmitter: EventEmitter<any> = new EventEmitter<any>();

  selectedItems: Array<any> = [];

  constructor(
    private el: ElementRef,
    private cd: ChangeDetectorRef) { }

  setSelected(event: any): void {
    const element = event.target;
    this.checked = element.checked;
    this.updateModel(element.value);
    this.selectEmitter.emit(element);
  }

  private updateModel(value) {
    if (this.checked) {
      this.selectedItems.push(value);
    } else {
      _.remove(this.selectedItems, (val) => {
        return val === value;
      });
    }
    this.propagateChange(this.selectedItems);
  }

  writeValue(model: any) {
    if (model) {
      this.selectedItems = model;
      this.cd.markForCheck();
      if (_.indexOf(this.selectedItems, this.value) !== -1) {
        this.checked = true;
        this.el.nativeElement.querySelector('input').checked = true;
      } else {
        this.el.nativeElement.querySelector('input').checked = false;
        this.checked = false;
      }
    }
  }

  propagateChange = (_p: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

}
