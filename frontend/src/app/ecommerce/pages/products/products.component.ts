import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
export class ProductsComponent implements OnInit {
  selectForm!: FormGroup;

  products: ProductDatum[] = [];

  first: number = 0;
  rows: number = 1;
  totalRecords: number = 0;
  currentPage: number = 1;

  isEmpty: boolean = true;
  isLoading: boolean = true;

  category: string = '';
  subcategory: string = '';
  query!: string;

  private readonly productService = inject(ProductServices);
  private readonly router = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.getParamSlug();
    this.selectForm = this.initselectForm();
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
    this.productService
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
    console.log(this.selectForm.value.filter);
    this.getProductByCategories(
      this.category,
      this.subcategory,
      this.currentPage,
      this.query,
      this.selectForm.value.filter
    );
  }
}
