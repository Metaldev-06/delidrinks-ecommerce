import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  Product,
  ProductDatum,
  PurpleAttributes,
} from '../../interfaces/product';
import { CategoryDatum } from '../../interfaces/category.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  private readonly baseUrl = environment.apiUrl;

  private readonly http = inject(HttpClient);
  private readonly injector = inject(Injector);

  private getCommonParams(): HttpParams {
    return new HttpParams()
      .set('populate[categories][fields][0]', 'name')
      .set('populate', 'image')
      .set('populate[brand][fields][0]', 'name')
      .set('populate[category][fields][0]', 'name');
  }

  getAllProducts(): Signal<ProductDatum[]> {
    const params = this.getCommonParams();

    return toSignal(
      this.http
        .get<ProductDatum[]>(`${this.baseUrl}/products`, { params })
        .pipe(
          map((res: any) => {
            return res.data;
          })
        ),
      { initialValue: [], injector: this.injector }
    );
  }

  getProductBySlug(slug: string): Observable<ProductDatum> {
    const params = this.getCommonParams().set('filters[slug][$eq]', slug);

    return this.http
      .get<ProductDatum>(`${this.baseUrl}/products`, { params })
      .pipe(
        map((res: any) => {
          return res.data[0];
        })
      );
  }

  getProductsByCategory(
    category?: string,
    subcategory?: string,
    page: number = 1,
    query?: string,
    sort: string = 'name:asc'
  ): Observable<Product> {
    let params = this.getCommonParams()
      .set('pagination[page]', page)
      .set('sort', sort);
    // .set('pagination[pageSize]', 2);

    if (category) {
      params = params.set('filters[subcategory][$eq]', category);
    }
    if (subcategory) {
      params = params.set('filters[category][slug][$eq]', subcategory!);
    }
    if (query) {
      params = params.set('filters[$or][0][name][$contains]', query!);
      params = params.set('filters[$or][1][brand][name][$contains]', query!);
      params = params.set('filters[$or][2][category][name][$contains]', query!);
    }

    return this.http.get<Product>(`${this.baseUrl}/products`, {
      params,
    });
  }

  getCartProducts(products: any[]): Observable<ProductDatum[]> {
    let params = this.getCommonParams();
    products.forEach((productSlug, index) => {
      params = params.set(`filters[slug][$in][${index}]`, productSlug.slug);
    });

    return this.http
      .get<ProductDatum[]>(`${this.baseUrl}/products`, { params })
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  getCategories(): Observable<CategoryDatum[]> {
    let params = new HttpParams()
      .set('[fields][0]', 'name')
      .set('[fields][1]', 'slug')
      .set('populate[brands][fields][0]', 'name')
      .set('populate[brands][fields][1]', 'slug');

    return this.http
      .get<CategoryDatum[]>(`${this.baseUrl}/categories`, { params })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
