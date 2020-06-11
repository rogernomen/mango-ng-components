import {Observable, throwError, of} from 'rxjs';
import { Injectable, Inject} from '@angular/core';
import { map } from 'rxjs/operators';
import { NgcAuthenticationService } from '../ngc-authentication.service';
import { JwtAuthenticationRemote } from './jwt-authentication.remote';
import {JWT_AUTHENTICATION_CONSTANTS} from './jwt-authentication.settings';
import { AuthUtilities } from '../utilities/auth-utilities';
import { NgcAuthenticationConfig, NgcAuthenticationStorageTypes, NGC_AUTHENTICATION_CONFIG } from '../../models/ngc-authentication-config.model';
import { HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core/testing';

@Injectable()
export class JwtAuthenticationService implements NgcAuthenticationService {

  private authStorageKey: string;
  private authConfigStorageKey: string;
  private authentication: any = null;
  private storageType: NgcAuthenticationStorageTypes;

  constructor(
    private jwtAuthenticationRemote: JwtAuthenticationRemote,
    @Inject(NGC_AUTHENTICATION_CONFIG) private config: NgcAuthenticationConfig
  ) {
    this.authStorageKey = JWT_AUTHENTICATION_CONSTANTS.AUTH_TOKEN + '_' + this.config.applicationId;
    this.authConfigStorageKey = JWT_AUTHENTICATION_CONSTANTS.AUTH_TOKEN + '_storageType_' + this.config.applicationId;

    this.storageType = AuthUtilities.getLocalStorageKey(this.authConfigStorageKey);
    if (this.storageType == null) {
      this.storageType = NgcAuthenticationStorageTypes.SESSION;
    }
  }

  login(username: string, password: string, storageType: NgcAuthenticationStorageTypes): Observable<any> {
    this.storageType = storageType;
    AuthUtilities.setLocalStorageKey(this.authConfigStorageKey, this.storageType);

    return this.jwtAuthenticationRemote.login(username, password).pipe(map(jwt => {
      this.setAuthentication(jwt);
      return jwt;
    }));
  }

  getToken(): string | null {
    const authentication: any = this.getAuthentication();
    return authentication ? authentication['value'] : null;
  }

  getRoles(): string[] | null {
    return null;
  }

  refreshToken(): Observable<any> {
    return throwError('refreshToken not available for this type of Authentication');
  }

  logout() {
    this.removeAuthentication();
    return of('Correct logout');
  }

  isLoggedIn(): boolean {
    return !!this.getAuthentication();
  }

  isResfreshTokenRequest(req: HttpRequest<any>): boolean {
    return this.jwtAuthenticationRemote.isResfreshTokenRequest(req);
  }

  private setAuthentication(authentication: any) {
    this.authentication = authentication;
    if (this.storageType === NgcAuthenticationStorageTypes.SESSION) {
      AuthUtilities.setSessionStorageKey(this.authStorageKey, authentication);
    } else {
      AuthUtilities.setLocalStorageKey(this.authStorageKey, authentication);
    }
  }
  private getAuthentication(): any {
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
