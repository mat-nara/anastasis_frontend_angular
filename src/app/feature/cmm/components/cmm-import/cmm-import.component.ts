import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CMMService } from 'src/app/core/services/cmm.service';
import { GlobalStorageService } from 'src/app/core/services/global-storage.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cmm-import',
  templateUrl: './cmm-import.component.html',
  styleUrls: ['./cmm-import.component.scss']
})
export class CmmImportComponent implements OnInit {

  importForm!: any;
  version!: any;
  constructor(
                private globalStorageService: GlobalStorageService,
                private formBuilder: FormBuilder,
                private CMMService: CMMService,
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

    if(confirm('Attention!, En important ce fichier, vous ECRASEZ les données du cmm actuelle de la VERSION active (en haut à droite). Voulez-vous vraiment CONTINUER?')){

      var formData = new FormData();
      formData.append('excel', this.importForm.get('excelFile').value);
      this.CMMService.importCMM(this.version.id, formData).subscribe(
        (data: any) => {
          this.toastrService.success("Importation des CMM effectuée avec succès!");
          this.router.navigate(["/cmm"]);
        },
        (response: any) => {
          this.toastrService.error(response.error.message);
          //this.loading = false;
        }
      );
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
    window.open(environment.apiHostname+"/download-cmm-models", "_blank");
  }

  checkError(formGroup: FormGroup, controlName: string, errorName: string) {
    return formGroup.controls[controlName].hasError(errorName);
  }

  backToList(){
    this.router.navigateByUrl('/cmm');
  }


}
