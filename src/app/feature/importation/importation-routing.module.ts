import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/core/layout/layout.component';
import { ImportationComponent } from './importation.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', component: ImportationComponent }
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
export class ImportationRoutingModule {}
