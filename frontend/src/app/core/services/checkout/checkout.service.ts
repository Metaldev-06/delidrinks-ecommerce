import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  CheckoutResponse,
  PaymentAttributes,
} from '../../interfaces/checkout.interface';
import { OrderResponse } from '../../interfaces/order.interface';
import { PaymentResponseMp } from '../../interfaces/payment.interface';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private order: BehaviorSubject<any> = new BehaviorSubject<any>({} as any);

  public order$ = this.order.asObservable();

  constructor() {
    const orderSessionStorage = sessionStorage.getItem('order');
    if (orderSessionStorage) {
      this.order.next(JSON.parse(orderSessionStorage));
    }
  }

  private readonly baseUrl = environment.apiUrl;
  private readonly basePaymentUrl = environment.apiPaymentUrl;

  private readonly http = inject(HttpClient);

  getOrders(page = 1, sort = 'createdAt:desc'): Observable<OrderResponse> {
    let params = new HttpParams()
      .set('populate', '*')
      .set('pagination[page]', page)
      .set('pagination[pageSize]', 5)
      .set('sort', sort);

    return this.http.get<OrderResponse>(`${this.baseUrl}/orders`, { params });
  }

  getOrderBySlug(slug: string): Observable<OrderResponse> {
    let params = new HttpParams()
      .set('filters[slug][$eq]', slug)
      .set('populate', '*');

    return this.http.get<OrderResponse>(`${this.baseUrl}/orders`, { params });
  }

  newOrder(form: PaymentAttributes): Observable<CheckoutResponse> {
    return this.http.post<CheckoutResponse>(`${this.baseUrl}/orders`, {
      data: form,
    });
  }

  goToPay(
    items: any,
    order: string,
    shipping_price: number,
    userId: number,
    jwt: string,
    orderId: number
  ): Observable<PaymentResponseMp> {
    return this.http.post<PaymentResponseMp>(
      `${this.basePaymentUrl}/create-order`,
      { items, order, shipping_price, userId, jwt, orderId }
    );
  }

  //!UPDATE ORDER WITH SESSION STORAGE

  public updateLocalOrder(order: any) {
    this.order.next(order);
    sessionStorage.setItem('order', JSON.stringify(order));
  }
}
