import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ProductDatum } from 'src/app/core/interfaces/product';
import { ProductServices } from 'src/app/core/services/product-services/product-services.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  selectForm!: FormGroup;

  products: ProductDatum[] = [];
  items!: MenuItem[];

  first = 0;
  rows = 1;
  totalRecords = 0;
  currentPage = 1;

  isEmpty: boolean = true;
  isLoading: boolean = true;

  category: string = '';
  subcategory: string = '';
  query!: string;

  private productsSubscription!: Subscription;

  private readonly productService = inject(ProductServices);
  private readonly router = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.getParamSlug();
    this.selectForm = this.initselectForm();

    this.items = [
      {
        label: 'Categorías',
        items: [
          {
            label: 'Todos',
            // icon: 'pi pi-plus',
            routerLink: ['/products'],
          },
          {
            label: 'Con alcohol',
            // icon: 'pi pi-plus',
            routerLink: ['/products'],
            queryParams: { category: 'with-alcohol' },
          },
          {
            label: 'Sin alcohol',
            // icon: 'pi pi-download',
            routerLink: ['/products'],
            queryParams: { category: 'without-alcohol' },
          },
          {
            label: 'Combos',
            // icon: 'pi pi-download',
            routerLink: ['/products'],
            queryParams: { category: 'combos' },
          },
        ],
      },
      {
        label: 'Subcategorías',
        items: [
          {
            label: 'whisky',
            // icon: 'pi pi-plus',
            routerLink: ['/products'],
            queryParams: { subcategory: 'whisky' },
          },
          {
            label: 'licor',
            // icon: 'pi pi-download',
            routerLink: ['/products'],
            queryParams: { subcategory: 'licor' },
          },
        ],
      },
    ];
  }

  getParamSlug() {
    this.router.queryParams.subscribe((params) => {
      this.category = params['category'];
      this.subcategory = params['subcategory'];
      this.query = params['query'];

      this.getProductByCategories(
        this.category,
        this.subcategory,
        this.currentPage,
        this.query
      );
    });
  }

  getProductByCategories(
    category?: string,
    subcategory?: string,
    page?: number,
    query?: string,
    sort?: string
  ) {
    this.productsSubscription = this.productService
      .getProductsByCategory(category, subcategory, page, query, sort)
      .subscribe({
        next: (res: any) => {
          this.isLoading = true;
          this.products = res.data;
          this.totalRecords = res.meta.pagination.pageCount;

          if (res.data.length > 0) {
            this.isEmpty = false;
          } else {
            this.isEmpty = true;
          }

          this.isLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.first = event.first;
    this.rows = event.rows;

    this.getProductByCategories(
      this.category,
      this.subcategory,
      this.currentPage,
      this.query,
      this.selectForm.value.filter
    );
  }

  initselectForm(): FormGroup {
    return this.formBuilder.group({
      filter: ['name:asc'],
    });
  }

  selectValue() {
    this.getProductByCategories(
      this.category,
      this.subcategory,
      this.currentPage,
      this.query,
      this.selectForm.value.filter
    );
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
