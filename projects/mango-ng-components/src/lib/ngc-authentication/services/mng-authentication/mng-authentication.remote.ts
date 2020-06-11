import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { MNG_AUTHENTICATION_CONSTANTS } from './mng-authentication.settings';
import { Authentication } from './models/authentication.model';
import { NgcAuthenticationConfig, NGC_AUTHENTICATION_CONFIG } from '../../models/ngc-authentication-config.model';
import { NgcAuthenticationUtilsService } from '../utilities/ngc-authentication-utils.service';


@Injectable()
export class MngAuthenticationRemote {

  constructor(
    private httpClient: HttpClient,
    @Inject(NGC_AUTHENTICATION_CONFIG) private config: NgcAuthenticationConfig,
    private ngcAuthenticationUtilsService: NgcAuthenticationUtilsService
  ) { }

  login(username: string, password: string): Observable<Authentication> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/JSON');

    const passwordB64: string = this.ngcAuthenticationUtilsService.b64EncodeUnicode(password);

    const body = {
      'username': username,
      'password': passwordB64,
      'grant_type': 'authorization_code',
      'application_id': this.config.applicationId
    };

    return this.httpClient.post<Authentication>(this.config.baseUrl + MNG_AUTHENTICATION_CONSTANTS.URL, body,  { headers: headers });

  }

  refreshToken(refreshToken: string): Observable<Authentication>  {

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/JSON');
    const body = {
      'grant_type': 'refresh_token',
      'application_id': this.config.applicationId,
      'refresh_token': refreshToken
    };

    return this.httpClient.post<Authentication>(this.config.baseUrl +  MNG_AUTHENTICATION_CONSTANTS.URL, body,  { headers: headers });

  }

  isResfreshTokenRequest(req: HttpRequest<any>): boolean {
    return (req.body && req.body['grant_type'] && req.body['grant_type'] === 'refresh_token');
  }

  deleteToken(token: string): Observable<any>  {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      }),
      params : new HttpParams().set('token', token)
    };

    return this.httpClient.delete<any>(this.config.baseUrl + MNG_AUTHENTICATION_CONSTANTS.URL, httpOptions);

  }
}
