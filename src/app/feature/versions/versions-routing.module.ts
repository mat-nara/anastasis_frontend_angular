import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/core/layout/layout.component';
import { VersionListComponent } from './components/version-list/version-list.component';
import { VersionNewComponent } from './components/version-new/version-new.component'; 
import { VersionDetailComponent } from './components/version-detail/version-detail.component'; 


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', component: VersionListComponent },
          { path: 'new', component: VersionNewComponent },
          { path: 'detail/:id', component: VersionDetailComponent }
        ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class VersionsRoutingModule {}
