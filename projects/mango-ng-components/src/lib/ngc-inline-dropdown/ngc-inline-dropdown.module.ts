import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgcInlineDropdownComponent } from './components/ngc-inline-dropdown/ngc-inline-dropdown.component';

@NgModule({
  declarations: [NgcInlineDropdownComponent],
  imports: [
    CommonModule
  ],
  exports: [NgcInlineDropdownComponent],

})
export class NgcInlineDropdownModule { }
