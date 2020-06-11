import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgcAccordionComponent } from './ngc-accordion.component';
import { NgcAccordionService } from '../../services/service/accordion.service';
import { NgcAccordionHolder } from '../../services/holder/accordion-holder.service';

describe('NgcAccordionComponent', () => {
  let component: NgcAccordionComponent;
  let fixture: ComponentFixture<NgcAccordionComponent>;
  let accordionService: NgcAccordionService;
  let spies: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgcAccordionComponent ],
      providers: [
        NgcAccordionService,
        NgcAccordionHolder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcAccordionComponent);
    component = fixture.componentInstance;
    component.accordionId = 'accordionId1';
    fixture.detectChanges();
  });

  beforeEach(() => {
    accordionService = TestBed.get(NgcAccordionService);
    loadSpies();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set component onInit call', () => {
    component.closeAfterOpenOther = true;
    component.accordionId = 'testId1';

    component.ngOnInit();
    expect(spies.accordionService.setAccordionMap).toHaveBeenCalledWith( component.accordionId, component.closeAfterOpenOther);
    expect(spies.accordionService.getAccordionMap).toHaveBeenCalled();
  });

  it('should change isContenShown state when toggleShowContent is called', () => {

    expect(component.isContentShown).toBeFalsy();

    component.toggleShowContent();

    expect(spies.accordionService.open).toHaveBeenCalled();

    expect(component.isContentShown).toBeTruthy();

    component.toggleShowContent();

    expect(spies.accordionService.close).toHaveBeenCalled();

    expect(component.isContentShown).toBeFalsy();

  });

  function loadSpies() {
    spies = {
      accordionService: {
        setAccordionMap: spyOn(accordionService, 'setAccordionMap').and.callThrough(),
        getAccordionMap: spyOn(accordionService, 'getAccordionMap').and.callThrough(),
        updateAccordionMap: spyOn(accordionService, 'updateAccordionMap').and.callThrough(),
        open: spyOn(accordionService, 'open').and.callThrough(),
        close: spyOn(accordionService, 'close').and.callThrough()
    }};
  }
});
