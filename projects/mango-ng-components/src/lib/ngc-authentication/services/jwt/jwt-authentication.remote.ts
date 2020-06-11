import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {JwtBodyImp} from './models/jwt-body.class';
import {JWT_AUTHENTICATION_CONSTANTS} from './jwt-authentication.settings';
import { NgcAuthenticationConfig, NGC_AUTHENTICATION_CONFIG } from '../../models/ngc-authentication-config.model';


@Injectable()
export class JwtAuthenticationRemote {
  constructor(
    private httpClient: HttpClient,
    @Inject(NGC_AUTHENTICATION_CONFIG) private config: NgcAuthenticationConfig) {}

  login(username: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    const body = new JwtBodyImp(this.config.applicationId,
      JWT_AUTHENTICATION_CONSTANTS.JWT.BODY.GRANT_TYPE,
      this.generateGUID(),
      username,
      password);
    headers = headers.append(JWT_AUTHENTICATION_CONSTANTS.JWT.HEADERS.CONTENT_TYPE,
      JWT_AUTHENTICATION_CONSTANTS.JWT.HEADERS.APPLICATION);

    return this.httpClient
     .post(this.config.baseUrl + JWT_AUTHENTICATION_CONSTANTS.JWT.REMOTES.LOGIN, this.convertToUrlEncoded(body),
     { headers: headers });
  }

  refreshToken(refreshToken): Observable<any>  {
    return this.httpClient.post(this.config.baseUrl + JWT_AUTHENTICATION_CONSTANTS.JWT.REMOTES.REFRESH_TOKEN_ENDPOINT, refreshToken);
  }

  isResfreshTokenRequest(req: HttpRequest<any>): boolean {
    return (req.url.includes(JWT_AUTHENTICATION_CONSTANTS.JWT.REMOTES.REFRESH_TOKEN_ENDPOINT));
  }

  private generateGUID(): string {
    return this.generateRandom() + this.generateRandom() + '-' + this.generateRandom() + '-' + this.generateRandom() + '-' +
      this.generateRandom() + '-' + this.generateRandom() + this.generateRandom() + this.generateRandom() + ':' + Date.now();
  }
  private generateRandom(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  private convertToUrlEncoded(object: any): string {
    let output = '';
    for (const key in object) {
      if (object !== null && object !== undefined) {
        output += key + '=' + this.encodeURICharacters('' + object[key]) + '&';
      }
    }
    return output.substring(0, output.length - 1);
  }

  private encodeURICharacters(characters: string): string {
    return characters.replace(/@/gi, '%40')
      .replace(/:/gi, '%3A')
      .replace(/\$/gi, '%24')
      .replace(/,/gi, '%2C')
      .replace(/;/gi, '%3B')
      .replace(/\+/gi, '%2B')
      .replace(/=/gi, '%3D')
      .replace(/\?/gi, '%3F')
      .replace(/\//gi, '%2F')
      .replace(/&/gi, '%26');
  }
}
