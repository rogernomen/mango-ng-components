import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgcCheckboxComponent} from './components/ngc-checkbox.component';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NgcCheckboxComponent],
  exports: [NgcCheckboxComponent]
})
export class NgcCheckboxModule { }
