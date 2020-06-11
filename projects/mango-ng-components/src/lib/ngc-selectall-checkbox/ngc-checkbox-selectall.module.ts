import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgcCheckboxSelectallComponent } from './components/ngc-checkbox-selectall.component';
import { NgcCheckboxModule } from '../ngc-checkbox/ngc-checkbox.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgcCheckboxModule
  ],
  declarations: [
    NgcCheckboxSelectallComponent],
  exports: [NgcCheckboxSelectallComponent]
})
export class NgcCheckboxSelectallModule { }
