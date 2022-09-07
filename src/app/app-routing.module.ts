import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: 'orders',       loadChildren: () => import('./feature/orders/orders.module').then((module) => module.OrdersModule), canActivate: [AuthGuard] },
  { path: 'versions',     loadChildren: () => import('./feature/versions/versions.module').then((module) => module.VersionsModule), canActivate: [AuthGuard] },
  { path: 'cmm',          loadChildren: () => import('./feature/cmm/cmm.module').then((module) => module.CmmModule), canActivate: [AuthGuard] },
  { path: 'stocks',       loadChildren: () => import('./feature/stocks/stocks.module').then((module) => module.StocksModule), canActivate: [AuthGuard] },
  { path: 'articles',     loadChildren: () => import('./feature/articles/articles.module').then((module) => module.ArticlesModule), canActivate: [AuthGuard] },
  { path: 'laboratories', loadChildren: () => import('./feature/laboratories/laboratories.module').then((module) => module.LaboratoriesModule), canActivate: [AuthGuard] },
  { path: 'importation',  loadChildren: () => import('./feature/importation/importation.module').then((module) => module.ImportationModule), canActivate: [AuthGuard] },
  { path: 'reports',      loadChildren: () => import('./feature/reports/reports.module').then((module) => module.ReportsModule), canActivate: [AuthGuard] },
  { path: 'users',        loadChildren: () => import('./feature/users/users.module').then((module) => module.UsersModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: 'reports', pathMatch: 'full' },
  /*{ path: '**', redirectTo: 'reports'}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
