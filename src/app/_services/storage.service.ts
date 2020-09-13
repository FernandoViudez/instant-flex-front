import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getTokenIntoStorage(){
    return localStorage.getItem(environment.storageItem);
  }

  setToken(token: string){
    return localStorage.setItem(environment.storageItem, token);
  }

  deleteToken(){
    return localStorage.removeItem(environment.storageItem);
  }

  setItem(itemName: string, itemValue: string ){
    localStorage.setItem(itemName, itemValue);
  }

  checkItem(itemName: string){
    return localStorage.getItem(itemName);
  }

  removeItem(itemName: string){
    return localStorage.removeItem(itemName);
  }
  
}
