import { Component, Input } from '@angular/core';
import { ProductDatum } from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-payment-product-card',
  templateUrl: './payment-product-card.component.html',
  styleUrls: ['./payment-product-card.component.scss'],
})
export class PaymentProductCardComponent {
  @Input() product!: ProductDatum;
}
