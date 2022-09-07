import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/core/layout/layout.component'
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleNewComponent } from './components/article-new/article-new.component';
import { ArticleImportComponent } from './components/article-import/article-import.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';



const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', component: ArticleListComponent },
          { path: 'new', component: ArticleNewComponent },
          { path: 'import', component: ArticleImportComponent },
          { path: 'detail/:CODE', component: ArticleDetailComponent }
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
export class ArticlesRoutingModule {}
