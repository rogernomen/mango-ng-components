import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs/index';
import {tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError(error => {
                console.log('ErrorInterceptor:', error);

                return throwError(error);
            })
        );
    }
}
