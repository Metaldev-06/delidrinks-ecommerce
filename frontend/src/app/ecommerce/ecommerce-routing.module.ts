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
      {
        path: 'checkout',
        loadChildren: () =>
          import('./pages/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
        canActivate: [isAutenticateGuard],
        canMatch: [isAutenticateMatchGuard],
      },
      {
        path: 'payment/:slug',
        loadChildren: () =>
          import('./pages/payment/payment.module').then((m) => m.PaymentModule),
        canActivate: [isAutenticateGuard],
        canMatch: [isAutenticateMatchGuard],
      },
      {
        path: 'resume/:slug',
        loadChildren: () =>
          import('./pages/resume/resume.module').then((m) => m.ResumeModule),
        canActivate: [isAutenticateGuard],
        canMatch: [isAutenticateMatchGuard],
      },
      {
        path: 'my-shopping',
        loadChildren: () =>
          import('./pages/shopping/shopping.module').then(
            (m) => m.ShoppingModule
          ),
        canActivate: [isAutenticateGuard],
        canMatch: [isAutenticateMatchGuard],
      },
      {
        path: 'user/change-password',
        loadChildren: () =>
          import('./pages/change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
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
