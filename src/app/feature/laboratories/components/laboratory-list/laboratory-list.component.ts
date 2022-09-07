import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Laboratory } from 'src/app/core/models/laboratory.model'; 
import { LaboratoryService } from 'src/app/core/services/laboratory.service';  
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-laboratory-list',
  templateUrl: './laboratory-list.component.html',
  styleUrls: ['./laboratory-list.component.scss']
})
export class LaboratoryListComponent implements OnInit {

  laboratoriesDataSource!: any;
  displayedColumns!: any;
  constructor(
              private laboratoryService: LaboratoryService,
              private router: Router,
              private toastrService: ToastrService
                ) { }

  ngOnInit(): void {

    this.laboratoryService.getAllLaboratories().subscribe(
      (data: any) => {
        this.laboratoriesDataSource  = data.map((laboratory: any) => { return { ...laboratory, actions: "" } });
        this.displayedColumns = ['ABR', 'name', 'coef', 'delai_de_transit_de_la_nouvelle_commande', 'actions'];
      },(response) => {
        this.toastrService.error(response.error.message);
      }
    );
  }

  onViewLaboratory(_abr: string){
    this.router.navigateByUrl('/laboratories/detail/'+_abr);
  }

  onAddLaboratory(){
    this.router.navigateByUrl("/laboratories/new");
  }

  onDeleteLaboratory(name: string, _abr: string){
    if(confirm("êtes-vous sûre vouloir supprimer "+name+"?"))
    {
      this.laboratoryService.deleteLaboratories(_abr).subscribe(
        (data: any) => {
          this.toastrService.success("Supression du laboratoire effectuée avec succès!");
          window.location.reload();
        },(response) => {
          this.toastrService.error(response.error.message);
          this.ngOnInit();
        }
      )
    }
  }

}
