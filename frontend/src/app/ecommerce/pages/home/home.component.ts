import { Component, OnInit, inject, signal, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDatum } from 'src/app/core/interfaces/product';
import { Recipe, RecipeDatum } from 'src/app/core/interfaces/recipe.interfaces';
import { ProductServices } from 'src/app/core/services/product-services/product-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // products = signal<ProductDatum[]>([]);
  products!: Signal<ProductDatum[]>;
  recipes!: Signal<RecipeDatum[]>;

  private readonly productService = inject(ProductServices);

  ngOnInit(): void {
    this.getProducts();
    this.getRecipes();
  }

  getProducts() {
    this.products = this.productService.getAllProducts();
  }

  getRecipes() {
    this.recipes = this.productService.getRecipes();
  }
}
