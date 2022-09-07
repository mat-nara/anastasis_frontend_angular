import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient){}

  getOrders(){
    return this.http.get(environment.apiHostname+'/api/orders');
  }

  addOrder(order: any){
    return this.http.post(environment.apiHostname+'/api/orders', order);
  }

  getOneOrder(_ref: string) : Observable<any>{
    return this.http.get<any>(environment.apiHostname+'/api/orders/'+_ref);
  }

  updateOrder(_ref: string, order: any): any{
    return this.http.put<any>(environment.apiHostname+'/api/orders/'+_ref, order);
  }

  deleteOrder(_ref: string){
    return this.http.delete(environment.apiHostname+'/api/orders/'+_ref);
  }

}
