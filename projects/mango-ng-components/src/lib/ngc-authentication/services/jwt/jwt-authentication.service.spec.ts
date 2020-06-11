import { TestBed } from '@angular/core/testing';
import { of, timer } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtAuthenticationService } from './jwt-authentication.service';
import { JwtAuthenticationRemote } from './jwt-authentication.remote';
import { NGC_AUTHENTICATION_CONFIG, NgcAuthenticationStorageTypes } from '../../models/ngc-authentication-config.model';


describe('JwtAuthenticationService', () => {
  let jwtAuthenticationService: JwtAuthenticationService;
  let jwtAuthenticationRemote: JwtAuthenticationRemote;
  let spies: any;
  let mocks: any;
  const baseUrl = 'http:/localhost:1234/';

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JwtAuthenticationService,
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
    jwtAuthenticationService = TestBed.get(JwtAuthenticationService);
    jwtAuthenticationRemote = TestBed.get(JwtAuthenticationRemote);

    loadMocks();
    loadSpies();
  });

  it('should be created', () => {
    expect(jwtAuthenticationService).toBeTruthy();
  });

  it('should do a call to the endpoint when login method is called', () => {

    jwtAuthenticationService.login('user1', 'pass1', NgcAuthenticationStorageTypes.LOCAL).subscribe();

    expect(spies.jwtAuthenticationRemote.login).toHaveBeenCalled();
    expect(spies.jwtAuthenticationService.setAuthentication).toHaveBeenCalled();
  });

  it('should get token when getToken method is called', () => {
    spies.jwtAuthenticationService.getAuthentication.and.returnValue(mocks.authentication);

    const tokenGetted = jwtAuthenticationService.getToken();

    expect(spies.jwtAuthenticationService.getAuthentication).toHaveBeenCalled();
    expect(tokenGetted).toEqual(mocks.authentication.value);
  });

  it('should get roles when getRoles method is called', () => {
    expect(jwtAuthenticationService.getRoles()).toEqual(null);
  });

  it('should get error (<function not available>) when refreshToken method is called', () => {
    let returnedError: any;

    expect(returnedError).toBeUndefined();

    jwtAuthenticationService.refreshToken().subscribe({
      error: err => returnedError = err
    });

    expect(returnedError).toBeDefined();
  });


  it('should remove authentication data and disable token when logout method is called', () => {

    jwtAuthenticationService.logout().subscribe();

    expect(spies.jwtAuthenticationService.removeAuthentication).toHaveBeenCalled();
  });

  it('should return true when isLoggedIn method is called and Authentication is storaged', () => {
    expect(jwtAuthenticationService.isLoggedIn()).toBeFalsy();
    spies.jwtAuthenticationService.getAuthentication.and.returnValue(mocks.authentication);
    expect(jwtAuthenticationService.isLoggedIn()).toBeTruthy();
  });

  function loadMocks() {
    const authentication: any = {
      value: '1234',
    };
    const authenticationRefreshed: any = {
      value: '5678',
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
      jwtAuthenticationService: {
        setAuthentication: spyOn<any>(jwtAuthenticationService, 'setAuthentication').and.callThrough(),
        getAuthentication: spyOn<any>(jwtAuthenticationService, 'getAuthentication').and.callThrough(),
        removeAuthentication: spyOn<any>(jwtAuthenticationService, 'removeAuthentication').and.callThrough()
      },
      jwtAuthenticationRemote: {
        login: spyOn(jwtAuthenticationRemote, 'login').and.returnValue(of(mocks.authentication)),
        refreshToken: spyOn(jwtAuthenticationRemote, 'refreshToken').and.returnValue(of(mocks.authenticationRefreshed))
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

