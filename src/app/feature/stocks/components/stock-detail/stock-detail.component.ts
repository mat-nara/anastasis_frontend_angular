import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { GlobalStorageService } from 'src/app/core/services/global-storage.service';
import { StockService } from 'src/app/core/services/stock.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {

  stockForm!: FormGroup;
  version!:   any;

  articleCode!: string;
  articleDesignation!: string;

  constructor(
              private globalStorageService: GlobalStorageService,
              private formBuilder: FormBuilder,
              private stockService: StockService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService
                ) { }


  ngOnInit(): void {

    this.version = this.globalStorageService.get('ActiveVersion', true);

    this.stockService.getOneStock(this.activatedRoute.snapshot.params['articleCode'], this.version.id).subscribe(
      (response) => {
        var article             = response[0]; 
        this.articleCode        = article.CODE;
        this.articleDesignation = article.designation;

        if(article.stocks.length > 0){

          this.stockForm = this.formBuilder.group({
            stock_reel_a_une_date:          [article.stocks[0].stock_reel_a_une_date, [Validators.required]],
            stock_en_transit:               [article.stocks[0].stock_en_transit, [Validators.required]],
            date_prevu_arrivage:            [formatDate(article.stocks[0].date_prevu_arrivage, 'yyyy-MM-dd', 'en'), [Validators.required]],
            date_de_passation_de_commande:  [formatDate(article.stocks[0].date_de_passation_de_commande, 'yyyy-MM-dd', 'en'), [Validators.required]],
           });
        }else{
          this.stockForm = this.formBuilder.group({
            stock_reel_a_une_date:         ['', [Validators.required]],
            stock_en_transit:              ['', [Validators.required]],
            date_prevu_arrivage:           ['', [Validators.required]],
            date_de_passation_de_commande: ['', [Validators.required]],
           });
        }
        
      }, (error) => {
        this.toastrService.error("Une erreur est survenu.");
        console.log(error)
      }
    )
  }

  onSubmitForm(){

    if(!this.stockForm.invalid){
      this.stockService.updateStock(this.articleCode, this.version.id, this.stockForm.value).subscribe(
        (data: any) => {
          this.toastrService.success("Mise à jour du stock effectué avec succès!");
          this.router.navigate(["/stocks"]);
        },
        (response: any) => {
          this.toastrService.error(response.error.message);
          //this.loading = false;
        }
      );
    }
  }

  private formatDate(date: string) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  checkError(formGroup: FormGroup, controlName: string, errorName: string) {
    return formGroup.controls[controlName].hasError(errorName);
  }

  backToList(){
    this.router.navigateByUrl('/stocks');
  }


}
