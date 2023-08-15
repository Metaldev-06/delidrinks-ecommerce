import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { EcommerceComponent } from './ecommerce.component';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EcommerceComponent],
  imports: [CommonModule, EcommerceRoutingModule, LayoutModule, SharedModule],
})
export class EcommerceModule {}
