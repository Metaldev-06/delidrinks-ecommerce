import { Component, OnInit, inject, signal } from '@angular/core';
import { CartProduct } from 'src/app/core/interfaces/cart-product.interfaces';
import { Message } from 'src/app/core/interfaces/message';
import { ProductDatum } from 'src/app/core/interfaces/product';
import { CartService } from 'src/app/core/services/cart-services/cart.service';
import { MessageService } from 'src/app/core/services/message-services/message.service';
import { ProductServices } from 'src/app/core/services/product-services/product-services.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  products: ProductDatum[] = [];
  productsCart: CartProduct[] = [];
  combinedProducts: ProductDatum[] = [];
  totalProductPrice!: number;
  childFormValidities: boolean[] = [];
  formValid = false;

  private readonly cartService = inject(CartService);
  private readonly productServices = inject(ProductServices);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.productsCart = this.cartService.getCart();
    if (this.productsCart.length === 0) return;
    this.productServices.getCartProducts(this.productsCart).subscribe((res) => {
      this.products = res;
      this.combinedProducts = this.combineWithQuantity(res, this.productsCart);
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
      // console.log(product);
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

    console.log('comprar');
  }

  handleValidation(isValid: boolean, index: number) {
    this.childFormValidities = [];
    this.childFormValidities[index] = isValid;
    this.checkAllFormsValidity();
  }

  checkAllFormsValidity() {
    // Verificar si todos los formularios son válidos (todos true)
    const allFormsValid = this.childFormValidities.every(
      (validity) => validity === true
    );

    // Verificar si todos los formularios son inválidos (todos false)
    const allFormsInvalid = this.childFormValidities.every(
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
