import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient){}

  getAllVersions(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiHostname+'/api/versions')
  }

  addVersion(version: any){
    return this.http.post(environment.apiHostname+'/api/versions', version);
  }

  getOneVersion(id: string) : Observable<any>{
    return this.http.get<any>(environment.apiHostname+'/api/versions/'+id);
  }

  updateVersion(id: string, version: any): any{
    return this.http.put<any>(environment.apiHostname+'/api/versions/'+id, version);
  }

  deleteVersion(id: string){
    return this.http.delete(environment.apiHostname+'/api/versions/'+id);
  }

}
