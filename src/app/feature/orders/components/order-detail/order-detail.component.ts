import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';  
import { ArticleService } from 'src/app/core/services/article.service'; 
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  orderForm!: FormGroup;
  selectedIndex: number = 0;
  articlesDataSource!: MatTableDataSource<any>;
  displayedColumns!: any;

  orderedArticlesDataSource!: MatTableDataSource<Article>;
  selectedDisplayedColumns!: any;
  selection: SelectionModel<Article> = new SelectionModel<Article>(true, []);

  changedQty: any  = {};
  changedType: any = {};

  Total: any = {
    MGA: 0,
    EUR: 0,
    USD: 0
  };
  Currency!: any;

  constructor(
                private oandaCurrencyService: OandaCurrencyService,
                private activatedRoute: ActivatedRoute,
                private tokenStorageService: TokenStorageService, 
                private orderService: OrderService,
                private articleService: ArticleService,
                private router: Router,
                private toastrService: ToastrService,
                private formBuilder: FormBuilder,
                ) { }

     ngOnInit(): any {

      /** Load all available articles **/
      this.articleService.getAllArticles().subscribe(
        (data: any) => {
          
          this.articlesDataSource  = new MatTableDataSource(data.map((article: any) => { return { ...article, actions: "" } }) );
          this.displayedColumns = ['select', 'CODE', 'Laboratory', 'designation', 'PU', 'DEV'];

          this.paginator._intl.itemsPerPageLabel  ="Articles par page";
          this.articlesDataSource.paginator       = this.paginator;
          this.articlesDataSource.sort            = this.sort;


          /** load order data **/
          this.orderService.getOneOrder(this.activatedRoute.snapshot.params['id']).subscribe(
            (data) => {
              this.orderForm = this.formBuilder.group({
                reference: [{value: data['REFERENCE'], disabled: true}, [Validators.required]],
              });

             
              this.setCurrency().then(
                () => {
                  this.loadSelectedArticleData(data);
                }
              ).catch(
                (e)=>{
                  this.toastrService.error("Une erreur est survenu devise OANDA.");
                }
              )              
              
            }, (error) => {
              this.toastrService.error("Une erreur est survenu.");
              console.log(error)
            }
          )

        },(response) => {
          this.toastrService.error(response.error.message);
        }
      )

    }

    async setCurrency(){
      this.Currency = await this.oandaCurrencyService.getCurrency() as any;
    }

    loadSelectedArticleData(data: any){
      var orderedArticles = data.articles;              
      var selected        = new Array<any>;

      orderedArticles.forEach((orderedArticle: any) => { 
        this.articlesDataSource.data.forEach((article) => {
          if(orderedArticle.CODE == article.CODE){
            selected.push(article);
            this.changedQty[article.CODE]  = orderedArticle.pivot.Qty;
            this.changedType[article.CODE] = orderedArticle.pivot.type_transport;
          }
        })
      });
      
      this.selection                  = new SelectionModel<Article>(true, selected);
      this.orderedArticlesDataSource  = new MatTableDataSource<Article>(this.selection.selected);
      this.selectedDisplayedColumns   = ['article', 'Qty','PU', 'DEV', 'type_transport', 'actions']; 
      
      this.evaluateTotal();
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
      var value = parseInt(event.target.value);
      if(value != null){
        this.changedQty[CODE] = value;
        this.evaluateTotal();
      }
    }

    evaluateTotal(){

      var currency  = 0;
      var TotalMGA  = 0;
      this.selection.selected.forEach((article: any) => {
        if(this.changedQty[article.CODE]){
          currency   = article.DEV == 'USD'? this.Currency.usd : this.Currency.eur; 
          TotalMGA  += this.changedQty[article.CODE] * article.PU * currency;
        }
      });

      this.Total.MGA = Math.round(TotalMGA * 100) / 100;
      this.Total.EUR = Math.round(TotalMGA / this.Currency.eur * 100) / 100;
      this.Total.USD = Math.round(TotalMGA / this.Currency.usd * 100) / 100;
    }


    onTypeChange(event: any, CODE: string){
      this.changedType[CODE] = event.value;
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
            this.toastrService.error("Tous les articles doivent avor une Quantité");
            is_valid_data = false;
          }
          
        }else{
          this.toastrService.error("Tous les articles doivent avor une Quantité et un type de transport");
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

      console.log(order);
  
      this.orderService.updateOrder(this.orderForm.get('reference')!.value, order).subscribe(
        (data: any) => {
          this.toastrService.success('Commande mise à jour');
          this.router.navigate(["/orders"]);
        },
        (response: any) => {

          this.toastrService.error(response.error.message);
          //this.loading = false;
        }
      )
    }
}
