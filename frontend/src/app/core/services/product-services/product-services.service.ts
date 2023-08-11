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
import { Recipe, RecipeDatum } from '../../interfaces/recipe.interfaces';
import { CategoryDatum } from '../../interfaces/category.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  private readonly baseUrl = environment.apiUrl;

  private readonly http = inject(HttpClient);
  private readonly injector = inject(Injector);

  getAllProducts(): Signal<ProductDatum[]> {
    const params =
      '?populate[categories][fields][0]=name&populate[image][fields][0]=url&populate[brand][fields][0]=name&populate[category][fields][0]=name';

    return toSignal(
      this.http.get<ProductDatum[]>(`${this.baseUrl}/products${params}`).pipe(
        map((res: any) => {
          return res.data;
        })
      ),
      { initialValue: [], injector: this.injector }
    );
  }

  getProductBySlug(slug: string): Observable<PurpleAttributes> {
    const params = `?populate[categories][fields][0]=name&populate[image][fields][0]=url&populate[brand][fields][0]=name&filters[slug][$eq]=${slug}&populate[category][fields][0]=name&populate[image][fields][1]=url`;

    return this.http
      .get<ProductDatum>(`${this.baseUrl}/products${params}`)
      .pipe(
        map((res: any) => {
          return res.data[0].attributes;
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
    let params = new HttpParams()

      .set('populate[categories][fields][0]', 'name')
      .set('populate[image][fields][0]', 'url')
      .set('populate[brand][fields][0]', 'name')
      .set('populate[category][fields][0]', 'name')
      .set('populate[image][fields][1]', 'url')
      .set('pagination[page]', page)
      .set('sort', sort);
    // .set('pagination[pageSize]', 2);

    if (category) {
      params = params.set('filters[category][slug][$eq]', category);
    }
    if (subcategory) {
      params = params.set('filters[brand][slug][$eq]', subcategory!);
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

  getRecipes(): Signal<RecipeDatum[]> {
    const params =
      '?populate[image][fields][0]=url&populate[categories][fields][0]=name';
    return toSignal(
      this.http.get<RecipeDatum[]>(`${this.baseUrl}/recipes${params}`).pipe(
        map((res: any) => {
          return res.data;
        })
      ),
      { initialValue: [], injector: this.injector }
    );
  }

  getRecipeBySlug(slug: string): Observable<RecipeDatum> {
    const params = `?filters[slug][$eq]=${slug}&populate[image][fields][0]=url&populate[categories][fields][0]=name`;
    return this.http.get<RecipeDatum>(`${this.baseUrl}/recipes${params}`).pipe(
      map((res: any) => {
        return res.data[0];
      })
    );
  }

  getRecipesByCategory(category: string): Observable<RecipeDatum[]> {
    const params = `?filters[categories][name][$eq]=${category}&populate[image][fields][0]=url&populate[categories][fields][0]=name`;
    return this.http
      .get<RecipeDatum[]>(`${this.baseUrl}/recipes${params}`)
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  getCategories(): Observable<CategoryDatum[]> {
    const params = `?[fields][0]=name&[fields][1]=slug&populate[brands][fields][0]=name&populate[brands][fields][1]=slug`;

    return this.http
      .get<CategoryDatum[]>(`${this.baseUrl}/categories${params}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
