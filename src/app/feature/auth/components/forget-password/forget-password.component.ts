import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgotPassForm!: FormGroup;
  constructor(
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.forgotPassForm = this.formBuilder.group({
      email:   ['', [Validators.required, Validators.email]],
    });
  }

  onSubmitForm(){
    if(this.forgotPassForm.invalid == false){
      this.authService.forgotPassword(this.forgotPassForm.value).subscribe(
        (data: any) => {
          this.toastrService.success('Un lien de reinitialisation de mot de passe vous a été envoyer par Email.');
        }, (response: any) => {
          this.toastrService.error(response.message);
        }
      )
    }
  }

  checkError(controlName: string, errorName: string) {
    return this.forgotPassForm.controls[controlName].hasError(errorName);
  }

}
