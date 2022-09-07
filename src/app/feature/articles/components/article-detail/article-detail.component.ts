import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ArticleService } from 'src/app/core/services/article.service'; 
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { LaboratoryService } from 'src/app/core/services/laboratory.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

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

    //Fetching Article
    this.articleService.getOneArticle(this.activatedRoute.snapshot.params['CODE']).subscribe(
      (data) => {
        this.articleForm = this.formBuilder.group({
          CODE:             [data.CODE , [Validators.required]],
          designation:      [data.designation, [Validators.required]],
          PU:               [data.PU, [Validators.required]],
          DEV:              [data.DEV , [Validators.required]],
          ColisageStandard: [data.ColisageStandard, [Validators.required]],
          poids:            [data.poids, [Validators.required]],
          dimension:        [data.dimension , [Validators.required]],
          laboratory_abr:   [data.laboratory_abr , [Validators.required]]
        });
      }, (error) => {
        this.toastrService.error("Erreur lors de la récupération de cette article.");
        console.log(error)
      }
    )

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
      this.articleService.updateArticle(this.activatedRoute.snapshot.params['CODE'], this.articleForm.value).subscribe(
        (data: any) => {
          this.router.navigateByUrl('/articles');
          this.toastrService.success("Article mise à jour avec succès!");
          console.log(data)
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
    this.router.navigateByUrl('/articles');
  }

}
