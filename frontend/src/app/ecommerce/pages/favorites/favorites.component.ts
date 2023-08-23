import { Component, OnInit, inject } from '@angular/core';
import { ProductDatum } from 'src/app/core/interfaces/product';
import { User } from 'src/app/core/interfaces/user.interfaces';
import { FavoritesService } from 'src/app/core/services/favorites-service/favorites.service';
import { ProductServices } from 'src/app/core/services/product-services/product-services.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  products: ProductDatum[] = [];
  favorites!: any[];

  productServices = inject(ProductServices);
  favoritesService = inject(FavoritesService);

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    this.favoritesService.favorites$.subscribe((res) => {
      this.favorites = res.data;

      if (res.data.length === 0) {
        this.products = [];
        return;
      }

      let fav: any[] = [];
      this.favorites.forEach((element) => {
        fav.push(element.attributes);
      });

      this.productServices.getCartProducts(fav).subscribe((res) => {
        this.products = res;
      });
    });
  }
}
