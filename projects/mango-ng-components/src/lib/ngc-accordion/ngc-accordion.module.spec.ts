import { NgcAccordionModule } from './ngc-accordion.module';

describe('NgcAccordionModule', () => {
  let ngcAccordionModule: NgcAccordionModule;

  beforeEach(() => {
    ngcAccordionModule = new NgcAccordionModule();
  });

  it('should create an instance', () => {
    expect(ngcAccordionModule).toBeTruthy();
  });
});
