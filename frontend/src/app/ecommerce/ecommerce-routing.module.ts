import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcommerceComponent } from './ecommerce.component';

const routes: Routes = [
  {
    path: '',
    component: EcommerceComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'product/:slug',
        loadChildren: () =>
          import('./pages/product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'recipe/:slug',
        loadChildren: () =>
          import('./pages/recipe/recipe.module').then((m) => m.RecipeModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcommerceRoutingModule {}
