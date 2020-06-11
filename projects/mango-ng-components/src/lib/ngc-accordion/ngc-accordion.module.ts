import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgcAccordionComponent } from './components/ngc-accordion/ngc-accordion.component';
import { NgcAccordionHolder } from './services/holder/accordion-holder.service';
import { NgcAccordionService } from './services/service/accordion.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgcAccordionComponent],
  providers: [
    NgcAccordionHolder,
    NgcAccordionService
  ],
  exports: [NgcAccordionComponent],
})
export class NgcAccordionModule { }


