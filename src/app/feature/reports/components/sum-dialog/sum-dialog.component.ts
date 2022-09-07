import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from "ngx-toastr";
import { OandaCurrencyService } from 'src/app/core/services/oanda-currency.service';


@Component({
  selector: 'app-sum-dialog',
  templateUrl: './sum-dialog.component.html',
  styleUrls: ['./sum-dialog.component.scss']
})
export class SumDialogComponent implements OnInit {

  sumDataSource!: any;
  displayedColumns!: any;

  coursDevise!: any;
  total!: any;

  constructor(
                @Inject(MAT_DIALOG_DATA) public data: any,
                private oandaCurrencyService: OandaCurrencyService,
                private toastrService: ToastrService) {}

  ngOnInit(): void {

    this.sumDataSource    = new MatTableDataSource(this.data.labsSum);
    this.displayedColumns = ['labs', 'decision_eur', 'decision_usd', 'dirappro_eur', 'dirappro_usd'];

    this.total = {
      decision:     0,
      proposition:  0,
      sum_dec_eur:  this.data.overallSum.sum_dec_eur, 
      sum_dec_usd:  this.data.overallSum.sum_dec_usd,
      sum_prop_eur: this.data.overallSum.sum_prop_eur,
      sum_prop_usd: this.data.overallSum.sum_prop_usd
    }

    this.coursDevise = {
      usd_ar: 0,
      eur_ar: 0
    }
    this.setCurrencyAndTotal();
  }

  async setCurrencyAndTotal(){
    try{
      var currency = await this.oandaCurrencyService.getCurrency() as any;
      this.coursDevise.usd_ar = currency.usd;
      this.coursDevise.eur_ar = currency.eur;
      this.setSommeTotalAr();
      console.log(this.coursDevise)
    }catch(err){
      console.log(err)
      this.toastrService.error('Erreur lors de la récupération du devise USD & EUR Oanda'); 
    }
  }

  setSommeTotalAr(){
    this.total.decision    = this.formatNumber(Math.round(( (this.data.overallSum.sum_dec_eur  * this.coursDevise.eur_ar) + (this.data.overallSum.sum_dec_usd  * this.coursDevise.usd_ar) ) * 100)/100 );
    this.total.proposition = this.formatNumber(Math.round(( (this.data.overallSum.sum_prop_eur * this.coursDevise.eur_ar) + (this.data.overallSum.sum_prop_usd * this.coursDevise.usd_ar) ) * 100)/100);
  }


  formatNumber(n: any){
    var parts = n.toString().split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return numberPart.replace(thousands, " ") + (decimalPart ? "." + decimalPart : "");
  }

}
