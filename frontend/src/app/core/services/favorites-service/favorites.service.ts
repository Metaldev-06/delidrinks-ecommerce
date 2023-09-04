import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ProductDatum, PurpleAttributes } from '../../interfaces/product';
import { Favorites, User } from '../../interfaces/user.interfaces';
import { Datum, FavoritesLocal } from '../../interfaces/favorites.interfaces';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<FavoritesLocal>(
    {} as FavoritesLocal
  );
  public favorites$ = this.favoritesSubject.asObservable();

  private readonly baseUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  constructor() {
    this.getFavoritesFromStorage();
    // this.loadFavorites();
  }

  private getFavoritesFromStorage() {
    const favorites = JSON.parse(sessionStorage.getItem('favorites') || '[]');
    this.favoritesSubject.next(favorites);
  }

  // private loadFavorites() {
  //   const userData: User = JSON.parse(localStorage.getItem('userData') || '{}');
  //   if (userData.id) {
  //     this.getFavorites(userData).subscribe((favorites) => {
  //       this.updateFavoritesInStorage(favorites);
  //     });
  //   }
  // }

  public updateFavoritesInStorage(favorites: FavoritesLocal[]) {
    sessionStorage.removeItem('favorites');
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
    this.getFavoritesFromStorage();
  }

  getFavorites(user: User): Observable<FavoritesLocal[]> {
    const { id } = user;

    let params = new HttpParams()
      .set('filters[users_permissions_users][id][$eq]', id)
      .set('[fields][0]', 'slug');

    return this.http.get<FavoritesLocal[]>(`${this.baseUrl}/favorites`, {
      params,
    });
  }

  addFavorite(product: ProductDatum, user: User): Observable<Favorites> {
    const { id } = user;
    const { slug } = product.attributes;

    const body = {
      data: {
        slug: slug,
        users_permissions_users: [id],
      },
    };

    return this.http.post<Favorites>(`${this.baseUrl}/favorites`, body);
  }

  deleteFavorite(id: number): Observable<Favorites> {
    return this.http.delete<Favorites>(`${this.baseUrl}/favorites/${id}`);
  }
}
