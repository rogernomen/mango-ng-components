import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgcDatepickerComponent } from './components/ngc-datepicker/ngc-datepicker.component';
import { FormsModule } from '@angular/forms';
import {DATEPICKER_MODULE_CONFIG, DATEPICKER_MODULE_CONSTANTS} from './ngc-datepicker.module.config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NgcDatepickerComponent],
  exports: [NgcDatepickerComponent],
  providers: [
    {provide: DATEPICKER_MODULE_CONFIG, useValue: DATEPICKER_MODULE_CONSTANTS}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgcDatepickerModule { }
