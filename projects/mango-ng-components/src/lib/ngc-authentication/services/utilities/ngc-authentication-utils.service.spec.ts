import { TestBed } from '@angular/core/testing';
import { NgcAuthenticationUtilsService } from './ngc-authentication-utils.service';

describe('UtilsService', () => {
  let ngcAuthenticationUtilsService: NgcAuthenticationUtilsService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        NgcAuthenticationUtilsService
      ]
    })
  );

  beforeEach(() => {
    ngcAuthenticationUtilsService = TestBed.get(NgcAuthenticationUtilsService);
  });

  it('should be created', () => {
    expect(ngcAuthenticationUtilsService).toBeTruthy();
  });


  it('should encode Unicode to b64 when b64EncodeUnicode is called', () => {
    const b64Str = ngcAuthenticationUtilsService.b64EncodeUnicode('✓ caña');
    expect(b64Str).toEqual('4pyTIGNhw7Fh');
  });
});

