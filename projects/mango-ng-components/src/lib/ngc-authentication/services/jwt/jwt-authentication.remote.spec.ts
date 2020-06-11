import { TestBed } from '@angular/core/testing';
import { JwtAuthenticationRemote } from './jwt-authentication.remote';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JWT_AUTHENTICATION_CONSTANTS } from './jwt-authentication.settings';
import { NGC_AUTHENTICATION_CONFIG, NgcAuthenticationStorageTypes } from '../../models/ngc-authentication-config.model';

describe('JwtAuthenticationRemote', () => {
  let jwtAuthenticationRemote: JwtAuthenticationRemote;
  let httpMock: HttpTestingController;
  const baseUrl = 'http:/localhost:1234/';

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JwtAuthenticationRemote,
        { provide: NGC_AUTHENTICATION_CONFIG, useValue: {
            baseUrl: baseUrl,
            applicationId: 'appId',
            storageType: NgcAuthenticationStorageTypes,
            }
        },
      ]
    })
  );

  beforeEach(() => {
    jwtAuthenticationRemote = TestBed.get(JwtAuthenticationRemote);

    httpMock = TestBed.get(HttpTestingController);
    httpMock.verify();

  });

  it('should be created', () => {
    expect(jwtAuthenticationRemote).toBeTruthy();
  });

  it('should do a call to the endpoint when login method is called', () => {

    jwtAuthenticationRemote.login('user1', 'pass1').subscribe();

    const req = httpMock.expectOne(
      (request) => {
        return request.url === baseUrl + JWT_AUTHENTICATION_CONSTANTS.JWT.REMOTES.LOGIN  &&
               request.method === 'POST';
      }
    );
    req.flush(1);

  });

  it('should refresh token when refreshToken method is called', () => {
    jwtAuthenticationRemote.refreshToken('test').subscribe();

    const req = httpMock.expectOne(
      (request) => {
        return request.url === baseUrl + JWT_AUTHENTICATION_CONSTANTS.JWT.REMOTES.REFRESH_TOKEN_ENDPOINT  &&
               request.method === 'POST';
      }
    );
    req.flush(1);

  });

});
