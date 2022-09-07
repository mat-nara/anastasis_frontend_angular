import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LaboratoryService } from 'src/app/core/services/laboratory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-laboratory-detail',
  templateUrl: './laboratory-detail.component.html',
  styleUrls: ['./laboratory-detail.component.scss']
})
export class LaboratoryDetailComponent implements OnInit {

  laboratoryForm!: FormGroup;
  constructor(
            private formBuilder: FormBuilder,
            private laboratoryService: LaboratoryService,
            private router: Router,
            private activatedRoute: ActivatedRoute,
            private toastrService: ToastrService
              ) { }

  ngOnInit(): void {
    const user =  this.laboratoryService.getOneLaboratories(this.activatedRoute.snapshot.params['ABR']).subscribe(
      (data) => {
        this.laboratoryForm = this.formBuilder.group({
          ABR:    [data.ABR, [Validators.required]],
          name:   [data.name , [Validators.required]],
          coef:   [data.coef, [Validators.required]],
          delai_de_transit_de_la_nouvelle_commande:  [data.delai_de_transit_de_la_nouvelle_commande, [Validators.required]]
        });

      }, (error) => {
        this.toastrService.error("Une erreur est survenu.");
        console.log(error)
      }
    )
  }

  onSubmitForm(){
    this.laboratoryService.updateLaboratories(this.activatedRoute.snapshot.params['ABR'], this.laboratoryForm.value).subscribe(
      (data: any) => {
        this.router.navigateByUrl('/laboratories');
        this.toastrService.success("Laboratoire mise à jour avec succès!");
        console.log(data)
      },(error: any) => {
        this.toastrService.error(error.error.message);
        console.log(error)
      }
    )
  }

  checkError(formGroup: FormGroup, controlName: string, errorName: string) {
    return formGroup.controls[controlName].hasError(errorName);
  }

  backToList(){
    this.router.navigateByUrl('/laboratories');
  }
}
