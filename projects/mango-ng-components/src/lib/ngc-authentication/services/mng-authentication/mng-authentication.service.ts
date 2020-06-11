import { Injectable, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { MngAuthenticationRemote } from './mng-authentication.remote';
import { MNG_AUTHENTICATION_CONSTANTS } from './mng-authentication.settings';
import { NgcAuthenticationService } from '../ngc-authentication.service';
import { Authentication } from './models/authentication.model';
import { AuthUtilities} from '../utilities/auth-utilities';
import { NgcAuthenticationConfig, NgcAuthenticationStorageTypes, NGC_AUTHENTICATION_CONFIG } from '../../models/ngc-authentication-config.model';
import { HttpRequest } from '@angular/common/http';


@Injectable()
export class MngAuthenticationService implements NgcAuthenticationService {

  private authStorageKey: string;
  private authConfigStorageKey: string;
  private authentication: Authentication = null;
  private storageType: NgcAuthenticationStorageTypes;

  constructor(
    private mngAuthenticationRemote: MngAuthenticationRemote,
    @Inject(NGC_AUTHENTICATION_CONFIG) private config: NgcAuthenticationConfig
  ) {
    this.authStorageKey = MNG_AUTHENTICATION_CONSTANTS.AUTH_TOKEN + '_' + this.config.applicationId;
    this.authConfigStorageKey = MNG_AUTHENTICATION_CONSTANTS.AUTH_TOKEN + '_storageType_' + this.config.applicationId;

    this.storageType = AuthUtilities.getLocalStorageKey(this.authConfigStorageKey);
    if (this.storageType == null) {
      this.storageType = NgcAuthenticationStorageTypes.SESSION;
    }
  }

  login(username: string, password: string, storageType: NgcAuthenticationStorageTypes): Observable<Authentication> {
    this.storageType = storageType;
    AuthUtilities.setLocalStorageKey(this.authConfigStorageKey, this.storageType);

    return this.mngAuthenticationRemote.login(username, password).pipe(map((authentication: Authentication) => {
      this.setAuthentication(authentication);
      return authentication;
    }));
  }

  getToken(): string | null {
    const authentication: Authentication = this.getAuthentication();
    return authentication ? authentication.token : null;
  }

  getRoles(): string[] | null {
    const authentication: Authentication = this.getAuthentication();
    return authentication ? authentication.authorities : null;
  }

  refreshToken(): Observable<Authentication> {
    const authentication: Authentication = this.getAuthentication();
    if (authentication) {
      return this.mngAuthenticationRemote.refreshToken(authentication.refresh_token).pipe(map((newAuthentication: Authentication) => {
        this.setAuthentication(newAuthentication);
        return newAuthentication;
      }));
    } else {
      return throwError('Authentication data not found');
    }
  }

  logout(): Observable<any> {
    const authentication: Authentication = this.getAuthentication();
    if (authentication) {
      return this.mngAuthenticationRemote.deleteToken(authentication.token).pipe(
        tap(
          deleteResp => {
            this.removeAuthentication();
          },
          error => {
            this.removeAuthentication();
          }
        )
      );
    } else {
      return throwError('Authentication data not found');
    }
  }

  isLoggedIn(): boolean {
    return !!this.getAuthentication();
  }

  isResfreshTokenRequest(req: HttpRequest<any>): boolean {
    return this.mngAuthenticationRemote.isResfreshTokenRequest(req);
  }

  private setAuthentication(authentication: Authentication) {
    this.authentication = authentication;
    if (this.storageType === NgcAuthenticationStorageTypes.SESSION) {
      AuthUtilities.setSessionStorageKey(this.authStorageKey, authentication);
    } else {
      AuthUtilities.setLocalStorageKey(this.authStorageKey, authentication);
    }
  }
  private getAuthentication(): Authentication {
    if (!this.authentication) {
      if (this.storageType === NgcAuthenticationStorageTypes.SESSION) {
        this.authentication = AuthUtilities.getSessionStorageKey(this.authStorageKey);
      } else {
        this.authentication = AuthUtilities.getLocalStorageKey(this.authStorageKey);
      }
    }
    return this.authentication;
  }

  private removeAuthentication() {
    this.authentication = null;
    if (this.storageType === NgcAuthenticationStorageTypes.SESSION) {
      sessionStorage.removeItem(this.authStorageKey);
    } else {
      localStorage.removeItem(this.authStorageKey);
    }
  }

}
