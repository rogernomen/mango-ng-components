import {Observable} from 'rxjs/index';
import { NgcAuthenticationStorageTypes } from '../models/ngc-authentication-config.model';
import { HttpRequest } from '@angular/common/http';

export abstract class NgcAuthenticationService {
  abstract login(username: string, password: string, storageType: NgcAuthenticationStorageTypes): Observable<any>;
  abstract getToken(): string | null;
  abstract getRoles(): string[] | null;
  abstract refreshToken(): Observable<any>;
  abstract logout(): Observable<any>;
  abstract isLoggedIn(): boolean;
  abstract isResfreshTokenRequest(req: HttpRequest<any>): boolean;
}
