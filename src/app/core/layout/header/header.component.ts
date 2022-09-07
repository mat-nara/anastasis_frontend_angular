import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { VersionService } from '../../services/version.service';
import { GlobalStorageService } from '../../services/global-storage.service';
import { TokenStorageService } from '../../services/token-storage.service'; 
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  activeVersion!: any;
  versions! : any;
  user!     : User;
  constructor(
              private globalStorageService: GlobalStorageService,
              private tokenStorageService: TokenStorageService,
              private versionService: VersionService,
              private authService: AuthService,
              private toastrService: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    console.log('activeVersion ', this.globalStorageService.get('ActiveVersion', true))
    console.log('AllVersions ', this.globalStorageService.get('AllVersions', true))
    this.user = this.authService.getUserInfo();
    if(this.globalStorageService.get('AllVersions') == null){

      //Init Version Variables (active and all)
      this.versionService.getAllVersions().subscribe(
        (versions: any) => {
          if(versions.length > 0){

            this.globalStorageService.set('ActiveVersion', versions[0]);
            this.globalStorageService.set('AllVersions', versions);
            this.activeVersion  = this.globalStorageService.get('ActiveVersion', true);
            this.versions       = this.globalStorageService.get('AllVersions', true);
                                    
          }else{
            this.toastrService.error("Aucune version des données n'est disponible. Veuillez en créer une");
            this.activeVersion = 'Aucune_version';
            this.router.navigateByUrl('/versions');
          }
        },
        (response: any) => {
          this.toastrService.error("Erreur lors de la récupération des versions");
          this.activeVersion = 'Aucune_version';
        }
      );
    }else{
     
      //If no Version is set, set latest version as default
      this.versions = this.globalStorageService.get('AllVersions', true);
      if(this.globalStorageService.get('ActiveVersion') == null){
        this.globalStorageService.set('ActiveVersion', this.versions[0]);
        this.activeVersion  = this.versions[0];
      }
      this.activeVersion    = this.globalStorageService.get('ActiveVersion', true);
      
    }
}

  onViewAllVersions(){
    this.router.navigateByUrl('/versions');
  }

  onChangeCurrentVersion(version_id: string){
    var selectedVersion = this.versions[0]; 
    for (let i = 0; i < this.versions.length; i++) {
      if(version_id == this.versions[i].id){
        selectedVersion = this.versions[i];
      }
    }
    this.globalStorageService.set('ActiveVersion', selectedVersion);
    window.location.reload();
  }
  
  onViewAllUser(){
    this.router.navigateByUrl('/users');
  }

  onViewProfile(){
    let userId = this.authService.getUserInfo().id;
    this.router.navigateByUrl('/users/profile/'+userId);
  }

  onLogout(){
    this.authService.logout().subscribe(
      (data: any) => {
        this.tokenStorageService.clearAuthSession();
        this.router.navigateByUrl('/login');
      },
      (response: any) => {
        this.toastrService.error("Erreur lors de la déconnexion.");
      }
    );
  }
    
}
