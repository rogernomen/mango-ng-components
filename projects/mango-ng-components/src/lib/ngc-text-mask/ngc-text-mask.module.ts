import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgcMaskedInputDirective } from './directives/ngc-masked-input.directive';

@NgModule({
  declarations: [NgcMaskedInputDirective],
  imports: [
    CommonModule
  ],
  exports: [NgcMaskedInputDirective]
})
export class NgcTextMaskModule { }
