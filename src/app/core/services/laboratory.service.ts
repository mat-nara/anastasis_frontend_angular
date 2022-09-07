import { Injectable } from '@angular/core';
import { Laboratory } from '../models/laboratory.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  constructor(private http: HttpClient){}

  getAllLaboratories(): Observable<Laboratory[]> {
    return this.http.get<Laboratory[]>(environment.apiHostname+'/api/laboratories')
  }

  addLaboratories(user: any){
    return this.http.post(environment.apiHostname+'/api/laboratories', user);
  }

  getOneLaboratories(id: string) : Observable<Laboratory>{
    return this.http.get<Laboratory>(environment.apiHostname+'/api/laboratories/'+id);
  }

  updateLaboratories(id: string, user: any): any{
    return this.http.put<any>(environment.apiHostname+'/api/laboratories/'+id, user);
  }

  deleteLaboratories(id: string){
    return this.http.delete(environment.apiHostname+'/api/laboratories/'+id);
  }
}
