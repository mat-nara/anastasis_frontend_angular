import { Injectable } from '@angular/core';
import { Stock } from '../models/stock'; 
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient){}

  getAllStocks(version: string): Observable<Stock[]> {
    return this.http.get<Stock[]>(environment.apiHostname+'/api/articles/stocks/versions/'+version)
  }

  getOneStock(ArticleCode: string, version_id: string) : Observable<any>{
    return this.http.get<any>(environment.apiHostname+'/api/articles/'+ArticleCode+'/stocks/versions/'+version_id);
  }

  updateStock(ArticleCode: string, version_id: string, stock: Stock): any{
    return this.http.put<any>(environment.apiHostname+'/api/articles/'+ArticleCode+'/stocks/versions/'+version_id, stock);
  }

  deleteStock(ArticleCode: string, version_id: string){
    return this.http.delete(environment.apiHostname+'/api/articles/'+ArticleCode+'/stocks/versions/'+version_id);
  }
  
  importStock(version_id: number, stocks_data: any){
      return this.http.post(environment.apiHostname+'/api/articles/stocks/import-from-file/versions/'+version_id, stocks_data);
  }

}
