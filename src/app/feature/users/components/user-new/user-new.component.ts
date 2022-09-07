import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'src/app/core/validators/CustomValidators';
//import { CustomValidation } from 'src/app/core/validators/CustomValidation';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  defaultImageSrc: string = 'assets/images/avatar.png';
  userForm!: FormGroup;
  image!: File;
  userData!: any;

  constructor(
              private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private toastrService: ToastrService){}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      lastname:   ['', [Validators.required]],
      firstname:  ['', [Validators.required]],
      role:       ['', [Validators.required]],
      email:      ['', [Validators.required, Validators.email]],
      password:   ['', [Validators.required]],
      confirm_password: ['',  [Validators.required]],
      
      imageUrl:   [null],
      image :     [null]
    },{
      validators: [CustomValidators.mustMatch('password', 'confirm_password')]
    });
  }

  get f(): { [key: string]: AbstractControl }{
    return this.userForm.controls;
  }

  onSubmitForm(){

    if(this.userForm.invalid == false){
      const formData = new FormData();
      formData.append('lastname', this.userForm.get('lastname')!.value);
      formData.append('firstname', this.userForm.get('firstname')!.value);
      formData.append('role', this.userForm.get('role')!.value);
      formData.append('email', this.userForm.get('email')!.value);
      formData.append('password', this.userForm.get('password')!.value);

      //formData.append('imageUrl', this.userForm.get('imageUrl')!.value);
      //formData.append('image', this.userForm.get('image')!.value);

      this.userService.addUser(formData).subscribe(
        (data: any) => {
          this.toastrService.success("Création d'un utilisateur réussie!");
          this.router.navigate(["/users"]);
        },
        (response: any) => {
          this.toastrService.error(response.error.message);
          //this.loading = false;
        }
    ); 
    }
    
  }

  showPreview(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.defaultImageSrc = reader.result as string;
        this.userForm.patchValue({
          image: event.target.files[0]
        });
        this.userForm.updateValueAndValidity()
      }
    }
  }

  checkError(controlName: string, errorName: string) {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  backToList(){
    this.router.navigateByUrl('/users');
  }

}
