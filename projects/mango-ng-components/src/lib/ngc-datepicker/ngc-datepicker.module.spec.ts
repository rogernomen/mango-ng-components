import { NgcDatepickerModule } from './ngc-datepicker.module';

describe('NgcDatepickerModule', () => {
  let ngcDatepickerModule: NgcDatepickerModule;

  beforeEach(() => {
    ngcDatepickerModule = new NgcDatepickerModule();
  });

  it('should create an instance', () => {
    expect(ngcDatepickerModule).toBeTruthy();
  });
});
