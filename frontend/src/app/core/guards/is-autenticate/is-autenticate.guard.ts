import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

export const isAutenticateGuard: CanActivateFn = (route, state) => {
  return isAutenticate();
};

export const isAutenticateMatchGuard: CanMatchFn = (route, segments) => {
  return isAutenticate();
};

const isAutenticate = (): boolean => {
  const userService = inject(UserService);
  const router = inject(Router);

  let response!: boolean;

  userService.getAutenticate().subscribe((res) => {
    if (res) {
      response = true;
    } else {
      router.navigate(['/']);
      response = false;
    }
  });

  return response;
};
