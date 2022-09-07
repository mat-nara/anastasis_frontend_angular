import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PropDirApproService {

  constructor(private http: HttpClient){}

  getAllPropDirAppro(version: string): Observable<any[]> {
    return this.http.get<any[]>(environment.apiHostname+'/api/propdirappro/version/'+version);
  }

  setPropDirAppro(ArticleCode: string, version: string, propdirappro: any) : Observable<any>{
    return this.http.post<any>(environment.apiHostname+'/api/articles/'+ArticleCode+'/propdirappros/versions/'+version, propdirappro);
  }
  
}
