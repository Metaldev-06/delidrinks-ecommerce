import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const isLoguedGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.check('accessToken');

  if (token) {
    router.navigate(['/']);
    return false;
  }

  return true;
};

export const isLoguedMatchGuard: CanMatchFn = (route, segments) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.check('accessToken');

  if (token) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
