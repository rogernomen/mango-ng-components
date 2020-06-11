import {Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const TRICHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgcTriCheckboxComponent),
  multi: true
};

@Component({
  selector: 'ngc-tricheckbox',
  templateUrl: './ngc-tricheckbox.component.html',
  providers: [TRICHECKBOX_VALUE_ACCESSOR]
})
export class NgcTriCheckboxComponent implements ControlValueAccessor  {

  constructor(private cd: ChangeDetectorRef) {}

  @Input() disabled: boolean;

  @Input() name: string;

  @Input() tabindex: number;

  @Input() inputId: string;

  @Input() style: any;

  @Input() styleClass: string;

  @Input() label: string;

  @Output() change: EventEmitter<any> = new EventEmitter();

  focus: boolean;

  value: any;

  SPACE_KEY_CODE = 32;

  onModelChange: Function = () => {};

  onModelTouched: Function = () => {};

  onClick(event: Event, input: HTMLInputElement) {
    if (!this.disabled) {
      this.toggle(event);
      this.focus = true;
      input.focus();
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.keyCode === this.SPACE_KEY_CODE) {
      event.preventDefault();
    }
  }

  onKeyup(event: KeyboardEvent) {
    if (event.keyCode === this.SPACE_KEY_CODE) {
      this.toggle(event);
      event.preventDefault();
    }
  }

  toggle(event: Event) {
    if (this.value == null || this.value === undefined) {
      this.value = true;
    } else if (this.value === true) {
      this.value = false;
    } else if (this.value === false) {
      this.value = null;
    }

    this.onModelChange(this.value);
    this.change.emit({
      originalEvent: event,
      value: this.value
    });
  }

  onFocus() {
    this.focus = true;
  }

  onBlur() {
    this.focus = false;
    this.onModelTouched();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
    this.cd.markForCheck();
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
