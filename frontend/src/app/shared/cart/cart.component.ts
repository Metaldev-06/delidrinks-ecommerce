import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartProduct } from 'src/app/core/interfaces/cart-product.interfaces';
import { Message } from 'src/app/core/interfaces/message';
import { ProductDatum } from 'src/app/core/interfaces/product';
import { CartService } from 'src/app/core/services/cart-services/cart.service';
import { MessageService } from 'src/app/core/services/message-services/message.service';
import { ProductServices } from 'src/app/core/services/product-services/product-services.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  @Input() showOptions = true;
  @Output() hideCart = new EventEmitter<void>();

  products: ProductDatum[] = [];
  productsCart: CartProduct[] = [];
  combinedProducts: ProductDatum[] = [];
  totalProductPrice!: number;
  childFormValidities: boolean[] = [];
  formValid: boolean = false;
  isAuth: boolean = false;

  private unsubscribe$ = new Subject<void>();

  private readonly cartService = inject(CartService);
  private readonly userService = inject(UserService);
  private readonly productServices = inject(ProductServices);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.getCart();
    this.getAuth();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getCart() {
    this.productsCart = this.cartService.getCart();

    if (this.productsCart.length === 0) return;
    this.productServices
      .getCartProducts(this.productsCart)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.products = res;
        this.combinedProducts = this.combineWithQuantity(
          res,
          this.productsCart
        );
        this.totalQunatity();
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

  deleteItemCart(slug: string) {
    this.cartService.removeFromCart(slug);
    this.getCart();
  }

  totalQunatity() {
    let total = 0;
    const filteredProducts = this.combinedProducts.filter((product) => {
      return product.attributes.quantity! <= product.attributes.stock;
    });
    filteredProducts.forEach((product: any) => {
      total += product.attributes.quantity! * product.attributes.price;
    });
    this.totalProductPrice = total;
  }

  updateQuantity(product: any) {
    this.cartService.addToCartAssigning(product);
    this.getCart();
  }

  purchase() {
    if (!this.formValid) {
      const message: Message = {
        title: 'Stock Agotado',
        message: 'Elimine el producto que no tenga stock.',
      };

      const messageDuration = 5000; // Tiempo de duración específico para este mensaje
      this.messageService.showMessage(message, messageDuration);
      return;
    }

    this.hideCart.emit();

    if (this.isAuth) {
      this.router.navigateByUrl('/checkout');
    } else {
      this.router.navigateByUrl('/auth');
    }
  }

  getAuth() {
    this.userService
      .getAutenticate()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.isAuth = res;
      });
  }

  handleValidation(isValid: boolean, index: number) {
    this.childFormValidities[index] = isValid;
    this.checkAllFormsValidity();
  }

  checkAllFormsValidity() {
    // Verificar si todos los formularios son válidos (todos true)
    const allFormsValid = this.childFormValidities.every(
      (validity) => validity === true
    );

    // Verificar si todos los formularios son inválidos (todos false)
    const allFormsInvalid = this.childFormValidities.some(
      (validity) => validity === false
    );

    if (allFormsValid) {
      this.formValid = true;
    } else if (allFormsInvalid) {
      this.formValid = false;
    } else {
      this.formValid = false;
    }
  }
}
