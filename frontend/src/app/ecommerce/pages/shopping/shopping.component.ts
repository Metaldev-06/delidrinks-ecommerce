import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderDatum } from 'src/app/core/interfaces/order.interface';
import { CheckoutService } from 'src/app/core/services/checkout/checkout.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
})
export class ShoppingComponent implements OnInit, OnDestroy {
  public orders!: OrderDatum[];
  public first = 0;
  public rows = 1;
  public totalRecords = 0;
  public currentPage = 1;

  private subscription!: Subscription;

  private readonly checkoutService = inject(CheckoutService);

  ngOnInit(): void {
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getOrders(page?: number) {
    this.subscription = this.checkoutService
      .getOrders(page)
      .subscribe((res) => {
        this.orders = res.data;
        this.totalRecords = res.meta.pagination.pageCount;
      });
  }

  public onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.first = event.first;
    this.rows = event.rows;

    this.getOrders(this.currentPage);
  }
}
