import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Product, ProductDatum } from 'src/app/core/interfaces/product';
import {
  PurpleAttributes,
  RecipeDatum,
} from 'src/app/core/interfaces/recipe.interfaces';
import { ProductServices } from 'src/app/core/services/product-services/product-services.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  recipe!: PurpleAttributes;

  products$!: Observable<ProductDatum[]>;
  recipes$!: Observable<RecipeDatum[]>;

  image = signal<string>('');
  category = signal<string>('');

  private readonly baseUrl = environment.imageUrl;
  private readonly productService = inject(ProductServices);
  private readonly router = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getParamSlug();
  }

  getParamSlug() {
    this.router.params.subscribe((res) => {
      const IdRecipeSlug = res['slug'];
      this.getRecipeBySlug(IdRecipeSlug);
    });
  }

  getRecipeBySlug(slug: string) {
    this.productService.getRecipeBySlug(slug).subscribe((res) => {
      this.recipe = res.attributes;
      this.getRelations(this.recipe);

      this.getProductsRelated(this.category());
      this.getRecipesRelated(this.category());
    });
  }

  getRelations(recipe: PurpleAttributes) {
    this.image.set(`${this.baseUrl}${recipe.image.data.attributes.url}`);
    this.category.set(`${recipe.categories.data[0].attributes.name}`);
  }

  getProductsRelated(category: string) {
    this.products$ = this.productService.getProductsByCategory(category).pipe(
      map((res) => {
        return res.data;
      })
    );
  }

  getRecipesRelated(category: string) {
    this.recipes$ = this.productService.getRecipesByCategory(category);
  }
}
