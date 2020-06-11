import { TestBed } from '@angular/core/testing';
import { of, timer } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MngAuthenticationService } from './mng-authentication.service';
import { MngAuthenticationRemote } from './mng-authentication.remote';
import { Authentication } from './models/authentication.model';
import { NGC_AUTHENTICATION_CONFIG, NgcAuthenticationStorageTypes } from '../../models/ngc-authentication-config.model';
import { NgcAuthenticationUtilsService } from '../utilities/ngc-authentication-utils.service';


describe('MngAuthenticationService', () => {
  let mngAuthenticationService: MngAuthenticationService;
  let mngAuthenticationRemote: MngAuthenticationRemote;
  let spies: any;
  let mocks: any;
  const baseUrl = 'http:/localhost:1234/';

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MngAuthenticationService,
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
    mngAuthenticationService = TestBed.get(MngAuthenticationService);
    mngAuthenticationRemote = TestBed.get(MngAuthenticationRemote);

    loadMocks();
    loadSpies();
  });

  it('should be created', () => {
    expect(mngAuthenticationService).toBeTruthy();
  });

  it('should do a call to the endpoint when login method is called', () => {

    mngAuthenticationService.login('user1', 'pass1', NgcAuthenticationStorageTypes.LOCAL).subscribe();

    expect(spies.mngAuthenticationRemote.login).toHaveBeenCalled();
    expect(spies.mngAuthenticationService.setAuthentication).toHaveBeenCalled();
  });

  it('should get token when getToken method is called', () => {
    spies.mngAuthenticationService.getAuthentication.and.returnValue(mocks.authentication);

    const tokenGetted = mngAuthenticationService.getToken();

    expect(spies.mngAuthenticationService.getAuthentication).toHaveBeenCalled();
    expect(tokenGetted).toEqual(mocks.authentication.token);
  });

  it('should get roles when getRoles method is called', () => {
    spies.mngAuthenticationService.getAuthentication.and.returnValue(mocks.authentication);

    const rolesGetted = mngAuthenticationService.getRoles();

    expect(spies.mngAuthenticationService.getAuthentication).toHaveBeenCalled();
    expect(rolesGetted).toEqual(mocks.authentication.authorities);
  });

  it('should refresh token data when refreshToken method is called', () => {
    // Recibimos error si se intenta refrescarToken sin autenticacion previa
    let returnedError: any;

    mngAuthenticationService.refreshToken().subscribe({
      error: err => returnedError = err
    });

    expect(returnedError).toBeDefined();

    // Se realiza el refresco si hay autentication previa
    spies.mngAuthenticationService.getAuthentication.and.returnValue(mocks.authentication);

    mngAuthenticationService.refreshToken().subscribe();

    expect(spies.mngAuthenticationRemote.refreshToken).toHaveBeenCalled();
    expect(spies.mngAuthenticationService.setAuthentication).toHaveBeenCalled();

  });

  it('should remove authentication data and disable token when logout method is called', () => {
    // Recibimos error si se intenta logout sin autenticacion previa
    let returnedError: any;

    mngAuthenticationService.logout().subscribe({
      error: err => returnedError = err
    });

    expect(returnedError).toBeDefined();

    // Se realiza el refresco si hay autentication previa
    spies.mngAuthenticationService.getAuthentication.and.returnValue(mocks.authentication);

    mngAuthenticationService.logout().subscribe();

    expect(spies.mngAuthenticationRemote.deleteToken).toHaveBeenCalled();
    expect(spies.mngAuthenticationService.removeAuthentication).toHaveBeenCalled();
  });

  it('should return true when isLoggedIn method is called and Authentication is storaged', () => {
    expect(mngAuthenticationService.isLoggedIn()).toBeFalsy();
    spies.mngAuthenticationService.getAuthentication.and.returnValue(mocks.authentication);
    expect(mngAuthenticationService.isLoggedIn()).toBeTruthy();
  });

  function loadMocks() {
    const authentication: Authentication = {
      authorities: ['rol1', 'rol2', 'rol3'],
      expires_in: 0,
      refresh_token: '',
      refresh_token_expires_in: 0,
      token: '1234',
      token_type: '',
      user: ''
    };
    const authenticationRefreshed: Authentication = {
      authorities: ['rol1', 'rol2', 'rol3'],
      expires_in: 0,
      refresh_token: '',
      refresh_token_expires_in: 0,
      token: '5678',
      token_type: '',
      user: ''
    };

    let store = {};
    const mockStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    mocks = {
      authentication: authentication,
      authenticationRefreshed: authenticationRefreshed,
      mockStorage: mockStorage
    };
  }

  function loadSpies() {
    spies = {
      mngAuthenticationService: {
        setAuthentication: spyOn<any>(mngAuthenticationService, 'setAuthentication').and.callThrough(),
        getAuthentication: spyOn<any>(mngAuthenticationService, 'getAuthentication').and.callThrough(),
        removeAuthentication: spyOn<any>(mngAuthenticationService, 'removeAuthentication').and.callThrough()
      },
      mngAuthenticationRemote: {
        login: spyOn(mngAuthenticationRemote, 'login').and.returnValue(of(mocks.authentication)),
        refreshToken: spyOn(mngAuthenticationRemote, 'refreshToken').and.returnValue(of(mocks.authenticationRefreshed)),
        deleteToken: spyOn(mngAuthenticationRemote, 'deleteToken').and.returnValue(of({}))
      },
      localStorage: {
        getItem: spyOn(localStorage, 'getItem').and.callFake(mocks.mockStorage.getItem),
        setItem: spyOn(localStorage, 'setItem').and.callFake(mocks.mockStorage.setItem),
        removeItem: spyOn(localStorage, 'removeItem').and.callFake(mocks.mockStorage.removeItem),
        clear: spyOn(localStorage, 'clear').and.callFake(mocks.mockStorage.clear),
      },
      sessionStorage: {
        getItem: spyOn(sessionStorage, 'getItem').and.callFake(mocks.mockStorage.getItem),
        setItem: spyOn(sessionStorage, 'setItem').and.callFake(mocks.mockStorage.setItem),
        removeItem: spyOn(sessionStorage, 'removeItem').and.callFake(mocks.mockStorage.removeItem),
        clear: spyOn(sessionStorage, 'clear').and.callFake(mocks.mockStorage.clear),
      }
    };
  }


});
