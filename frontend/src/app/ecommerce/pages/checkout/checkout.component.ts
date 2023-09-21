import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartProduct } from 'src/app/core/interfaces/cart-product.interfaces';
import { Data } from 'src/app/core/interfaces/checkout.interface';
import { Message } from 'src/app/core/interfaces/message';
import { ShippingMethod } from 'src/app/core/interfaces/shipping-method.interface';
import { Address, User } from 'src/app/core/interfaces/user.interfaces';
import { CartService } from 'src/app/core/services/cart-services/cart.service';
import { CheckoutService } from 'src/app/core/services/checkout/checkout.service';
import { MessageService } from 'src/app/core/services/message-services/message.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { v4 as uuid } from 'uuid';

const uuidV4 = uuid();

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public personalData!: User;
  public shippingDetails!: Address[];
  public shippingDetail!: any;
  public shipphingMethod!: ShippingMethod;
  public showShippingMethod = true;
  public showPayment = true;

  private subscription!: Subscription;
  private productCart!: CartProduct[];

  private readonly userService = inject(UserService);
  private readonly cartService = inject(CartService);
  private readonly checkoutService = inject(CheckoutService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.getUserData();
    this.getProductCart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProductCart() {
    this.productCart = this.cartService.getCart();
  }

  getUserData() {
    this.subscription = this.userService.getUser().subscribe((resp) => {
      this.personalData = resp;
      this.shippingDetails = resp.addresses;
    });
  }

  getShipphingDetail(data: any) {
    this.shippingDetail = data;
    this.showShippingMethod = false;
  }
  getShipphingMethod(data: ShippingMethod) {
    this.shipphingMethod = data;
    this.showPayment = false;
  }

  payment() {
    if (
      this.shippingDetail === undefined ||
      this.shipphingMethod === undefined
    ) {
      const message: Message = {
        title: 'Complete los campos',
        message: 'Es necesario completar todos los campos para seguir',
      };

      this.messageService.showMessage(message);
      return;
    }

    const order = uuidV4;
    const date = new Date();
    const data = {
      users_permissions_user: this.personalData.id,
      completed: false,
      name: order,
      slug: order,
      addresses: this.shippingDetail.id,
      shipping_method: this.shipphingMethod.shipping_method,
      products: this.productCart,
      date: date,
      shipping_price: this.shipphingMethod.price,
    };

    this.newOrder(data);
  }

  newOrder(data: any) {
    this.checkoutService.newOrder(data).subscribe((resp) => {
      data.id = resp.data.id;
      localStorage.removeItem('cart');
      this.checkoutService.updateLocalOrder(data);
      this.router.navigate(['/payment/' + data.slug]);
    });
  }
}
