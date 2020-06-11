import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MngAuthenticationRemote } from './mng-authentication.remote';
import { MNG_AUTHENTICATION_CONSTANTS } from './mng-authentication.settings';
import { NGC_AUTHENTICATION_CONFIG, NgcAuthenticationStorageTypes } from '../../models/ngc-authentication-config.model';
import { NgcAuthenticationUtilsService } from '../utilities/ngc-authentication-utils.service';


describe('MngAuthenticationRemote', () => {
  let mngAuthenticationRemote: MngAuthenticationRemote;
  let httpMock: HttpTestingController;
  const baseUrl = 'http:/localhost:1234/';

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MngAuthenticationRemote,
        { provide: NGC_AUTHENTICATION_CONFIG, useValue: {
            baseUrl: baseUrl,
            applicationId: 'appId',
            storageType: NgcAuthenticationStorageTypes,
            }
        },
        NgcAuthenticationUtilsService
      ]
    })
  );

  beforeEach(() => {
    mngAuthenticationRemote = TestBed.get(MngAuthenticationRemote);

    httpMock = TestBed.get(HttpTestingController);
    httpMock.verify();

  });

  it('should be created', () => {
    expect(mngAuthenticationRemote).toBeTruthy();
  });

  it('should do a call to the endpoint when login method is called', () => {

    mngAuthenticationRemote.login('user1', 'pass1').subscribe();

    const req = httpMock.expectOne(
      (request) => {
        return request.url === baseUrl + MNG_AUTHENTICATION_CONSTANTS.URL  &&
               request.method === 'POST';
      }
    );
    req.flush(1);

  });

  it('should refresh token when refreshToken method is called', () => {
    mngAuthenticationRemote.refreshToken('test').subscribe();

    const req = httpMock.expectOne(
      (request) => {
        return request.url === baseUrl + MNG_AUTHENTICATION_CONSTANTS.URL  &&
               request.method === 'POST';
      }
    );
    req.flush(1);

  });

  it('should delete token when deleteToken method is called', () => {
    mngAuthenticationRemote.deleteToken('token').subscribe();

    const req = httpMock.expectOne(
      (request) => {
        return request.url === baseUrl + MNG_AUTHENTICATION_CONSTANTS.URL  &&
               request.method === 'DELETE';
      }
    );
    req.flush(1);

  });

});
