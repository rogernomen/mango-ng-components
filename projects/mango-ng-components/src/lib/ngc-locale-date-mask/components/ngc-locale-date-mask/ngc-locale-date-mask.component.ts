import { Component, OnInit, forwardRef, Input} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextMaskConfig } from '../../../ngc-text-mask/directives/ngc-masked-input.directive';
import * as momentImported from 'moment'; const moment = momentImported;

@Component({
  selector: 'ngc-locale-date-mask',
  templateUrl: './ngc-locale-date-mask.component.html',
  styleUrls: ['./ngc-locale-date-mask.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgcLocaleDateMaskComponent),
    multi: true
  }]
})
export class NgcLocaleDateMaskComponent implements OnInit {
  @Input() language: string;
  @Input() hasError: boolean;
  @Input() editionDisabled: boolean;

  inputOutputFormat = 'YYYY-MM-DD';
  value: string;
  placeHolder: string;
  textMaskConfig: TextMaskConfig = {
    mask: [],
    guide: true,
    placeholderChar: '_',
    pipe: undefined,
    keepCharPositions: false,
  };

  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor() { }

  ngOnInit() {
    this.configureComponent();
  }

  configureComponent() {
    this.textMaskConfig.placeholderChar = ' ';
    this.textMaskConfig.keepCharPositions = true;

    switch (this.language) {
      case 'es-ES': {
        moment.locale('es-ES');
        this.placeHolder = moment.localeData().longDateFormat('L'); // 'DD/MM/YYYY'
        this.textMaskConfig.mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
        break;
      }
      case 'ru-RU': {
        moment.locale('ru-RU');
        this.placeHolder = moment.localeData().longDateFormat('L'); // 'DD.MM.YYYY'
        this.textMaskConfig.mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
        break;
      }
      case 'en-US':
      default: {
        moment.locale('en-US');
        this.placeHolder = moment.localeData().longDateFormat('L'); // 'MM/DD/YYYY'
        this.textMaskConfig.mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
        break;
      }
    }
  }

  onInput(value) {
    const momentData  = moment(value, 'L', true);
    if (momentData.isValid()) {
      const returnedDateValue = momentData.format(this.inputOutputFormat);
      this.onModelChange(returnedDateValue);
    } else {
      this.onModelChange(value);
    }
  }

  writeValue(value: string): void {
    const momentData  = moment(value, this.inputOutputFormat, true);
    if (momentData.isValid()) {
      this.value = momentData.format('L');
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }
}
