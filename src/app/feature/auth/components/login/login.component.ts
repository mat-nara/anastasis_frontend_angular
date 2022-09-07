import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:   ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required]]
    });
  }

  onSubmitForm(){
    if(this.loginForm.invalid == false){
      this.authService.login(this.loginForm.value).subscribe(
        (data: any) => {
          this.router.navigateByUrl('/');
        }, (response: any) => {
          this.toastrService.error(response.error.message);
        }
      )
    }
  }

  checkError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
  }


}
