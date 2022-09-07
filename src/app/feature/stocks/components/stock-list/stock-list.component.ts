import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from 'src/app/core/models/stock';
import { StockService } from 'src/app/core/services/stock.service';
import { GlobalStorageService } from 'src/app/core/services/global-storage.service'; 
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  version!: any;
  articlesWithStocksDataSource!: MatTableDataSource<any>;
  displayedColumns!: any;


  constructor(
                private globalStorageService: GlobalStorageService,
                private stockService: StockService,
                private router: Router,
                private toastrService: ToastrService
                  ) { }

  ngOnInit(): void {
    this.version =  this.globalStorageService.get('ActiveVersion', true) as any;
    this.stockService.getAllStocks(this.version.id).subscribe(
      (data) => {

        this.articlesWithStocksDataSource = new MatTableDataSource(data.map((article: any) => { return this.formatArticleWithStocks(article) }) );
        this.displayedColumns             = [
                                              'CODE', 
                                              'laboratory_abr', 
                                              'designation', 
                                              'stock_reel_a_une_date', 
                                              'stock_en_transit', 
                                              'date_prevu_arrivage', 
                                              'date_de_passation_de_commande', 
                                              'actions'
                                            ];

        this.paginator._intl.itemsPerPageLabel      ="Articles par page";
        this.articlesWithStocksDataSource.paginator = this.paginator;
        this.articlesWithStocksDataSource.sort      = this.sort;

      },
      (error)=> {console.log(error)}

    )
  }

  onViewStock(articleCode: string){
    this.router.navigateByUrl('/stocks/detail/'+articleCode);
  }

  onDeleteStock(name: string, ArticleCode: string){
    if(confirm("Etes-vous sûre vouloir reinitialisé le Stock associé a l'article: "+name+" dans la version "+this.version.name+"?"))
    {
      this.stockService.deleteStock(ArticleCode, this.version.id).subscribe(
        (data: any) => {
          this.toastrService.success("L'état de ce stock a bien été reinitialiser!");
          window.location.reload();
        },(response) => {
          this.toastrService.error(response.error.message);
          this.ngOnInit();
        }
      )
    }
  }

  applyFilter(event: Event) {
      
    const filterValue = (event.target as HTMLInputElement).value;
    this.articlesWithStocksDataSource.filter = filterValue.trim().toLowerCase();

    if (this.articlesWithStocksDataSource.paginator) {
      this.articlesWithStocksDataSource.paginator.firstPage();
    }
  }

  formatArticleWithStocks(article: any){
    if(article.stocks.length > 0){
      return {
        CODE:                           article.CODE,
        laboratory_abr:                 article.laboratory_abr,
        designation:                    article.designation,
        stock_reel_a_une_date:          article.stocks[0].stock_reel_a_une_date,
        stock_en_transit:               article.stocks[0].stock_en_transit,
        date_prevu_arrivage:            article.stocks[0].date_prevu_arrivage,
        date_de_passation_de_commande:  article.stocks[0].date_de_passation_de_commande,
        type_transport:                 article.stocks[0].type_transport,
        actions:                        '',
        is_set:                         true
      }
    }else{
      return {
        CODE:                           article.CODE,
        laboratory_abr:                 article.laboratory_abr,
        designation:                    article.designation,
        stock_reel_a_une_date:          '',
        stock_en_transit:               '',
        date_prevu_arrivage:            '',
        date_de_passation_de_commande:  '',
        type_transport:                 '',
        actions:                        '',
        is_set:                         false
      }
    }
  }

}
