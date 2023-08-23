import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcommerceComponent } from './ecommerce.component';
import {
  isAutenticateGuard,
  isAutenticateMatchGuard,
} from '../core/guards/is-autenticate/is-autenticate.guard';

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
      {
        path: 'products',
        loadChildren: () =>
          import('./pages/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./pages/user/user.module').then((m) => m.UserModule),
        canActivate: [isAutenticateGuard],
        canMatch: [isAutenticateMatchGuard],
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./pages/favorites/favorites.module').then(
            (m) => m.FavoritesModule
          ),
        canActivate: [isAutenticateGuard],
        canMatch: [isAutenticateMatchGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcommerceRoutingModule {}
