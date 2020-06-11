import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PAGINATOR_MODULE_CONFIG, PAGINATOR_MODULE_CONSTANTS} from './ngc-paginator.module.config';
import {NgcPaginatorComponent} from './components/ngc-paginator.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgcPaginatorComponent],
  exports: [NgcPaginatorComponent],
  providers: [
    {provide: PAGINATOR_MODULE_CONFIG, useValue: PAGINATOR_MODULE_CONSTANTS}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgcPaginatorModule { }
