import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LaboratoryService } from 'src/app/core/services/laboratory.service';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-laboratory-new',
  templateUrl: './laboratory-new.component.html',
  styleUrls: ['./laboratory-new.component.scss']
})
export class LaboratoryNewComponent implements OnInit {

  laboratoryForm!: FormGroup;
  constructor(
              private formBuilder: FormBuilder,
              private laboratoryService: LaboratoryService,
              private router: Router,
              private toastrService: ToastrService
                ) { }

  ngOnInit(): void {
    this.laboratoryForm = this.formBuilder.group({
        ABR:    ['', [Validators.required]],
        name:   [''],
        coef:   [''],
        delai_de_transit_de_la_nouvelle_commande:  ['']
      }
    );
  }

  onSubmitForm(){
    this.laboratoryService.addLaboratories(this.laboratoryForm.value).subscribe(
      (data: any) => {
        this.toastrService.success("Laboratoire ajouté avec succès!");
        this.router.navigate(["/laboratories"]);
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
    this.router.navigateByUrl('/laboratories');
  }

}
