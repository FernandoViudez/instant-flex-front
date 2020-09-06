import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { FlexGuardGuard } from './_guards/flex-guard.guard';
import { SellGuardGuard } from './_guards/sell-guard.guard';
import { AdminGuardGuard } from './_guards/admin-guard.guard';

const routes: Routes = [
  /** For everyone */
  {
    path: 'login',
    loadChildren: () => import('./pages/_authentication/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/_authentication/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/_authentication/set-password/set-password.module').then(m => m.SetPasswordModule),
  },

  /** For flex users */
  {
    path: 'flex',
    loadChildren: () => import("./pages/_flex/flex.module").then(m => m.FlexModule),
    canActivate: [FlexGuardGuard]
  },

  /** For sell users */
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      // {
      //   path: 'myProfile',
      //   loadChildren: () => import("./pages/_myProfile/my-profile.module").then( m => m.MyProfileModule ),
      // },
      {
        path: 'products',
        loadChildren: () => import("./pages/_products/products.module").then(m => m.ProductsModule),
      },
      {
        path: 'sells',
        loadChildren: () => import("./pages/_sells/sells.module").then(m => m.SellsModule),
      },
    ],
    canActivate: [SellGuardGuard]
  },

  { path: '**', redirectTo: '/' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
