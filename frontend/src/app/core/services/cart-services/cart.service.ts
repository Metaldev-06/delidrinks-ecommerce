import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartProduct } from '../../interfaces/cart-product.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart';
  private cart: CartProduct[] = [];
  private cartSubject = new BehaviorSubject<CartProduct[]>([]);

  constructor() {
    const cartData = localStorage.getItem(this.cartKey);

    if (cartData) {
      this.cart = JSON.parse(cartData);
    }

    this.cartSubject.next(this.cart);
  }

  getCartObservable(): Observable<CartProduct[]> {
    return this.cartSubject.asObservable();
  }
  getCart(): CartProduct[] {
    return this.cart;
  }

  addToCart(product: CartProduct): void {
    const existingProductIndex = this.cart.findIndex(
      (p) => p.slug === product.slug
    );

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      this.cart[existingProductIndex].quantity += product.quantity;
    } else {
      // Si el producto no está en el carrito, agrégalo
      this.cart.push(product);
    }

    this.saveCartToLocalStorage();
    this.cartSubject.next(this.cart);
  }

  addToCartAssigning(product: CartProduct): void {
    const existingProductIndex = this.cart.findIndex(
      (p) => p.slug === product.slug
    );

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      this.cart[existingProductIndex].quantity = product.quantity;
    } else {
      // Si el producto no está en el carrito, agrégalo
      this.cart.push(product);
    }

    this.saveCartToLocalStorage();
    this.cartSubject.next(this.cart);
  }

  removeFromCart(productSlug: string): void {
    this.cart = this.cart.filter((product) => product.slug !== productSlug);
    this.saveCartToLocalStorage();
    this.cartSubject.next(this.cart);
  }

  clearCart(): void {
    this.cart = [];
    this.saveCartToLocalStorage();
    this.cartSubject.next(this.cart);
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }
}
