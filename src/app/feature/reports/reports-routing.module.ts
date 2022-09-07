import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/core/layout/layout.component';
import { ReportComponent } from './components/report/report.component';
import { ReportScrollComponent } from './components/report-scroll/report-scroll.component';
import { ReportGlobalComponent } from './components/report-global/report-global.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: 'scroll', component: ReportScrollComponent },
          { path: 'globale', component: ReportGlobalComponent },
          { path: '', component: ReportComponent }
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
export class ReportsRoutingModule {}
