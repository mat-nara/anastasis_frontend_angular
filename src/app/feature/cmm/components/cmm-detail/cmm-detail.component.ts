import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { GlobalStorageService } from 'src/app/core/services/global-storage.service';
import { CMMService } from 'src/app/core/services/cmm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-cmm-detail',
  templateUrl: './cmm-detail.component.html',
  styleUrls: ['./cmm-detail.component.scss']
})
export class CmmDetailComponent implements OnInit {

  cmmValue!: number;
  cmmForm!: FormGroup;
  version!: any;

  articleCode!: string;
  articleDesignation!: string;

  constructor(
              private globalStorageService: GlobalStorageService,
              private formBuilder: FormBuilder,
              private CMMService: CMMService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService
                ) { }


  ngOnInit(): void {
    this.version = this.globalStorageService.get('ActiveVersion', true);

    this.CMMService.getOneCMM(this.activatedRoute.snapshot.params['ArticleCode'], this.version.id).subscribe(
      (response) => {
        var article             = response[0]; 
        this.articleCode        = article.CODE;
        this.articleDesignation = article.designation;

        if(article.cmms.length > 0){
          
          this.cmmForm  = this.formBuilder.group({
            col_1: [article.cmms[0].col_1, [Validators.required]],
            col_2: [article.cmms[0].col_2, [Validators.required]],
            col_3: [article.cmms[0].col_3, [Validators.required]],
            col_4: [article.cmms[0].col_4, [Validators.required]],
            col_5: [article.cmms[0].col_5, [Validators.required]],
            col_6: [article.cmms[0].col_6, [Validators.required]],
          });

          this.cmmValue = this.calculateMean(
            this.cmmForm.get('col_1')!.value,
            this.cmmForm.get('col_2')!.value,
            this.cmmForm.get('col_3')!.value,
            this.cmmForm.get('col_4')!.value,
            this.cmmForm.get('col_5')!.value,
            this.cmmForm.get('col_6')!.value
          );
        }else{
          this.cmmForm = this.formBuilder.group({
            col_1: ['', [Validators.required]],
            col_2: ['', [Validators.required]],
            col_3: ['', [Validators.required]],
            col_4: ['', [Validators.required]],
            col_5: ['', [Validators.required]],
            col_6: ['', [Validators.required]],
          });
        }

        this.cmmForm.valueChanges.subscribe( formValue =>  {
          this.cmmValue = this.calculateMean(formValue.col_1, formValue.col_2, formValue.col_3, formValue.col_4, formValue.col_5, formValue.col_6);
        });
        
      }, (error) => {
        this.toastrService.error("Une erreur est survenue.");
        console.log(error)
      }
    )
  } 

  onSubmitForm(){
    if(!this.cmmForm.invalid){
      this.CMMService.updateCMM(this.articleCode, this.version.id, this.cmmForm.value).subscribe(
        (data: any) => {
          this.router.navigateByUrl('/cmm');
          this.toastrService.success("CMM mise à jour avec succès!");
        },(error: any) => {
          this.toastrService.error(error.error.message);
          console.log(error)
        }
      )
    }
  }

  checkError(formGroup: FormGroup, controlName: string, errorName: string) {
    return formGroup.controls[controlName].hasError(errorName);
  }

  backToList(){
    this.router.navigateByUrl('/cmm');
  }

  calculateMean( col_1: number, col_2: number, col_3: number, col_4: number, col_5: number, col_6: number){
      return Math.round((col_1 + col_2 + col_3 + col_4 + col_5 + col_6) / 6);
  }

}
