import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/core/layout/layout.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', component: UserListComponent },
          { path: 'new', component: UserNewComponent },
          { path: 'profile/:id', component: UserDetailComponent }
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
export class UsersRoutingModule {}
