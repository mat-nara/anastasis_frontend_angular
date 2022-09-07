import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { VersionService } from 'src/app/core/services/version.service'; 
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { GlobalStorageService } from 'src/app/core/services/global-storage.service';

@Component({
  selector: 'app-version-new',
  templateUrl: './version-new.component.html',
  styleUrls: ['./version-new.component.scss']
})
export class VersionNewComponent implements OnInit {

  versionForm!: FormGroup;
  constructor(
              private formBuilder: FormBuilder,
              private versionService: VersionService,
              private globalStorageService: GlobalStorageService,
              private router: Router,
              private toastrService: ToastrService
                ) { }

  ngOnInit(): void {
    this.versionForm = this.formBuilder.group({
        name:        ['', [Validators.required]],
        description:  ['', [Validators.required]]
      }
    );
  }

  onSubmitForm(){
    if(this.versionForm.invalid == false){
      this.versionService.addVersion(this.versionForm.value).subscribe(
        (data: any) => {
          this.toastrService.success('Nouvelle version créée avec succès!');
          this.globalStorageService.remove("ActiveVersion");
          this.globalStorageService.remove("AllVersions");
          this.router.navigateByUrl("/versions");
        },
        (response: any) => {
          this.toastrService.error(response.error.message);
          //this.loading = false;
        }
      );
    }
  }

  checkError(formGroup: FormGroup, controlName: string, errorName: string) {
    return formGroup.controls[controlName].hasError(errorName);
  }

  backToList(){

    this.router.navigateByUrl('/versions');
  }

}
