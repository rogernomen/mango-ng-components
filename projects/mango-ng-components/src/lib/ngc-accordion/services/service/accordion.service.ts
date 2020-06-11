import { Injectable } from '@angular/core';
import { NgcAccordionHolder } from '../holder/accordion-holder.service';
import { Observable } from 'rxjs';
import { Accordion } from '../../models';

@Injectable()
export class NgcAccordionService {

  constructor(private accordionHolder: NgcAccordionHolder) { }

  setAccordionMap(accordionId: string, closeAfterOpenOther: boolean = false) {
    this.accordionHolder.setAccordionMap(accordionId, closeAfterOpenOther);
  }

  getAccordionMap(): Observable<Map<string, Accordion>> {
    return this.accordionHolder.getAccordionMap();
  }

  updateAccordionMap(accordionMap: Map<string, Accordion>) {
    this.accordionHolder.updateAccordionMap(accordionMap);
  }

  open(id: string, closeAfterOpentOtherEnable: boolean = true) {
    this.accordionHolder.open(id, closeAfterOpentOtherEnable);
  }

  close(id: string) {
    this.accordionHolder.close(id);
  }
}
