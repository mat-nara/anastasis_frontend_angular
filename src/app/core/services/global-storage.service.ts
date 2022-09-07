import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalStorageService {

  constructor() { }

  public set(key: string, value: any): void {
    //Check if value type object
    if(typeof value === 'object' && value !== null){
      window.localStorage.setItem(key, JSON.stringify(value));
    }else{
      window.localStorage.setItem(key, value);
    }
  }

  public get(key: string, is_object?: boolean): any {
    var value = window.localStorage.getItem(key);

    //Check if value type object
    if(is_object){
      return JSON.parse(value!);
    }else{
      return value;
    }
  }

  public remove(key: string){
    window.localStorage.removeItem(key);
  }

}
