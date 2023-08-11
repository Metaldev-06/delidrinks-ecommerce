import { NgModule } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TreeModule } from 'primeng/tree';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  exports: [CarouselModule, OverlayPanelModule, TreeModule, PaginatorModule],
})
export class PrimeNgModule {}
