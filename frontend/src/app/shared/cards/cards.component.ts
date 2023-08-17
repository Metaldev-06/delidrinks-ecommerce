import { Component, Input, signal, OnInit, inject } from '@angular/core';
import { Message } from 'src/app/core/interfaces/message';
import { ProductDatum } from 'src/app/core/interfaces/product';
import { CartService } from 'src/app/core/services/cart-services/cart.service';
import { MessageService } from 'src/app/core/services/message-services/message.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() product!: ProductDatum;

  isFlashing = signal<boolean>(false);
  image = signal<string>('');
  brand = signal<string>('');
  category = signal<string>('');

  private readonly cartServices = inject(CartService);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.getRelations(this.product);
  }

  getRelations(products: ProductDatum) {
    this.image.set(`${products.attributes.image.data[0].attributes.url}`);

    this.brand.set(`${products.attributes.brand.data.attributes.name}`);

    this.category.set(`${products.attributes.category.data.attributes.name}`);
  }

  getDynamicStyles(): any {
    return {
      background: `radial-gradient(circle at 50% 50%, ${this.product.attributes.color} -30%, rgba(0, 0, 0, 0) 55%)`,
      transition: 'background-color 0.5s ease-in-out', // Animación de transición
      display: this.isFlashing() ? 'block' : 'none',
    };
  }

  startFlash() {
    this.isFlashing.set(true); // Activa la animación cuando entra el mouse
  }

  stopFlash() {
    this.isFlashing.set(false); // Desactiva la animación cuando sale el mouse
  }

  addToCart(product: ProductDatum) {
    if (product.attributes.stock === 0) {
      const message: Message = {
        title: 'Stock Agotado',
        message: 'Este producto está fuera de stock.',
      };

      const messageDuration = 5000; // Tiempo de duración específico para este mensaje
      this.messageService.showMessage(message, messageDuration);
      return;
    }

    const cartProduct = {
      slug: product.attributes.slug,
      quantity: 1,
    };

    this.cartServices.addToCart(cartProduct);
  }
}
