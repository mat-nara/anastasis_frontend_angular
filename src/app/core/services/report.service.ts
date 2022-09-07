import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient){}

  getReports(version: string) {
    return this.http.get(environment.apiHostname+'/api/reports/versions/'+version);
  }
}

