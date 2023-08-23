import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  isLoguedGuard,
  isLoguedMatchGuard,
} from './core/guards/is-logued/is-logued.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./ecommerce/ecommerce.module').then((m) => m.EcommerceModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [isLoguedGuard],
    canMatch: [isLoguedMatchGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
