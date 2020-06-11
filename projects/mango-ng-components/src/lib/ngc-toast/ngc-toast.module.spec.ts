import { NgcToastModule } from './ngc-toast.module';


describe('NgcAccordionModule', () => {
  let ngcToastModule: NgcToastModule;

  beforeEach(() => {
    ngcToastModule = new NgcToastModule();
  });

  it('should create an instance', () => {
    expect(ngcToastModule).toBeTruthy();
  });
});
