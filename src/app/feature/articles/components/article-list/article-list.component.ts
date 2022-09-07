import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/core/models/article.model';
import { ArticleService } from 'src/app/core/services/article.service'; 
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  articlesDataSource!: MatTableDataSource<any>;
  displayedColumns!: any;

  constructor(
                private articleService: ArticleService,
                private router: Router,
                private toastrService: ToastrService
                ) { }

    ngOnInit(): void {

      this.articleService.getAllArticles().subscribe(
        (data: any) => {
          this.articlesDataSource  = new MatTableDataSource(data.map((article: any) => { return { ...article, actions: "" } }) );
          this.displayedColumns = ['CODE', 'Laboratory', 'designation', 'PU', 'DEV', 'ColisageStandard', 'poids', 'dimension', 'actions'];

          this.paginator._intl.itemsPerPageLabel  ="Articles par page";
          this.articlesDataSource.paginator       = this.paginator;
          this.articlesDataSource.sort            = this.sort;
          
        },(response) => {
          this.toastrService.error(response.error.message);
        }
      )
    }
  
    applyFilter(event: Event) {
      
      const filterValue = (event.target as HTMLInputElement).value;
      this.articlesDataSource.filter = filterValue.trim().toLowerCase();
      console.log(filterValue.trim().toLowerCase());
  
      if (this.articlesDataSource.paginator) {
        this.articlesDataSource.paginator.firstPage();
      }
    }
  
    onViewArticle(CODE: string){
      this.router.navigateByUrl('/articles/detail/'+CODE);
    }
  
    onDeleteArticle(name: string, CODE: string){
      if(confirm("êtes-vous sûre vouloir supprimer "+name+"?"))
      {
        this.articleService.deleteArticle(CODE).subscribe(
          (data: any) => {
            this.toastrService.success("Article supprimé avec succès!");
            window.location.reload();
          },(response) => {
            this.toastrService.error(response.error.message);
            this.ngOnInit();
          }
        )
      }
    }

}
