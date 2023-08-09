import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ],
  imports: [CommonModule, PrimeNgModule, RouterModule],
  exports: [
    SliderProductsComponent,
    OurServicesComponent,
    GiftComponent,
    RecipeSliderComponent,
  ],
})
export class SharedModule {}
