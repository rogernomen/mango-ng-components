import { TestBed } from '@angular/core/testing';

import {NgsGaService} from './ga.service';

describe('GaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgsGaService = TestBed.get(NgsGaService);
    expect(service).toBeTruthy();
  });
});
