import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Article } from '../models/article.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient){}
  
  updateQECBoitesDirappro(changedDirapproQECBoite: any){
    return this.http.put<any>(environment.apiHostname+'/api/articles/updateQECBoitesDirappro', changedDirapproQECBoite);
  }
  
  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(environment.apiHostname+'/api/articles')
  }

  addArticle(article: any){
    return this.http.post(environment.apiHostname+'/api/articles', article);
  }

  getOneArticle(id: string) : Observable<any>{
    return this.http.get<Article>(environment.apiHostname+'/api/articles/'+id);
  }

  updateArticle(id: string, article: any): any{
    return this.http.put<any>(environment.apiHostname+'/api/articles/'+id, article);
  }

  deleteArticle(id: string){
    return this.http.delete(environment.apiHostname+'/api/articles/'+id);
  }

  getAllArticlesWithStock(): Observable<Article[]> {
    return this.http.get<Article[]>(environment.apiHostname+'/api/articles/all/stocks')
  }

  importArticle(articles_data: any){
    return this.http.post(environment.apiHostname+'/api/articles/import-from-file', articles_data);
  }

}
