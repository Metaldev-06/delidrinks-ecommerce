import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class LayoutModule {}
