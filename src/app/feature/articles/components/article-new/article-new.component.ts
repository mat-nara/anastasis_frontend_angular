import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ArticleService } from 'src/app/core/services/article.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { LaboratoryService } from 'src/app/core/services/laboratory.service';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss']
})
export class ArticleNewComponent implements OnInit {

  articleForm!: FormGroup;
  laboratories!: any;
  constructor(
              private formBuilder: FormBuilder,
              private articleService: ArticleService,
              private laboratoryService: LaboratoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService
                ) { }


  ngOnInit(): void {

    this.articleForm = this.formBuilder.group({
      CODE:             ['' , [Validators.required]],
      designation:      ['',  [Validators.required]],
      PU:               ['',  [Validators.required]],
      DEV:              ['' , [Validators.required]],
      ColisageStandard: ['',  [Validators.required]],
      poids:            ['',  [Validators.required]],
      dimension:        ['' , [Validators.required]],
      laboratory_abr:   ['' , [Validators.required]]
    });

    //Fetching Laboratories
    this.laboratoryService.getAllLaboratories().subscribe(
      (laboratories) => { 
        this.laboratories = laboratories 
      },
      (error) => {
        this.toastrService.error("Une erreur est survenu.");
      }
    )
  }

  onSubmitForm(){
    if(!this.articleForm.invalid){
      this.articleService.addArticle(this.articleForm.value).subscribe(
        (data: any) => {
          this.router.navigateByUrl('/articles');
          this.toastrService.success("Création du nouvel Article effectuée avec succès!");
        },(error: any) => {
          this.toastrService.error(error.error.message);
        }
      )
    }
  }

  checkError(formGroup: FormGroup, controlName: string, errorName: string) {
    return formGroup.controls[controlName].hasError(errorName);
  }

  backToList(){
    this.router.navigateByUrl('/articles');
  }

}
