import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { CustomValidators } from 'src/app/core/validators/CustomValidators';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userForm!: FormGroup;
  passwordForm!: FormGroup;
  imageSrc!: string;

  constructor(
              private formBuilder: FormBuilder,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    const user =  this.userService.getOneUser(this.activatedRoute.snapshot.params['id']).subscribe(
      (data) => {

        this.userForm = this.formBuilder.group({
          lastname:   [data.lastname, [Validators.required]],
          firstname:  [data.firstname, [Validators.required]],
          role:       [data.roles[0].slug, [Validators.required]],
          email:      [data.email, [Validators.required, Validators.email]],

          imageUrl:   [data.imageUrl],
          image :     [null]
        });
        //this.imageSrc = this.userForm.get('imageUrl')!.value;

        this.passwordForm = this.formBuilder.group({
          password:         [null, [Validators.required]],
          confirm_password: [null, [Validators.required]],
        },{
          validators: [CustomValidators.mustMatch('password', 'confirm_password')]
        });

      }, (error) => {
        this.toastrService.error("Une erreur est survenu.");
        console.log(error)

      }
    )
  }

  onSubmitUserForm(){

    /*
    const formData = new FormData();
    formData.append('lastname', this.userForm.get('lastname')!.value);
    formData.append('firstname', this.userForm.get('firstname')!.value);
    formData.append('role', this.userForm.get('role')!.value);
    formData.append('email', this.userForm.get('email')!.value);
    formData.append('imageUrl', this.userForm.get('imageUrl')!.value);
    formData.append('image', this.userForm.get('image')!.value);
    */

    if(!this.userForm.invalid){
      this.userService.updateUser(this.activatedRoute.snapshot.params['id'], this.userForm.value).subscribe(
        (data: any) => {
          this.router.navigateByUrl('/users');
          this.toastrService.success("Information utilisateur mise à jour");
        },(error: any) => {
          this.toastrService.error(error.message);
        }
      )
    }
  }

  onSubmitPasswordForm(){
    if(!this.passwordForm.invalid){
      this.userService.updateUser(this.activatedRoute.snapshot.params['id'], { password : this.passwordForm.get('password')?.value }).subscribe(
        (data: any) => {
          this.router.navigateByUrl('/users');
          this.toastrService.success("Mot de passe utilisateur mise à jours avec succès.")
        }, (error : any) => {
          this.toastrService.error(error.message);
        }
      )
    }
  }

  showPreview(event:any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.userForm.patchValue({
          image: event.target.files[0]
        });
        this.userForm.updateValueAndValidity()
      }
    }
  }



  checkError(formGroup: FormGroup, controlName: string, errorName: string) {
    return formGroup.controls[controlName].hasError(errorName);
  }

  backToList(){
    this.router.navigateByUrl('/users');
  }

}
