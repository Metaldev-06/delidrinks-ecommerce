import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule, ProductRoutingModule, SharedModule],
})
export class ProductModule {}
