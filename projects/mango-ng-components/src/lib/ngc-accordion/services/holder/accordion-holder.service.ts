import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Accordion } from '../../models/accordion.class';

@Injectable()
export class NgcAccordionHolder {

  private accordionMapBS = new BehaviorSubject<Map<string, Accordion>>(new Map<string, Accordion>());

  constructor() {
  }

  setAccordionMap(accordionId: string, closeAfterOpenOther: boolean) {
    const accordionMap: Map<string, Accordion> = this.accordionMapBS.getValue();
    const accordion: Accordion = accordionMap.get(accordionId);

    if (accordion) {
      accordion.closeAfterOpenOther = closeAfterOpenOther;
    } else {
      accordionMap.set(accordionId, new Accordion(accordionId, undefined, closeAfterOpenOther));
    }

    this.updateAccordionMap(accordionMap);
  }

  getAccordionMap(): Observable<Map<string, Accordion>> {
    return this.accordionMapBS.asObservable();
  }

  updateAccordionMap(accordionMap: Map<string, Accordion>) {
    this.accordionMapBS.next(accordionMap);
  }

  open(id: string, closeAfterOpentOtherEnable: boolean = true) {
    const accordionMap: Map<string, Accordion> = this.accordionMapBS.getValue();
    const accordion: Accordion = accordionMap.get(id);

    if (accordion && !accordion.isContentShown) {
      accordion.isContentShown = true;

      if (closeAfterOpentOtherEnable) {
        accordionMap.forEach(
          (item: Accordion) => {
            if ((item.id !== id) && (item.closeAfterOpenOther) && (item.isContentShown))  {
              item.isContentShown = false;
            }
          }
        );
      }

      this.updateAccordionMap(accordionMap);
    }
  }

  close(id: string) {
    const accordionMap: Map<string, Accordion> = this.accordionMapBS.getValue();
    const accordion: Accordion = accordionMap.get(id);

    if (accordion && accordion.isContentShown) {
      accordion.isContentShown = false;

      this.updateAccordionMap(accordionMap);
    }
  }
}
