import { NgModule } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TreeModule } from 'primeng/tree';
import { PaginatorModule } from 'primeng/paginator';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenuModule } from 'primeng/menu';

@NgModule({
  exports: [
    OverlayPanelModule,
    TreeModule,
    PaginatorModule,
    TieredMenuModule,
    DialogModule,
    AccordionModule,
    RadioButtonModule,
    MenuModule,
  ],
})
export class PrimeNgModule {}
