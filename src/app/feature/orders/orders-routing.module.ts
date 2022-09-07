import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/core/layout/layout.component'
import { OrderListComponent } from './components/order-list/order-list.component'; 
import { OrderNewComponent } from './components/order-new/order-new.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', component: OrderListComponent },
          { path: 'new', component: OrderNewComponent },
          { path: 'detail/:id', component: OrderDetailComponent }
        ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrdersRoutingModule {}
