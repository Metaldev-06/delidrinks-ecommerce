import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.cookieService.get('accessToken');
    let req = request;

    if (token) {
      req = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl('/auth/login');
        }
        throw err;
      })
    );
  }
}
