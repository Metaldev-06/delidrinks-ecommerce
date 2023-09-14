import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  UploadImageResponse,
  User,
  UserBody,
  UserResponse,
} from '../../interfaces/user.interfaces';
import { PhoneBody, PhonesResponse } from '../../interfaces/phones.interfaces';
import {
  AddressBody,
  AddressResponse,
} from '../../interfaces/address.interface';
import { CookieService } from 'ngx-cookie-service';
import {
  UpdatePasswordBody,
  UpdatePasswordResponse,
} from '../../interfaces/change-password.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isAutenticate: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private userData: BehaviorSubject<User> = new BehaviorSubject<User>(
    {} as User
  );
  user$ = this.userData.asObservable();

  private token!: string;

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly cookieService = inject(CookieService);

  constructor() {
    const userDataLocalStorage = localStorage.getItem('userData');
    if (userDataLocalStorage) {
      this.userData.next(JSON.parse(userDataLocalStorage));
    }
    const token = this.cookieService.get('accessToken');

    if (token) {
      this.isAutenticate.next(true);
    }
  }

  //!USER

  getUser(): Observable<User> {
    let params: HttpParams = new HttpParams().set('populate', '*');

    return this.http.get<User>(`${this.baseUrl}/users/me`, { params });
  }

  updateUserData(form: UserBody, user: User): Observable<UserResponse> {
    const { id } = user;
    return this.http.put<UserResponse>(`${this.baseUrl}/users/${id}`, form);
  }

  updateUserImage(
    formData: FormData,
    imageId: string
  ): Observable<UploadImageResponse> {
    console.log(formData);

    return this.http.post<UploadImageResponse>(
      `${this.baseUrl}/upload/${imageId}`,
      formData
    );
  }

  updatePassword(form: UpdatePasswordBody): Observable<UpdatePasswordResponse> {
    return this.http.post<UpdatePasswordResponse>(
      `${this.baseUrl}/auth/change-password`,
      form
    );
  }

  //!NUMBER PHONE

  addNumberPhone(form: PhoneBody, user: User): Observable<PhonesResponse> {
    const { id } = user;
    const data = {
      name: form.name,
      area_code: form.area_code,
      number_phone: form.number_phone,
      users_permissions_user: id,
      primary: form.primary,
    };
    return this.http.post<PhonesResponse>(`${this.baseUrl}/phones`, { data });
  }

  updateNumberPhone(form: PhoneBody, user: User): Observable<PhonesResponse> {
    const { id } = user;
    const data = {
      name: form.name,
      area_code: form.area_code,
      number_phone: form.number_phone,
      users_permissions_user: id,
      primary: form.primary,
    };
    return this.http.put<PhonesResponse>(`${this.baseUrl}/phones/${form.id}`, {
      data,
    });
  }

  deleteNumberPhone(form: PhoneBody): Observable<void> {
    const { id } = form;
    return this.http.delete<void>(`${this.baseUrl}/phones/${id}`);
  }

  //!ADDRESS

  addAddress(form: AddressBody, user: User): Observable<AddressResponse> {
    const { id } = user;

    const data = {
      data: {
        province: form.province,
        postal_code: form.postal_code,
        city: form.city,
        address: form.address,
        observations: form.observations,
        primary: form.primary,
        name: form.name,
        users_permissions_users: id,
      },
    };
    return this.http.post<AddressResponse>(`${this.baseUrl}/addresses`, data);
  }

  updateAddress(form: AddressBody, user: User): Observable<AddressResponse> {
    const { id } = user;
    const data = {
      data: {
        province: form.province,
        postal_code: form.postal_code,
        city: form.city,
        address: form.address,
        observations: form.observations,
        primary: form.primary,
        name: form.name,
        users_permissions_users: id,
      },
    };

    return this.http.put<AddressResponse>(
      `${this.baseUrl}/addresses/${form.id}`,
      data
    );
  }

  deleteAddress(form: AddressBody): Observable<void> {
    const { id } = form;
    return this.http.delete<void>(`${this.baseUrl}/addresses/${id}`);
  }

  //!AUTH
  public getAutenticate(): Observable<boolean> {
    return this.isAutenticate.asObservable();
  }

  public setAutenticate(value: boolean): void {
    this.isAutenticate.next(value);
  }

  //!UPDATE LOCALUSERDATA

  public updateLocalUser(user: User) {
    this.userData.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
