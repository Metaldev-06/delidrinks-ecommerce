import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';

@NgModule({
  declarations: [ShoppingComponent],
  imports: [CommonModule, ShoppingRoutingModule, SharedModule, PrimeNgModule],
})
export class ShoppingModule {}
