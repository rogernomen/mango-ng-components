import { NgcMultioptionsModule } from './ngc-multioptions.module';

describe('NgcMultioptionsModule', () => {
  let ngcMultioptionsModule: NgcMultioptionsModule;

  beforeEach(() => {
    ngcMultioptionsModule = new NgcMultioptionsModule();
  });

  it('should create an instance', () => {
    expect(ngcMultioptionsModule).toBeTruthy();
  });
});
