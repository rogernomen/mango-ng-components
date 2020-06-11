import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgcLocaleDateMaskComponent } from './components/ngc-locale-date-mask/ngc-locale-date-mask.component';
import { NgcTextMaskModule } from '../ngc-text-mask/ngc-text-mask.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [NgcLocaleDateMaskComponent],
  imports: [
    CommonModule,
    NgcTextMaskModule,
    FormsModule
  ],
  exports: [NgcLocaleDateMaskComponent]
})
export class NgcLocaleDateMaskModule { }
