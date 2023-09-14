import {
  Component,
  OnInit,
  inject,
  signal,
  Signal,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductDatum } from 'src/app/core/interfaces/product';
import { RecipeDatum } from 'src/app/core/interfaces/recipe.interfaces';
import { ProductServices } from 'src/app/core/services/product-services/product-services.service';
import { RecipesService } from 'src/app/core/services/recipe-services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // products = signal<ProductDatum[]>([]);
  products!: Signal<ProductDatum[]>;
  // recipes!: Signal<RecipeDatum[]>;
  recipes = signal<RecipeDatum[]>([]);

  // private subscription!: Subscription;

  private readonly productService = inject(ProductServices);
  private readonly recipesService = inject(RecipesService);

  ngOnInit(): void {
    this.getProducts();
    this.getRecipes();
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  getProducts() {
    this.products = this.productService.getAllProducts();
  }

  getRecipes() {
    // this.recipes = this.recipesService.getRecipes();
    const recipes = JSON.parse(sessionStorage.getItem('recipes')!);

    if (recipes) {
      this.recipes.set(recipes);
      return;
    }

    this.recipesService.getRecipes().subscribe((res) => {
      this.recipes.set(res);
      sessionStorage.setItem('recipes', JSON.stringify(res));
    });
  }
}
