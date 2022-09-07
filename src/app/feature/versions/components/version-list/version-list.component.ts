import { Component, OnInit } from '@angular/core';
import { VersionService } from 'src/app/core/services/version.service'; 
import { GlobalStorageService } from 'src/app/core/services/global-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.scss']
})
export class VersionListComponent implements OnInit {

  versionsDataSource!: any;
  displayedColumns!: any;

  allSliderState!: boolean;

  constructor(

                private globalStorageService: GlobalStorageService,
                private VersionService: VersionService,
                private router: Router,
                private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.VersionService.getAllVersions().subscribe(
      (data: any) => {
        let ActiveVersion     = this.globalStorageService.get('ActiveVersion', true)! as any;
        var isSelectedVersion = false;

        //Set latest version as default if not Set
        if(ActiveVersion == null){
          this.globalStorageService.set('ActiveVersion', data[0]);
          ActiveVersion = data[0];
        }

        this.versionsDataSource   = data.map((version: any) => {
                                      isSelectedVersion = version.id == ActiveVersion.id? true : false 
                                      return { ...version, selected: isSelectedVersion, actions: "" } 
                                    });
        this.displayedColumns     = ['name', 'description', 'createdAt', 'updatedAt', 'selected', 'actions'];

        this.allSliderState = false;

      },(response: any) => {
        this.toastrService.error(response.error.message);
      }
    );
  }

  onAddVersion(){
    this.router.navigateByUrl("/versions/new");
  }

  onViewVersion(id: string){
    this.router.navigateByUrl('/versions/detail/'+id);
  }

  onDeleteUser(name: string, id: string){
    if(confirm("êtes-vous sûre vouloir supprimer "+name+"?"))
    {
      this.VersionService.deleteVersion(id).subscribe(
        (data: any) => {
          this.toastrService.success("Version supprimer avec succès");
          this.globalStorageService.remove('ActiveVersion');
          this.globalStorageService.remove('AllVersions');
          window.location.reload();
        },(response: any) => {
          this.toastrService.error(response.error.message);
          this.ngOnInit();
        }
      )
    }
  }

  handleCheck(event: any, id: string){
    this.versionsDataSource.forEach((opt: any) => { 
      if(opt.id == event.source._elementRef.nativeElement.id){
        opt.selected = true;
      }else{
        opt.selected = false;
      }
    });     
    
    var versions      = this.globalStorageService.get('AllVersions', true)! as any;
    var activeVersion = versions.length > 0 ? versions[0]: null; 

    for (let i = 0; i < versions.length; i++) {
      if(id == versions[i].id){
        activeVersion = versions[i];
      }
    }
  
    this.globalStorageService.set('ActiveVersion', activeVersion);
    window.location.reload();
  }
}
