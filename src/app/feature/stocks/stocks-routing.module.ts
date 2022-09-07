import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/core/layout/layout.component'
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';
import { StockImportComponent } from './components/stock-import/stock-import.component';



const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', component: StockListComponent },
          { path: 'import', component: StockImportComponent },
          { path: 'detail/:articleCode', component: StockDetailComponent }
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
export class StocksRoutingModule {}
