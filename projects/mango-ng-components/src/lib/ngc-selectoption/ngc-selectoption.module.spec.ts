import { NgcSelectoptionModule } from './ngc-selectoption.module';

describe('NgcSelectoptionModule', () => {
  let ngcSelectoptionModule: NgcSelectoptionModule;

  beforeEach(() => {
    ngcSelectoptionModule = new NgcSelectoptionModule();
  });

  it('should create an instance', () => {
    expect(ngcSelectoptionModule).toBeTruthy();
  });
});
