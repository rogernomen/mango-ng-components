import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgcAuthenticationService } from './ngc-authentication.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgcAuthenticationInterceptor } from './ngc-authentication.interceptor';
import { Injectable } from '@angular/core';
import { MngAuthenticationService } from './mng-authentication/mng-authentication.service';
import { MngAuthenticationRemote } from './mng-authentication/mng-authentication.remote';
import { NgcAuthenticationConfig, NgcAuthenticationServiceTypes, NGC_AUTHENTICATION_CONFIG } from '../models/ngc-authentication-config.model';
import { Authentication } from './mng-authentication/models/authentication.model';
import { NgcAuthenticationUtilsService } from './utilities/ngc-authentication-utils.service';

describe('NgcAuthenticationInterceptor', () => {
  let dataService: DataService; // Servicio mock añadido al final de este mismo archivo
  let ngcAuthenticationService: NgcAuthenticationService;
  let httpMock: HttpTestingController;
  let spies: any;
  let mocks: any;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataService,
        MngAuthenticationService,
        MngAuthenticationRemote,
        {provide: NGC_AUTHENTICATION_CONFIG, useValue: {
            authService: NgcAuthenticationServiceTypes.MNG_AUTHENTICATION,
            baseUrl: '...',
            applicationId: '...'}
        },
        {provide: NgcAuthenticationService, useClass: MngAuthenticationService},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: NgcAuthenticationInterceptor,
          multi: true,
        },
        NgcAuthenticationUtilsService
      ]
    })
  );

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    ngcAuthenticationService = TestBed.get(NgcAuthenticationService);
    httpMock = TestBed.get(HttpTestingController);

    loadMocks();
    loadSpies();
  });

  it('should be created', () => {
    expect(NgcAuthenticationInterceptor).toBeTruthy();
  });

  it('should add an Authorization header', () => {

    dataService.getPosts().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(`${dataService.ROOT_URL}/posts`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toEqual('Bearer ' + mocks.authentication.token);

  });

  it('should call refreshToken when 401 unauthorized error occurs', () => {
    let response: any;
    let errResponse: any;

    dataService.getPosts().subscribe(res => response = res, err => errResponse = err);

    httpMock.expectOne(`${dataService.ROOT_URL}/posts`).flush(null, {status: 401, statusText: 'Unauthorized'});
    expect(spies.ngcAuthenticationService.refreshToken).toHaveBeenCalled();
  });

  function loadMocks() {
    const authentication: Authentication = {
      authorities: ['rol1', 'rol2', 'rol3'],
      expires_in: 0,
      refresh_token: '',
      refresh_token_expires_in: 0,
      token: '123456',
      token_type: '',
      user: ''
    };

    mocks = {
      authentication: authentication,
    };
  }

  function loadSpies() {
    spies = {
      ngcAuthenticationService: {
        getToken: spyOn<any>(ngcAuthenticationService, 'getToken').and.returnValue(mocks.authentication.token),
        refreshToken: spyOn<any>(ngcAuthenticationService, 'refreshToken')
      }
    };
  }


});

@Injectable()
export class DataService {
  ROOT_URL = `...`;

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<any[]>(`${this.ROOT_URL}/posts`);
  }
}

