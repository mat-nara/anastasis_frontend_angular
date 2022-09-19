import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { forkJoin, Observable } from 'rxjs';
//import * as $ from 'jquery';
import { ReportService } from 'src/app/core/services/report.service';
import { PropDirApproService } from 'src/app/core/services/propdirappro.service';
import { GlobalStorageService } from 'src/app/core/services/global-storage.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SumDialogComponent } from '../sum-dialog/sum-dialog.component';

@Component({
  selector: 'app-report-global',
  templateUrl: './report-global.component.html',
  styleUrls: ['./report-global.component.scss']
})
export class ReportGlobalComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  version!: any;
  reportDataSource!: any;
  displayedColumns!: any;

  dialogSumData!: any;

  changedDirapproQECBoiteList!: any;
  propChanged!: boolean;

  lastStockUpdate!: any;

  constructor(
                private globalStorageService: GlobalStorageService,
                private reportService: ReportService,
                private propDirApproService: PropDirApproService,
                private toastrService: ToastrService,
                public sumDialog: MatDialog
                  ) { }

    ngOnInit(): void {

      this.version = this.globalStorageService.get('ActiveVersion', true);
      this.loadReportData(this.version.id);

      this.changedDirapproQECBoiteList = {};      
      this.propChanged  = false;
   
    }

    loadReportData(version: string){

      this.reportService.getReports(version).subscribe(
        (data: any) => {
          console.log(data)

          //Set Data source
          //this.reportDataSource = data.reports.map((report: any) => { return { ...report, actions: "" } });
          this.reportDataSource = new MatTableDataSource(data.reports);
          this.displayedColumns = [
                                    'CODE', 'labs', 'designation', 

                                    //Rotation des stocks
                                    'cmm', 
                                    'fmr', 
                                    'stock_min', 
                                    'stock_max', 
                                    'stock_reel_a_une_date', 
                                    'stock_dispo', 
                                    'etat_reel', 
                                    'stock_en_transit', 
                                    'date_prevu_arrivage', 
                                    'stock_a_terme', 
                                    'stock_a_terme_mois',
                                    'observation',

                                    //Decision
                                    'stock_de_securite',
                                    'QEC_theorique_boite',
                                    'QEC_boites_decision',
                                    'QEC_cartons_decision',
                                    'QEC_final',
                                    'volume_commande',
                                    'poids_commande',
                                    'montant_decision',
                                    'QEC_boites_propo_dirappro',
                                    'QEC_cartons_propo_dirrapro',
                                    'montant_propo_dirrapro',

                                    //Collisage
                                    'poids',
                                    'dimension',
                                    'pu_decision',
                                    'dev_decision',
                                    'collisage_decision',
                                    'FOB',
                                    'coef',
                                    'prix_de_revient'
                                  ];

          this.paginator._intl.itemsPerPageLabel  ="Articles par page";
          this.reportDataSource.paginator         = this.paginator;
          this.reportDataSource.sort              = this.sort;

          // Sum dialog Data
          this.dialogSumData = {
            labsSum:    data.sum,
            overallSum: data.allsum
          }
          
          this.lastStockUpdate = data.last_stock_update;
          
        }, (error) => {
          this.toastrService.error("Une erreur est survenu.");
          console.log(error)
        }
      )
    }


    openSumDialog(){
      this.sumDialog.open(SumDialogComponent, { 
        width: '1200px',
        data: this.dialogSumData 
      });
    }

    onPropDiraproChanged(e: any){
      let CODE = e.target.getAttribute('CODE');
      this.changedDirapproQECBoiteList[CODE] = e.target.value;

      //show save btn
      if(!this.propChanged){
        this.propChanged = true;
      }
    }
    
    updatePropDirrapro(){      
      var obs = [];
      
      var _articleCodes = Object.keys(this.changedDirapproQECBoiteList);

      for (let i = 0; i < _articleCodes.length; i++) {

        let proposition = {
          VersionName: this.version,
          ArticleCode:  _articleCodes[i],
          QEC_boites:   this.changedDirapproQECBoiteList[_articleCodes[i]]
        }

        obs.push(this.propDirApproService.setPropDirAppro(_articleCodes[i], this.version.id, proposition));
      }


      forkJoin(obs).subscribe(
        (res: any) => {
          this.toastrService.success("La mise à jour a été effectuée avec succès!");
          window.location.reload();
          //this.ngOnInit();
        } ,
        (err) => {
          console.log(err)
          this.toastrService.error("Une erreur est survenue.")
        }
      );

    }
  
    formatNumber(n: any){
      var parts = n.toString().split(".");
      const numberPart = parts[0];
      const decimalPart = parts[1];
      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      return numberPart.replace(thousands, " ") + (decimalPart ? "." + decimalPart : "");
    }

    applyFilter(event: Event) {
      
      const filterValue = (event.target as HTMLInputElement).value;
      this.reportDataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.reportDataSource.paginator) {
        this.reportDataSource.paginator.firstPage();
      }
    }
}

