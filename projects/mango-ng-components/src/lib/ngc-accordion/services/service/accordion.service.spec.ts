import { TestBed } from '@angular/core/testing';
import { NgcAccordionService } from './accordion.service';
import { NgcAccordionHolder } from '../holder/accordion-holder.service';
import { Accordion } from '../../models';

describe('AccordionService', () => {

  let service: NgcAccordionService;
  let accordionHolder: NgcAccordionHolder;
  let spies: any;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [NgcAccordionService, NgcAccordionHolder]
  }));

  beforeEach(() => {
    service = TestBed.get(NgcAccordionService);
    accordionHolder = TestBed.get(NgcAccordionHolder);
    loadSpies();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set Accordion Map', () => {
    service.setAccordionMap('testId');
    expect(spies.accordionHolder.setAccordionMap).toHaveBeenCalled();
  });

  it('should get Accordion Map', () => {
    service.getAccordionMap();
    expect(spies.accordionHolder.getAccordionMap).toHaveBeenCalled();
  });

  it('should update Accordion Map', () => {
    const accordionMap = new Map<string, Accordion>();
    accordionMap.set('accordionId', new Accordion('accordionId', undefined, true));

    service.updateAccordionMap(accordionMap);

    expect(spies.accordionHolder.updateAccordionMap).toHaveBeenCalledWith(accordionMap);
  });

  it('should call accordionHolder.open when open is called', () => {
    service.open('accordionId1');
    expect(spies.accordionHolder.open).toHaveBeenCalledWith('accordionId1', true);
  });

  it('should call accordionHolder.close when close is called', () => {
    service.close('accordionId1');
    expect(spies.accordionHolder.close).toHaveBeenCalledWith('accordionId1');
  });

  function loadSpies() {
    spies = {
      accordionHolder: {
        setAccordionMap: spyOn(accordionHolder, 'setAccordionMap').and.callThrough(),
        getAccordionMap: spyOn(accordionHolder, 'getAccordionMap').and.callThrough(),
        updateAccordionMap: spyOn(accordionHolder, 'updateAccordionMap').and.callThrough(),
        open: spyOn(accordionHolder, 'open').and.callThrough(),
        close: spyOn(accordionHolder, 'close').and.callThrough()
    }
  };
}});
