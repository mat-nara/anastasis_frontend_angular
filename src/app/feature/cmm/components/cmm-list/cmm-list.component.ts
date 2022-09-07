import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalStorageService } from 'src/app/core/services/global-storage.service'; 
import { CMM } from 'src/app/core/models/cmm.model';
import { CMMService } from 'src/app/core/services/cmm.service'; 
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cmm-list',
  templateUrl: './cmm-list.component.html',
  styleUrls: ['./cmm-list.component.scss']
})
export class CmmListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  version!: any;
  articleWithCMMsDataSource!: MatTableDataSource<any>;
  displayedColumns!: any;

  constructor(
                private globalStorageService: GlobalStorageService,
                private CMMService: CMMService,
                private router: Router,
                private toastrService: ToastrService
                  ) { }

  ngOnInit(): void {

    this.version =  this.globalStorageService.get('ActiveVersion', true) as any;
    this.CMMService.getAllCMM(this.version.id).subscribe(
      (data) => {

        this.articleWithCMMsDataSource = new MatTableDataSource(data.map((article: any) => { return this.formatArticleWithCMMs(article) }) );
        this.displayedColumns             = [
                                              'CODE', 
                                              'laboratory_abr', 
                                              'designation', 
                                              'col_1', 
                                              'col_2', 
                                              'col_3', 
                                              'col_4', 
                                              'col_5', 
                                              'col_6',
                                              'cmm',
                                              'actions'
                                            ];

        this.paginator._intl.itemsPerPageLabel ="CMM par page";
        this.articleWithCMMsDataSource.paginator = this.paginator;
        this.articleWithCMMsDataSource.sort      = this.sort;

      },
      (error)=> {console.log(error)}

    )
  }

  onViewCMM(articleCode: string){
    this.router.navigateByUrl('/cmm/detail/'+articleCode);
  }

  onDeleteCMM(name: string | number, articleCode: string){
    if(confirm("êtes-vous sûre vouloir reinitialisé le CMM associé a l'article: "+name+"?"))
    {
      this.CMMService.deleteCMM(articleCode, this.version.id).subscribe(
        (data: any) => {
          this.toastrService.success("CMM reinitalisé avec succès!");
          this.ngOnInit();
        },(response) => {
          this.toastrService.error(response.error.message);
          this.ngOnInit();
        }
      )
    }
  }

  applyFilter(event: Event) {
      
    const filterValue = (event.target as HTMLInputElement).value;
    this.articleWithCMMsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.articleWithCMMsDataSource.paginator) {
      this.articleWithCMMsDataSource.paginator.firstPage();
    }
  }

  formatArticleWithCMMs(article: any){
    if(article.cmms.length > 0){
      return {
        CODE:           article.CODE,
        laboratory_abr: article.laboratory_abr,
        designation:    article.designation,
        col_1:          article.cmms[0].col_1,
        col_2:          article.cmms[0].col_2,
        col_3:          article.cmms[0].col_3,
        col_4:          article.cmms[0].col_4,
        col_5:          article.cmms[0].col_5,
        col_6:          article.cmms[0].col_6,
        cmm:            this.calculateMean(article.cmms[0].col_1, article.cmms[0].col_2, article.cmms[0].col_3, article.cmms[0].col_4, article.cmms[0].col_5, article.cmms[0].col_6),
        actions:        '',
        is_set:         true
      }
    }else{
      return {
        CODE:           article.CODE,
        laboratory_abr: article.laboratory_abr,
        designation:    article.designation,
        col_1:          '',
        col_2:          '',
        col_3:          '',
        col_4:          '',
        col_5:          '',
        col_6:          '',
        cmm:            '',
        actions:        '',
        is_set:         false
      }
    }
  }

  calculateMean( col_1: number, col_2: number, col_3: number, col_4: number, col_5: number, col_6: number){
      return Math.round((col_1 + col_2 + col_3 + col_4 + col_5 + col_6) / 6);
  }
}
