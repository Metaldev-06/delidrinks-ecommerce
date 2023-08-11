import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector, Signal, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { RecipeDatum } from '../../interfaces/recipe.interfaces';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private readonly baseUrl = environment.apiUrl;

  private readonly http = inject(HttpClient);
  private readonly injector = inject(Injector);

  private getCommonParams(): HttpParams {
    return new HttpParams()
      .set('populate[image][fields][0]', 'url')
      .set('populate[categories][fields][0]', 'name');
  }

  getRecipes(): Signal<RecipeDatum[]> {
    const params = this.getCommonParams();

    return toSignal(
      this.http.get<RecipeDatum[]>(`${this.baseUrl}/recipes`, { params }).pipe(
        map((res: any) => {
          return res.data;
        })
      ),
      { initialValue: [], injector: this.injector }
    );
  }

  getRecipeBySlug(slug: string): Observable<RecipeDatum> {
    const params = this.getCommonParams().set('filters[slug][$eq]', slug);

    return this.http
      .get<RecipeDatum>(`${this.baseUrl}/recipes`, { params })
      .pipe(
        map((res: any) => {
          return res.data[0];
        })
      );
  }

  getRecipesByCategory(category: string): Observable<RecipeDatum[]> {
    const params = this.getCommonParams().set(
      'filters[categories][name][$eq]',
      category
    );

    return this.http
      .get<RecipeDatum[]>(`${this.baseUrl}/recipes`, { params })
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }
}
