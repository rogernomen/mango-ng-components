import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgcSelectoptionComponent } from './components/ngc-selectoption/ngc-selectoption.component';
import { FormsModule } from '@angular/forms';
import { NgcSelectoptionItemComponent } from './components/ngc-selectoption-item/ngc-selectoption-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NgcSelectoptionComponent, NgcSelectoptionItemComponent],
  exports: [NgcSelectoptionComponent, NgcSelectoptionItemComponent]
})
export class NgcSelectoptionModule { }
