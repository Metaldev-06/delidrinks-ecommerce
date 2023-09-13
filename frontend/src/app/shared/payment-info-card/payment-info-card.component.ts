import {
  AfterViewChecked,
  Component,
  DoCheck,
  Input,
  OnInit,
} from '@angular/core';
import { OrderAttributes } from 'src/app/core/interfaces/order.interface';
import { ProductDatum } from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-payment-info-card',
  templateUrl: './payment-info-card.component.html',
  styleUrls: ['./payment-info-card.component.scss'],
})
export class PaymentInfoCardComponent implements OnInit, DoCheck {
  @Input() productInfo!: ProductDatum[];
  @Input() orderDetail!: OrderAttributes;

  subtotal = 0;
  shippingPrince = 0;
  // taxes = 1.21;
  total = 0;

  ngOnInit(): void {
    this.shippingPrince = this.orderDetail.shipping_price;
  }

  ngDoCheck(): void {
    // console.log(this.productInfo);
    this.getTotalProducts();
  }

  getTotalProducts() {
    this.subtotal = this.productInfo?.reduce((total, product) => {
      const price = product.attributes.price!;
      const cuantity = product.attributes.quantity!;
      return total + price * cuantity;
    }, 0);

    // this.total = this.subtotal * this.taxes + this.shippingPrince;
    this.total = this.subtotal + this.shippingPrince;
  }
}
