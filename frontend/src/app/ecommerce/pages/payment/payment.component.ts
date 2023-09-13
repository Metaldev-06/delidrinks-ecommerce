import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, take, takeUntil } from 'rxjs';
import { CartProduct } from 'src/app/core/interfaces/cart-product.interfaces';
import { OrderAttributes } from 'src/app/core/interfaces/order.interface';
import { BodyPayment } from 'src/app/core/interfaces/payment.interface';
import { ProductDatum } from 'src/app/core/interfaces/product';
import { Address, User } from 'src/app/core/interfaces/user.interfaces';
import { CheckoutService } from 'src/app/core/services/checkout/checkout.service';
import { ProductServices } from 'src/app/core/services/product-services/product-services.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  public products: ProductDatum[] = [];
  public productsCart: CartProduct[] = [];
  public order!: OrderAttributes;
  public userData!: User;
  public addresses!: Address[];
  public showRedirect = false;

  private unsubscribe$ = new Subject<void>();

  private readonly productServices = inject(ProductServices);
  private readonly checkoutService = inject(CheckoutService);
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly cookieService = inject(CookieService);

  ngOnInit(): void {
    this.getParamSlug();
    this.getUserData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    sessionStorage.removeItem('order');
    this.showRedirect = false;
  }

  getUserData() {
    this.userService.user$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.userData = user;
      });
  }

  getParamSlug() {
    this.route.params.pipe(take(1)).subscribe((res) => {
      const IdOrderToken = res['slug'];
      this.getOrderBySlug(IdOrderToken);
    });
  }

  getOrderBySlug(slug: string) {
    this.checkoutService.order$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((order) => {
        this.order = order;
        this.getProductsCart(order.products);
        this.getRelations();
      });

    if (Object.keys(this.order).length === 0) {
      this.checkoutService
        .getOrderBySlug(slug)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          this.order = res.data[0].attributes;
          this.getProductsCart(this.order.products);

          this.getRelations();

          const IdOrderToken = res.data[0].id;
          const newOrder = this.order;

          newOrder.id = IdOrderToken;

          this.checkoutService.updateLocalOrder(newOrder);
        });
    }
  }

  getRelations() {
    const newFormat = this.order.addresses.data?.map((item) => ({
      id: item.id,
      ...item.attributes,
    }));

    this.addresses = newFormat;
  }

  getProductsCart(cart: CartProduct[]) {
    this.productsCart = cart;

    if (this.productsCart.length === 0) return;
    this.productServices
      .getCartProducts(this.productsCart)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.products = this.combineWithQuantity(res, this.productsCart);
      });
  }

  combineWithQuantity(
    products: ProductDatum[],
    cartProducts: CartProduct[]
  ): ProductDatum[] {
    return products.map((product) => {
      const cartProduct = cartProducts.find(
        (cartItem) => cartItem.slug === product.attributes.slug
      );
      if (cartProduct) {
        product.attributes.quantity = cartProduct.quantity;
      }
      return product;
    });
  }

  pay() {
    this.showRedirect = true;
    localStorage.removeItem('cart');

    const items = this.products.map((product) => {
      return {
        currency_id: 'ARS',
        description: product.attributes.name,
        picture_url: product.attributes.image.data[0].attributes.url,
        title: product.attributes.name,
        quantity: product.attributes.quantity,
        unit_price: product.attributes.price,
      };
    });

    const jwt = this.cookieService.get('accessToken');
    const idOrder = this.order.id!;
    const userId = this.userData.id;

    this.checkoutService
      .goToPay(
        items,
        this.order.slug,
        this.order.shipping_price,
        userId,
        jwt,
        idOrder
      )
      .pipe(take(2))
      .subscribe((res) => {
        window.location.href = res.body.init_point;
      });
  }
}
