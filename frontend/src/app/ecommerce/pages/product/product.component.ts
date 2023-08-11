import { Component, OnInit, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  ProductDatum,
  PurpleAttributes,
} from 'src/app/core/interfaces/product';
import { RecipeDatum } from 'src/app/core/interfaces/recipe.interfaces';
import { ProductServices } from 'src/app/core/services/product-services/product-services.service';
import { RecipesService } from 'src/app/core/services/recipe-services/recipes.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  // purchaserForm!: FormGroup;

  product!: PurpleAttributes;
  products!: ProductDatum[];
  recipes!: RecipeDatum[];

  image = signal<string>('');
  brand = signal<string>('');
  category = signal<string>('');
  markdown = signal<string>('');
  stock = 0;

  private readonly baseUrl = environment.imageUrl;
  private readonly productService = inject(ProductServices);
  private readonly recipesService = inject(RecipesService);
  private readonly router = inject(ActivatedRoute);
  ngOnInit(): void {
    this.getParamSlug();
  }

  getParamSlug() {
    this.router.params.subscribe((res) => {
      const IdProductToken = res['slug'];
      this.getProductBySlug(IdProductToken);
    });
  }

  getProductBySlug(slug: string) {
    this.productService.getProductBySlug(slug).subscribe((res) => {
      this.getRecipes(res.category.data.attributes.name);
      this.getProducts(res.category.data.attributes.name);
      this.product = res;
      this.getRelations(this.product);

      this.markdown.set(this.product.review);
    });
  }

  getRecipes(category: string) {
    this.recipesService.getRecipesByCategory(category).subscribe((res) => {
      this.recipes = res;
    });
  }

  getProducts(category: string) {
    this.productService.getProductsByCategory(category).subscribe((res) => {
      this.products = res.data;
    });
  }

  getRelations(product: PurpleAttributes) {
    this.image.set(`${this.baseUrl}${product.image.data[0].attributes.url}`);
    this.brand.set(`${product.brand.data.attributes.name}`);
    this.category.set(`${product.category.data.attributes.name}`);
    this.stock = product.stock;
  }

  get stockOptions(): number[] {
    return Array.from({ length: this.stock }, (_, index) => index + 1);
  }
}
