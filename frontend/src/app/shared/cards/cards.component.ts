import { Component, Input, signal, OnInit, inject } from '@angular/core';
import { Datum } from 'src/app/core/interfaces/favorites.interfaces';
import { Message } from 'src/app/core/interfaces/message';
import {
  ProductDatum,
  PurpleAttributes,
} from 'src/app/core/interfaces/product';
import { User } from 'src/app/core/interfaces/user.interfaces';
import { CartService } from 'src/app/core/services/cart-services/cart.service';
import { FavoritesService } from 'src/app/core/services/favorites-service/favorites.service';
import { MessageService } from 'src/app/core/services/message-services/message.service';
import { UserService } from 'src/app/core/services/user/user.service';

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
  viewIsFavorite = signal<boolean>(false);
  userData: User = JSON.parse(localStorage.getItem('userData') || '{}');

  isLogued: boolean = false;

  private readonly cartServices = inject(CartService);
  private readonly messageService = inject(MessageService);
  private readonly favoritesService = inject(FavoritesService);
  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.getRelations(this.product);
    this.isAutenticate();
    // this.favorite(this.product.attributes);
  }

  getRelations(products: ProductDatum) {
    this.image.set(
      `${products.attributes.image.data[0].attributes.formats.small.url}`
    );

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

  favorite(product: PurpleAttributes) {
    this.favoritesService.favorites$.subscribe((res: any) => {
      if (res) {
        const favorites = JSON.parse(
          sessionStorage.getItem('favorites') || '[]'
        ).data;

        const isFavorite = favorites?.find(
          (favorite: any) => favorite.attributes.slug === product.slug
        );

        this.viewIsFavorite.set(isFavorite !== undefined);
      } else {
        const favorites: Datum[] = res.data;

        const isFavorite = favorites?.find(
          (favorite) => favorite.attributes.slug === product.slug
        );

        this.viewIsFavorite.set(isFavorite !== undefined);
      }
    });
  }

  isFavorite(product: ProductDatum) {
    if (!this.viewIsFavorite()) {
      this.favoritesService
        .addFavorite(product, this.userData)
        .subscribe((res) => {
          this.favoritesService.getFavorites(this.userData).subscribe((res) => {
            this.favoritesService.updateFavoritesInStorage(res);
          });
        });
    } else {
      const sessionStorageData = JSON.parse(
        sessionStorage.getItem('favorites') || '{}'
      );

      const slug = product.attributes.slug;

      const matchingObject: Datum = sessionStorageData.data.find(
        (item: Datum) => item.attributes.slug === slug
      );

      this.favoritesService
        .deleteFavorite(matchingObject.id)
        .subscribe((res) => {
          this.favoritesService.getFavorites(this.userData).subscribe((res) => {
            this.favoritesService.updateFavoritesInStorage(res);
          });
        });
    }
  }

  isAutenticate() {
    this.userService.getAutenticate().subscribe((res) => {
      this.isLogued = res;

      if (res && this.product) {
        this.favorite(this.product.attributes);
      }
    });
  }
}
