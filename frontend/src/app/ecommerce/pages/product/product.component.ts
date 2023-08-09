import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  ProductDatum,
  PurpleAttributes,
} from 'src/app/core/interfaces/product';
import { RecipeDatum } from 'src/app/core/interfaces/recipe.interfaces';
import { ProductServices } from 'src/app/core/services/product-services/product-services.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product!: PurpleAttributes;
  products!: ProductDatum[];
  recipes!: RecipeDatum[];

  productService = inject(ProductServices);
  router = inject(ActivatedRoute);
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
    });
  }

  getRecipes(category: string) {
    this.productService.getRecipesByCategory(category).subscribe((res) => {
      this.recipes = res;
    });
  }

  getProducts(category: string) {
    this.productService.getProductsByCategory(category).subscribe((res) => {
      this.products = res;
    });
  }
}
