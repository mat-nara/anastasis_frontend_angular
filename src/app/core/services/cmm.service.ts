import { Injectable } from '@angular/core';
import { CMM } from '../models/cmm.model'; 
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class CMMService {

  constructor(private http: HttpClient){}

  getAllCMM(version_id: string): Observable<CMM[]> {
    return this.http.get<CMM[]>(environment.apiHostname+'/api/articles/cmms/versions/'+version_id);
  }

  getOneCMM(ArticleCode: string, version_id: string) : Observable<any>{
    return this.http.get<any>(environment.apiHostname+'/api/articles/'+ArticleCode+'/cmms/versions/'+version_id);
  }

  updateCMM(ArticleCode: string, version_id: string, cmm: any): any{
    return this.http.put<any>(environment.apiHostname+'/api/articles/'+ArticleCode+'/cmms/versions/'+version_id, cmm);
  }

  deleteCMM(ArticleCode: string, version_id: string){
    return this.http.delete(environment.apiHostname+'/api/articles/'+ArticleCode+'/cmms/versions/'+version_id);
  }

  importCMM(version_id: number, cmm_data: any){
    return this.http.post(environment.apiHostname+'/api/articles/cmms/import-from-file/versions/'+version_id, cmm_data);
  }

}
