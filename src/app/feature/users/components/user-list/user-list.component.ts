import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users! : User[];
  usersDataSource!: any;
  displayedColumns!: any;

  constructor(
                private userService: UserService,
                private router: Router,
                private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        console.log(data);
        this.usersDataSource  = data.map((user: User) => { return { ...user, actions: "" } });
        this.displayedColumns = ['firstname', 'email', 'role', 'actions'];
      },(response) => {
        this.toastrService.error(response.error.message);
      }
    );
  }

  onAddUser(){
    this.router.navigateByUrl("/users/new");
  }

  onViewUser(_id: string){
    this.router.navigateByUrl('/users/profile/'+_id);
  }

  onDeleteUser(name: string, _id: string){
    if(confirm("êtes-vous sûre vouloir supprimer "+name+"?"))
    {
      this.userService.deleteUser(_id).subscribe(
        (data: any) => {
          this.toastrService.success("Utilisateur supprimé!");
          this.ngOnInit();
          console.log(data)
        },(response) => {
          this.toastrService.error(response.error.message);
          this.ngOnInit();
        }
      )
    }

  }
}
