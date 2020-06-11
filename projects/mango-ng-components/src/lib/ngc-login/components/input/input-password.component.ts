import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const CUSTOM_PASSWORD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputPasswordComponent),
  multi: true
};

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  providers: [CUSTOM_PASSWORD_CONTROL_VALUE_ACCESSOR]
})
export class InputPasswordComponent implements ControlValueAccessor {

  @Input() placeholder: string;

  @Input() name: string;

  @Input() required: boolean;

  @Input() togglePasswordVisibility: boolean;

  type = 'password';
  value = '';

  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    this.value = value || '';
  }

  public pushChanges(value) {
    this.onChange(value);
    this.value = value;
  }

  public toggleVisibility() {
    if (this.value.length) {
      this.type = this.type === 'password' ? 'text' : 'password';
    }
  }

  registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
  registerOnTouched(fn: () => {}): void { this.onTouched = fn; }

}
