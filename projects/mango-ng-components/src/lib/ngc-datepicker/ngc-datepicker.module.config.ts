import {InjectionToken} from '@angular/core';

export interface DatepickerModuleConfig {
  CONSTANTS: any;
}

export const DATEPICKER_MODULE_CONSTANTS: DatepickerModuleConfig = {
  CONSTANTS: {
    PLACEHOLDER: 'dd/mm/aaaa',
    LOCALE: 'es',
    DATE_FORMATS: {
      DAY: 'D',
      MONTH: 'M',
      YEAR: 'YYYY',
      WEEK_DAY: 'ddd',
      REGEX: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
    },
    VIEW_DATE: {
      MONTH: 'month',
      FORMAT: 'MMMM YYYY'
    },
    RETURN_DATE: {
      FORMAT: 'DD/MM/YYYY',
      COMPARE_FORMAT: 'MM-DD-YYYY'
    }
  }
};

export let DATEPICKER_MODULE_CONFIG = new InjectionToken<DatepickerModuleConfig>('datepicker.module.config');
