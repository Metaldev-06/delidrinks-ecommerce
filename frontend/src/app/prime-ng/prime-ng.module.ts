import { NgModule } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TreeModule } from 'primeng/tree';
import { PaginatorModule } from 'primeng/paginator';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  exports: [
    OverlayPanelModule,
    TreeModule,
    PaginatorModule,
    TieredMenuModule,
    DialogModule,
  ],
})
export class PrimeNgModule {}
