import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { CartService } from '../../services/cart-services/cart.service';

export const checkCartGuard: CanActivateFn = (route, state) => {
  return checkCart();
};

export const checkMatchCartGuard: CanMatchFn = (route, state) => {
  return checkCart();
};

const checkCart = (): boolean => {
  const cartService = inject(CartService);
  const router = inject(Router);

  let response!: boolean;

  cartService.getCartObservable().subscribe((cart) => {
    if (cart.length === 0) {
      response = false;
      router.navigate(['/']);
    } else {
      response = true;
    }
  });

  return response;
};
