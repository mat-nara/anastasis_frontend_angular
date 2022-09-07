import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from 'src/app/core/services/stock.service';
import { GlobalStorageService } from 'src/app/core/services/global-storage.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-import',
  templateUrl: './stock-import.component.html',
  styleUrls: ['./stock-import.component.scss']
})
export class StockImportComponent implements OnInit {

  importForm!: any;
  version!: any;
  constructor(
                private globalStorageService: GlobalStorageService,
                private formBuilder: FormBuilder,
                private StockService: StockService,
                private toastrService: ToastrService,
                private router: Router,
              ) { }

  ngOnInit(): void {
    this.version = this.globalStorageService.get('ActiveVersion', true);
    this.importForm = this.formBuilder.group({
      excelFile: [null, [Validators.required]]
    })
  }

  onSubmitForm(event: any){
    
    if(this.importForm.invalid == true){
      this.toastrService.error("Veuillez sélectionner un fichier xlsx qui convient au modèle.");
      return ;
    }

    if(confirm('Attention!, En important ce fichier, vous ECRASEZ les données du stock actuelle de la VERSION active (en haut à droite). Voulez-vous vraiment CONTINUER?')){

      var formData = new FormData();
      formData.append('excel', this.importForm.get('excelFile').value);
      this.StockService.importStock(this.version.id, formData).subscribe(
        (data: any) => {
          this.toastrService.success("Importation des stocks effectuée avec succès!");
          this.router.navigate(["/stocks"]);
        },
        (response: any) => {
          this.toastrService.error(response.error.message);
          //this.loading = false;
        }
      )
    }
    
  }

  onFilechange(event: any, file_selector_label: String){

    if(event.target!.files && event.target!.files.length) {
      const file = event.target.files[0];
      document.querySelector("#"+file_selector_label)!.innerHTML = file.name;

      this.importForm.patchValue({
        excelFile: file
      });
    }
  }

  downloadModel(event: any){
    window.open(environment.apiHostname+"/download-stock-models", "_blank");
  }

  backToList(){
    this.router.navigateByUrl('/stocks');
  }

}
