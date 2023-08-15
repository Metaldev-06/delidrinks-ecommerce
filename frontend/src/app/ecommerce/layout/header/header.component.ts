import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { CategoryDatum } from 'src/app/core/interfaces/category.interfaces';
import { CartService } from 'src/app/core/services/cart-services/cart.service';
import { ProductServices } from 'src/app/core/services/product-services/product-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('filter') filterPanel!: OverlayPanel;
  searchForm!: FormGroup;

  files!: TreeNode[];
  categories!: CategoryDatum[];
  totalProductToCart = signal<number>(0);
  isLogued = false;

  selectedFile!: any;

  private readonly productService = inject(ProductServices);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.getCategories();
    this.searchForm = this.initSearchForm();
    this.getProductsToCart();
  }

  getCategories() {
    this.productService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
      this.transformData(res);
    });
  }

  transformData(apiResponse: any) {
    const transformedData = apiResponse.data
      .filter((category: any) => category.attributes.brands.data.length > 0) // Filtrar las categorías con marcas
      .map((category: any) => {
        const categoryLabel = category.attributes.name;
        const categoryData = category.attributes.slug;
        const brandsData = category.attributes.brands.data;

        const children = brandsData.map((brand: any) => ({
          label: brand.attributes.name,
          data: brand.attributes.slug,
        }));

        return {
          label: categoryLabel,
          data: categoryData,
          children: children,
        };
      });

    this.files = transformedData;
  }

  nodeExpand(event: any) {}
  nodeCollapse(event: any) {}
  nodeUnselect(event: any) {}

  nodeSelect(event: any) {
    this.filterPanel.hide();

    this.router.navigate([`/products`], {
      queryParams: {
        category: event.node.data,
      },
    });
    if (event.node.parent) {
      this.router.navigate([`/products`], {
        queryParams: {
          category: event.node.parent.data,
          subcategory: event.node.data,
        },
      });
    }
  }
  initSearchForm(): FormGroup {
    return this.formBuilder.group({
      product: [''],
    });
  }

  SearchFormProducts() {
    this.router.navigate(['/products'], {
      queryParams: { query: this.searchForm.value.product.toLowerCase() },
    });

    this.searchForm.reset();
  }

  getProductsToCart() {
    this.cartService.getCartObservable().subscribe((products) => {
      const totalProductos = products.reduce(
        (total, producto) => total + producto.quantity,
        0
      );

      this.totalProductToCart.set(totalProductos);
    });
  }
}
