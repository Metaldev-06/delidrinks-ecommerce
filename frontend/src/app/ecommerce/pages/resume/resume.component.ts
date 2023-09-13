import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CartProduct } from 'src/app/core/interfaces/cart-product.interfaces';
import { OrderAttributes } from 'src/app/core/interfaces/order.interface';
import { ProductDatum } from 'src/app/core/interfaces/product';
import { CheckoutService } from 'src/app/core/services/checkout/checkout.service';
import { ProductServices } from 'src/app/core/services/product-services/product-services.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  public products: ProductDatum[] = [];
  public productsCart: CartProduct[] = [];
  public order!: OrderAttributes;

  private unsubscribe$ = new Subject<void>();

  private readonly productServices = inject(ProductServices);
  private readonly checkoutService = inject(CheckoutService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getParamSlug();
  }

  getParamSlug() {
    this.route.params.pipe(take(1)).subscribe((res) => {
      const IdOrderToken = res['slug'];
      this.getOrderBySlug(IdOrderToken);
    });
  }

  getOrderBySlug(slug: string) {
    this.checkoutService
      .getOrderBySlug(slug)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.order = res.data[0].attributes;
        this.getProductsCart(this.order.products);
      });
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
}
