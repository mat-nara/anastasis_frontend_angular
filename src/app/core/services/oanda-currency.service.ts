import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { GlobalStorageService } from './global-storage.service';
import { ToastrService } from "ngx-toastr";
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class OandaCurrencyService {

  constructor(
              private http: HttpClient,
              private globalStorageService: GlobalStorageService,
              private toastrService: ToastrService){}


  /**
   * 
   * @param base  : unit currency (ex: USD)
   * @param quote : unit currency value (ex: MGA)
   * @returns : 
   */
  async getCurrency(){

    var currency:any;

    //There is no currency yet
    if(this.globalStorageService.get('currency') == null){

      currency = await this.refreshCurrency();
      return currency;
    }else{

      currency  = JSON.parse(this.globalStorageService.get('currency')!);
      var date  = new Date();
      var today =  date.toISOString().split('T')[0];

      //Currency is out to date
      if(currency.expiryDate != today){
        currency = await this.refreshCurrency();
      }
      return currency;
    }    
  }

  async refreshCurrency(){

    var date        = new Date();
    var today       =  date.toISOString().split('T')[0];
    var currency = {
      usd: 0,
      eur: 0,
      expiryDate: today
    }

    try{
      var response = await this.getCurrencyFromServer('USD', 'MGA').toPromise();
      currency.usd = response.currency_unit;
    }catch(err){
      this.toastrService.error('Erreur lors de la récupération du Devise USD Oanda.');
    }

    try{
      var response = await this.getCurrencyFromServer('EUR', 'MGA').toPromise();
      currency.eur = response.currency_unit;
    }catch(err){
      this.toastrService.error('Erreur lors de la récupération du Devise EUR Oanda.');
    }

    await this.globalStorageService.set('currency', JSON.stringify(currency));

    return currency;
  }

  getCurrencyFromServer(base: string, quote: string){
    return this.http.get<any>(environment.apiHostname+'/api/ondaCurrency/base/'+base+'/quote/'+quote);
  }

}
