import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'verify-account',
    loadChildren: () =>
      import('./pages/verify-account/verify-account.module').then(
        (m) => m.VerifyAccountModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
