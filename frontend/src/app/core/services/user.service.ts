import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isAutenticate: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getUser(): Observable<User> {
    let params: HttpParams = new HttpParams().set('populate', '*');

    return this.http.get<User>(`${this.baseUrl}/users/me`, { params });
  }

  getAutenticate(): Observable<boolean> {
    return this.isAutenticate.asObservable();
  }

  setAutenticate(value: boolean): void {
    this.isAutenticate.next(value);
  }
}
