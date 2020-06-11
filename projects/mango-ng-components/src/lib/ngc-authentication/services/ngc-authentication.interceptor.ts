import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators';
import { NgcAuthenticationService } from './ngc-authentication.service';
import HttpStatusCode from './utilities/HttpStatusCode';

@Injectable()
export class NgcAuthenticationInterceptor implements HttpInterceptor {
    isRefreshingToken = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private authenticationService: NgcAuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<any>> {
        const token = this.authenticationService.getToken();
        if (token) {
            req = this.addToken(req, token);
        }
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (((<HttpErrorResponse>error).status === HttpStatusCode.UNAUTHORIZED) &&
                        (!this.authenticationService.isResfreshTokenRequest(req))) {
                        return this.handle401Error(req, next, error);
                    }
                }
                return throwError(error);
            })
        );
    }

    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { 'Authorization': 'Bearer ' + token }});
    }

    private handle401Error(req: HttpRequest<any>, next: HttpHandler, error1: any) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            this.tokenSubject.next(null);

            return this.authenticationService.refreshToken().pipe(
                switchMap(() => {
                    const newToken = this.authenticationService.getToken();
                    if (newToken) {
                        this.tokenSubject.next(newToken);
                        return next.handle(this.addToken(req, newToken));
                    }
                    return throwError(error1);
                }),
                catchError( (error2: any)  => {
                    return throwError(error2);
                }),
                finalize( () => {
                    this.isRefreshingToken = false;
                })
            );
        } else {
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap((token: string) => {
                    return next.handle(this.addToken(req, token));
                })
            );
        }
    }

}
