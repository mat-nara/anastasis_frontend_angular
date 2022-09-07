import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/core/services/article.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from "ngx-toastr";
import { Router } from '@angular/router';


@Component({
  selector: 'app-article-import',
  templateUrl: './article-import.component.html',
  styleUrls: ['./article-import.component.scss']
})
export class ArticleImportComponent implements OnInit {

  importForm! : any;
  constructor(
                private formBuilder: FormBuilder,
                private articleService: ArticleService,
                private toastrService: ToastrService,
                private router: Router,
              ) { }

  ngOnInit(): void {
    this.importForm = this.formBuilder.group({
      excelFile: [null]
    })
  }

  onSubmitForm(event: any){
    console.log(this.importForm.get('excelFile').value)
    var formData = new FormData();
    formData.append('excel', this.importForm.get('excelFile').value);
    this.articleService.importArticle(formData).subscribe(
      (data: any) => {
        this.toastrService.success("Importation des Articles effectuée avec succès!");
        this.router.navigate(["/articles"]);
      },
      (response: any) => {
        this.toastrService.error(response.error.message);
        //this.loading = false;
      }
    )
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
    window.open(environment.apiHostname+"/download-article-models", "_blank");
  }

  backToList(){
    this.router.navigateByUrl('/articles');
  }
}
