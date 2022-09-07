import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { VersionService } from 'src/app/core/services/version.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { GlobalStorageService } from 'src/app/core/services/global-storage.service';


@Component({
  selector: 'app-version-detail',
  templateUrl: './version-detail.component.html',
  styleUrls: ['./version-detail.component.scss']
})
export class VersionDetailComponent implements OnInit {

  versionForm!: FormGroup;
  constructor(
              private formBuilder: FormBuilder,
              private versionService: VersionService,
              private globalStorageService: GlobalStorageService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService
                ) { }

  ngOnInit(): void {

    this.versionService.getOneVersion(this.activatedRoute.snapshot.params['id']).subscribe(
      (data) => {
        this.versionForm = this.formBuilder.group({
            name:         [data.name, [Validators.required]],
            description:  [data.description, [Validators.required]]
          }
        );
      }, (error) => {
        this.toastrService.error("Une erreur est survenu.");
        console.log(error)
      }
    )
    
  }

  onSubmitForm(){

    this.versionService.updateVersion(this.activatedRoute.snapshot.params['id'], this.versionForm.value).subscribe(
      (data: any) => {
        this.toastrService.success("La mise à jour de la version a été effectuée avec succès!");
        this.globalStorageService.remove("ActiveVersion");
        this.globalStorageService.remove("AllVersions");
        this.router.navigateByUrl("/versions");
        this.router.navigate(["/versions"]);
      },
      (response: any) => {
        this.toastrService.error(response.error.message);
        //this.loading = false;
      }
    );
  }

  checkError(formGroup: FormGroup, controlName: string, errorName: string) {
    return formGroup.controls[controlName].hasError(errorName);
  }

  backToList(){
    this.router.navigateByUrl('/versions');
  }

}
