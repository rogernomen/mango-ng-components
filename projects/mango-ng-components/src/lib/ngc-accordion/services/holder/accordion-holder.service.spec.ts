import { TestBed } from '@angular/core/testing';
import { NgcAccordionHolder } from './accordion-holder.service';
import { NgcAccordionModule } from '../../ngc-accordion.module';
import { Accordion } from '../../models';

describe('NgcAccordionHolderService', () => {

  let service: NgcAccordionHolder;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [NgcAccordionHolder]
  }));

  beforeEach(() => {
    service = TestBed.get(NgcAccordionHolder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set Accordion Map', () => {
    const updateAccordionMapSpy = spyOn<any>(service, 'updateAccordionMap');

    service.setAccordionMap('accordionId', true);

    service.getAccordionMap().subscribe(
      (accordionMap: Map<string, Accordion>) => {
        expect(accordionMap.size).toEqual(1);
        expect(updateAccordionMapSpy).toHaveBeenCalledWith(accordionMap);
      }
    );
  });

  it('should update Accordion Map', () => {
    const accordionMap = new Map<string, Accordion>();
    accordionMap.set('accordionId1', new Accordion('accordionId1', false, true));
    accordionMap.set('accordionId2', new Accordion('accordionId2', true, true));
    accordionMap.set('accordionId3', new Accordion('accordionId3', true, false));

    service.updateAccordionMap(accordionMap);

    service.getAccordionMap().subscribe(
      (accordions: Map<string, Accordion>) => {
        expect(accordions.size).toEqual(3);
      }
    );
  });

  it('should open accordion and close the others that are opened with closeAfterOpenOther = true', () => {
    const accordionMap = new Map<string, Accordion>();
    accordionMap.set('accordionId1', new Accordion('accordionId1', false, true));
    accordionMap.set('accordionId2', new Accordion('accordionId2', true, true));
    accordionMap.set('accordionId3', new Accordion('accordionId3', true, false));

    service.updateAccordionMap(accordionMap);

    service.open('accordionId1');

    service.getAccordionMap().subscribe(
      (accordions: Map<string, Accordion>) => {
        let accordion = accordions.get('accordionId1');
        expect(accordion.isContentShown).toBeTruthy();
        accordion = accordions.get('accordionId2');
        expect(accordion.isContentShown).toBeFalsy();
        accordion = accordions.get('accordionId3');
        expect(accordion.isContentShown).toBeTruthy();
      }
    );
  });

  it('should close accordion', () => {
    const accordionMap = new Map<string, Accordion>();
    accordionMap.set('accordionId1', new Accordion('accordionId1', false, true));
    accordionMap.set('accordionId2', new Accordion('accordionId2', true, true));
    accordionMap.set('accordionId3', new Accordion('accordionId3', true, false));

    service.updateAccordionMap(accordionMap);

    service.close('accordionId2');

    service.getAccordionMap().subscribe(
      (accordions: Map<string, Accordion>) => {
        let accordion = accordions.get('accordionId1');
        expect(accordion.isContentShown).toBeFalsy();
        accordion = accordions.get('accordionId2');
        expect(accordion.isContentShown).toBeFalsy();
        accordion = accordions.get('accordionId3');
        expect(accordion.isContentShown).toBeTruthy();
      }
    );
  });

});
