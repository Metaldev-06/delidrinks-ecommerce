import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { CategoryDatum } from 'src/app/core/interfaces/category.interfaces';
import { ProductServices } from 'src/app/core/services/product-services/product-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchForm!: FormGroup;

  files!: TreeNode[];
  categories!: CategoryDatum[];

  selectedFile!: any;

  private readonly productService = inject(ProductServices);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.getCategories();
    this.searchForm = this.initSearchForm();
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

  nodeSelect(event: any) {
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

  nodeUnselect(event: any) {}

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
}
