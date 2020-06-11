import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgcKebabMenuComponent} from './components/ngc-kebab-menu.component';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NgcKebabMenuComponent],
  exports: [NgcKebabMenuComponent]
})
export class NgcKebabMenuModule { }
