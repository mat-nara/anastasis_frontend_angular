import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/core/layout/layout.component'
import { LaboratoryListComponent } from './components/laboratory-list/laboratory-list.component';
import { LaboratoryNewComponent } from './components/laboratory-new/laboratory-new.component';
import { LaboratoryDetailComponent } from './components/laboratory-detail/laboratory-detail.component';



const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', component: LaboratoryListComponent },
          { path: 'new', component: LaboratoryNewComponent },
          { path: 'detail/:ABR', component: LaboratoryDetailComponent }
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
export class LaboratoriesRoutingModule {}
