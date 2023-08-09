import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SliderBannerComponent } from './components/slider-banner/slider-banner/slider-banner.component';
import { CategoriesHomeComponent } from './components/categories-home/categories-home.component';

@NgModule({
  declarations: [HomeComponent, SliderBannerComponent, CategoriesHomeComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
