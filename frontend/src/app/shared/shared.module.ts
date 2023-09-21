import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SliderProductsComponent } from './slider-products/slider-products.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ImageByCountryPipe } from './pipes/image-by-country/image-by-country.pipe';
import { StockPipe } from './pipes/stock/stock.pipe';
import { StatePayPipe } from './pipes/state-pay/state-pay.pipe';
import { QuantityPipe } from './pipes/quantity/quantity.pipe';
import { NumberPhonePipe } from './pipes/number-phone/number-phone.pipe';
import { CardsComponent } from './cards/cards.component';
import { RouterModule } from '@angular/router';
import { OurServicesComponent } from './our-services/our-services/our-services.component';
import { GiftComponent } from './gift/gift.component';
import { RecipeSliderComponent } from './recipe-slider/recipe-slider.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { DifficultyPipe } from './pipes/difficulty/difficulty.pipe';
import { LoaderComponent } from './loader/loader.component';
import { CartComponent } from './cart/cart.component';
import { CardCartComponent } from './card-cart/card-cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { IsPrimaryPipe } from './pipes/isPrimary/is-primary.pipe';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { NumberPhoneComponent } from './number-phone/number-phone.component';
import { PersonalDataCardComponent } from './personal-data-card/personal-data-card.component';
import { NumberPhoneCardComponent } from './number-phone-card/number-phone-card.component';
import { PersonalAddressCardComponent } from './personal-address-card/personal-address-card.component';
import { PersonalAddressComponent } from './personal-address/personal-address.component';
import { ShippingMethodComponent } from './shipping-method/shipping-method.component';
import { ImagePipe } from './pipes/image/image.pipe';
import { PaymentProductCardComponent } from './payment-product-card/payment-product-card.component';
import { BrandPipePipe } from './pipes/brand-pipe/brand-pipe.pipe';
import { PaymentInfoCardComponent } from './payment-info-card/payment-info-card.component';
import { FormCreditCardComponent } from './form-credit-card/form-credit-card.component';
import { PayConditionPipe } from './pipes/pay-condition/pay-condition.pipe';
import { DispatchedPipe } from './pipes/dispatched/dispatched.pipe';

@NgModule({
  declarations: [
    SliderProductsComponent,
    ImageByCountryPipe,
    StockPipe,
    StatePayPipe,
    QuantityPipe,
    NumberPhonePipe,
    CardsComponent,
    OurServicesComponent,
    GiftComponent,
    RecipeSliderComponent,
    RecipeCardComponent,
    DifficultyPipe,
    LoaderComponent,
    CartComponent,
    CardCartComponent,
    MessageComponent,
    IsPrimaryPipe,
    PersonalDataComponent,
    NumberPhoneComponent,
    PersonalDataCardComponent,
    NumberPhoneCardComponent,
    PersonalAddressCardComponent,
    PersonalAddressComponent,
    ShippingMethodComponent,
    ImagePipe,
    PaymentProductCardComponent,
    BrandPipePipe,
    PaymentInfoCardComponent,
    FormCreditCardComponent,
    PayConditionPipe,
    DispatchedPipe,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    RouterModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  exports: [
    SliderProductsComponent,
    OurServicesComponent,
    GiftComponent,
    RecipeSliderComponent,
    StockPipe,
    StatePayPipe,
    QuantityPipe,
    NumberPhonePipe,
    DifficultyPipe,
    CardsComponent,
    LoaderComponent,
    CartComponent,
    MessageComponent,
    IsPrimaryPipe,
    PersonalDataCardComponent,
    NumberPhoneCardComponent,
    PersonalAddressCardComponent,
    PersonalAddressComponent,
    ShippingMethodComponent,
    ImagePipe,
    PaymentProductCardComponent,
    BrandPipePipe,
    PaymentInfoCardComponent,
    FormCreditCardComponent,
    PayConditionPipe,
    DispatchedPipe,
  ],
})
export class SharedModule {}
