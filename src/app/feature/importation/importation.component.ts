import { Component, OnInit, Renderer2 } from "@angular/core";
import { ScriptService } from 'src/app/core/services/script.service';
import { ArticleService } from "src/app/core/services/article.service";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-importation',
  templateUrl: './importation.component.html',
  styleUrls: ['./importation.component.scss']
})
export class ImportationComponent implements OnInit {

  isLinear = false;
  infoGenFormGroup!: FormGroup;
  localisationFormGroup!: FormGroup;
  configFormGroup!: FormGroup;

  constructor(
                private renderer: Renderer2,
                private scriptService: ScriptService,
                private articleService: ArticleService,
                private _formBuilder: FormBuilder,
                private toastrService: ToastrService
                ) { }

  ngOnInit() {

    this.loadExternalScript('assets/js/file-upload.js');

    this.infoGenFormGroup = this._formBuilder.group({
      catalogue: ['', Validators.required],
      excel:  ['', Validators.required]
    });

    this.localisationFormGroup = this._formBuilder.group({
      sheetNumber:  ['', Validators.required],
      firstLine:    ['', Validators.required],
    });

    this.configFormGroup = this._formBuilder.group({
      config:  ['', Validators.required],
    });

  }

  onSubmitAllForm(){

    const formData = new FormData();

    formData.append('catalogue', this.infoGenFormGroup.get('catalogue')!.value);
    formData.append('sheetNumber', this.localisationFormGroup.get('sheetNumber')!.value);
    formData.append('firstLine', this.localisationFormGroup.get('firstLine')!.value);
    formData.append('config', this.configFormGroup.get('config')!.value);
    formData.append('excel', this.infoGenFormGroup.get('excel')!.value);

    this.articleService.addArticle(formData).subscribe(
      (data: any) => {
        this.toastrService.success("Article ajouté avec succès.");
      },
      (error: any) => {
        this.toastrService.error("Une erreur est survenu.");
        console.log(error)
        //this.loading = false;
      }
    );

  }

  showPreview(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.infoGenFormGroup.patchValue({
        excel: event.target.files[0]
      });
      this.infoGenFormGroup.updateValueAndValidity()
    }
  }

  loadExternalScript(path: string){
    const scriptElement = this.scriptService.loadJsScript(this.renderer, path);
    scriptElement.onload = () => {
      console.log('External Script loaded');
    }
    scriptElement.onerror = () => {
      console.log('Could not load this external Script!');
    }
  }

}
