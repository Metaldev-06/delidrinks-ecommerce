import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyAccountRoutingModule } from './verify-account-routing.module';
import { VerifyAccountComponent } from './verify-account.component';


@NgModule({
  declarations: [
    VerifyAccountComponent
  ],
  imports: [
    CommonModule,
    VerifyAccountRoutingModule
  ]
})
export class VerifyAccountModule { }
