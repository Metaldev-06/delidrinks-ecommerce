import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartProduct } from 'src/app/core/interfaces/cart-product.interfaces';
import { Message } from 'src/app/core/interfaces/message';
import {
  ProductDatum,
  PurpleAttributes,
} from 'src/app/core/interfaces/product';
import { RecipeDatum } from 'src/app/core/interfaces/recipe.interfaces';
import { CartService } from 'src/app/core/services/cart-services/cart.service';
import { MessageService } from 'src/app/core/services/message-services/message.service';
import { ProductServices } from 'src/app/core/services/product-services/product-services.service';
import { RecipesService } from 'src/app/core/services/recipe-services/recipes.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  purchaserForm!: FormGroup;

  product!: PurpleAttributes;
  products!: ProductDatum[];
  recipes!: RecipeDatum[];

  image = signal<string>('');
  brand = signal<string>('');
  category = signal<string>('');
  markdown = signal<string>('');
  stock = 0;

  private readonly productService = inject(ProductServices);
  private readonly recipesService = inject(RecipesService);
  private readonly router = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly messageService = inject(MessageService);
  ngOnInit(): void {
    this.getParamSlug();
    this.purchaserForm = this.initPurchaserForm();
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
    this.image.set(`${product.image.data[0].attributes.url}`);
    this.brand.set(`${product.brand.data.attributes.name}`);
    this.category.set(`${product.category.data.attributes.name}`);
    this.stock = product.stock;
  }

  get stockOptions(): number[] {
    return Array.from({ length: this.stock }, (_, index) => index + 1);
  }

  initPurchaserForm(): FormGroup {
    return this.formBuilder.group({
      quantity: [1, [Validators.min(1), Validators.max(this.stock)]],
    });
  }
  addToCart() {
    if (this.product.stock === 0) {
      const message: Message = {
        title: 'Stock Agotado',
        message: 'Este producto está fuera de stock.',
      };
      this.messageService.showMessage(message);
      return;
    }

    const body: CartProduct = {
      slug: this.product.slug,
      quantity: Number(this.purchaserForm.value.quantity),
    };

    this.cartService.addToCartAssigning(body);
  }
}
