import { HttpClient } from '@angular/common/http';
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

  getProductsByCategory(category: string): Observable<ProductDatum[]> {
    const params = `?filters[category][name][$eq]=${category}&populate[categories][fields][0]=name&populate[image][fields][0]=url&populate[brand][fields][0]=name&populate[category][fields][0]=name&populate[image][fields][1]=url`;

    return this.http
      .get<ProductDatum[]>(`${this.baseUrl}/products${params}`)
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
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
}
