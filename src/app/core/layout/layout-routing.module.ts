import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
//import { ReportsModule } from '../reports/reports.module';
//import { UsersModule } from '../users/users.module';

const routes: Routes = [/*
    { path: '', redirectTo: 'reports', pathMatch: 'full' },
    {
        path: 'reports',
        component: MainLayoutComponent,
        children: [
          { path: '', loadChildren: () => ReportsModule }
        ]
    },
    {
      path: 'users',
      component: MainLayoutComponent,
      children: [
        { path: '', loadChildren: () => UsersModule }
      ]
  }*/
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule {}
