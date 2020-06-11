import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import {NgcDropdownComponent} from './components/ngc-dropdown.component';
import {FormsModule} from '@angular/forms';
import {NgcDropDownListComponent} from './ngc-dropdown-list/components/ngc-dropdown-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NgcDropdownComponent, NgcDropDownListComponent],
  exports: [NgcDropdownComponent, NgcDropDownListComponent],
  entryComponents: [NgcDropdownComponent]
})
export class NgcDropdownModule { }
