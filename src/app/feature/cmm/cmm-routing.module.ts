import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/core/layout/layout.component'
import { CmmListComponent } from './components/cmm-list/cmm-list.component';
import { CmmDetailComponent } from './components/cmm-detail/cmm-detail.component';
import { CmmImportComponent } from './components/cmm-import/cmm-import.component';



const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', component: CmmListComponent },
          { path: 'import', component: CmmImportComponent },
          { path: 'detail/:ArticleCode', component: CmmDetailComponent }
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
export class CMMRoutingModule {}
