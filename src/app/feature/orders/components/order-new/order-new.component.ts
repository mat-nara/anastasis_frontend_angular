import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';  
import { ArticleService } from 'src/app/core/services/article.service'; 
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { OandaCurrencyService } from 'src/app/core/services/oanda-currency.service';


import { Article } from 'src/app/core/models/article.model';


@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.scss']
})
export class OrderNewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  orderForm!: FormGroup;
  selectedIndex: number = 0;

  ordersDataSource!: MatTableDataSource<any>;
  orderedArticlesDataSource!: MatTableDataSource<Article>;
  selectedDisplayedColumns!: any;

  changedQty: any  = {};
  changedType: any = {};

  articlesDataSource!: MatTableDataSource<any>;
  displayedColumns!: any;

  selection = new SelectionModel<Article>(true, []);

  Total: any = {
    MGA: 0,
    EUR: 0,
    USD: 0
  };
  Currency!: any;

  constructor(
                private oandaCurrencyService: OandaCurrencyService,
                private tokenStorageService: TokenStorageService, 
                private orderService: OrderService,
                private articleService: ArticleService,
                private router: Router,
                private toastrService: ToastrService,
                private formBuilder: FormBuilder,
                ) { }

    ngOnInit(): void {

      this.orderForm = this.formBuilder.group({
        reference:   ['', [Validators.required]],
      });

      this.articleService.getAllArticles().subscribe(
        (data: any) => {
          this.articlesDataSource  = new MatTableDataSource(data.map((article: any) => { return { ...article, actions: "" } }) );
          this.displayedColumns = ['select', 'CODE', 'Laboratory', 'designation', 'PU', 'DEV'];

          this.paginator._intl.itemsPerPageLabel  ="Articles par page";
          this.articlesDataSource.paginator       = this.paginator;
          this.articlesDataSource.sort            = this.sort;
          
          
        },(response) => {
          this.toastrService.error(response.error.message);
        }
      )

      this.orderedArticlesDataSource  = new MatTableDataSource<Article>();
      this.selectedDisplayedColumns   = ['article', 'Qty','PU', 'DEV', 'type_transport', 'actions']; 

      this.setCurrency();
    }

    async setCurrency(){
      this.Currency = await this.oandaCurrencyService.getCurrency() as any;
    }
    
    applyFilter(event: Event) {
      
      const filterValue = (event.target as HTMLInputElement).value;
      this.articlesDataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.articlesDataSource.paginator) {
        this.articlesDataSource.paginator.firstPage();
      }
    }

    toStep(n: number){
      this.selectedIndex = n;
    }

    checkValidity(){
      if(this.orderForm.invalid){
        return
      }else{
        this.toStep(1);
      }
    }

    handleSelection(row: any){
      this.orderedArticlesDataSource.data = this.selection.selected;
      this.evaluateTotal();
    }

    onQtyChange(event: any, CODE: string){
      this.changedQty[CODE] = event.target.value;
      this.evaluateTotal();
    }

    onTypeChange(event: any, CODE: string){
      this.changedType[CODE] = event.value;
    }

    evaluateTotal(){

      var currency  = 0;
      var TotalMGA  = 0;
      this.selection.selected.forEach((article: any) => {
        if(this.changedQty[article.CODE]){
          currency  = article.DEV == 'USD'? this.Currency.usd : this.Currency.eur; 
          TotalMGA += this.changedQty[article.CODE] * article.PU * currency;
        }
      });

      this.Total.MGA = Math.round(TotalMGA* 100) / 100;
      this.Total.EUR = Math.round(TotalMGA / this.Currency.eur * 100) / 100;
      this.Total.USD = Math.round(TotalMGA / this.Currency.usd * 100) / 100;
    }

    onSubmitOrder(){

      var orderedArticles = new Array<any>;
      
      var is_valid_data = true;
      this.selection.selected.forEach( (article) => { 

        if(this.changedQty[article.CODE] !== undefined && this.changedType[article.CODE] !== undefined){

          var orderedArticle              = { CODE: '', Qty: 0, type_transport:'' };
          orderedArticle.CODE             = article.CODE; 
          orderedArticle.Qty              = this.changedQty[article.CODE];
          orderedArticle.type_transport   = this.changedType[article.CODE];
          
          if(orderedArticle.Qty != null){
            orderedArticles.push(orderedArticle);
          }else{
            this.toastrService.error("Tous les articles doivent avoir une Quantité");
            is_valid_data = false;
          }
          
        }else{
          this.toastrService.error("Tous les articles doivent avoir une Quantité et un type de transport");
          is_valid_data = false;
          return;
        }
      });

      if(!is_valid_data){
        return;
      }

    
      var user = this.tokenStorageService.getUser();

      var order = {
        REFERENCE:        this.orderForm.get('reference')!.value,
        orderedArticles:  orderedArticles
      }
  
      this.orderService.addOrder(order).subscribe(
        (data: any) => {
          this.toastrService.success("Commande enregistrée avec succès!");
          this.router.navigate(["/orders"]);
        },
        (response: any) => {

          this.toastrService.error(response.error.message);
          //this.loading = false;
        }
      )
    }

}
