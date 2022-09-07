import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomValidators } from 'src/app/core/validators/CustomValidators';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  tokenIsValid!: boolean;
  passwordForm!: FormGroup;

  constructor(
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastrService: ToastrService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.passwordForm = this.formBuilder.group({
      email:                  [null, [Validators.required]],
      password:               [null, [Validators.required]],
      password_confirmation:  [null, [Validators.required]],
    },{
      validators: [CustomValidators.mustMatch('password', 'password_confirmation')]
    });

    /*
    this.authService.resetPassword(this.activatedRoute.snapshot.params['token']).subscribe(
      (data: any) => {
        this.tokenIsValid = true;
        
        this.toastrService.success(data.message);
      }, (response: any) => {
        this.tokenIsValid = false;
        this.toastrService.error(response.error.message);
      }
    );*/
  }

  onSubmitPasswordForm(){
    if(!this.passwordForm.invalid){
      var data = {
        ...this.passwordForm.value,
        token: this.activatedRoute.snapshot.params['token']
      }
      this.authService.resetPassword(data).subscribe(
        (data: any) => {
          this.router.navigateByUrl('/users');
          this.toastrService.success("Mot de passe utilisateur mise à jours avec succès.")
        }, (error : any) => {
          this.toastrService.error("Une erreur est survenu lors de la reinitialisation de votre mot de passe.")
        }
      )
    }
  }

  checkError(formGroup: FormGroup, controlName: string, errorName: string) {
    return formGroup.controls[controlName].hasError(errorName);
  }

}
