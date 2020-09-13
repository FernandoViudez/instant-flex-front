import { Injectable } from '@angular/core';
import { generateBackPath } from '../_utils/generateUrlDomain';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, 
              private storageSevice: StorageService) { }

  validateAndReturnToken(token: string){
    try {

      let payload: any = JSON.parse( window.atob(token.split(".")[1]) );
      
      if(payload._id && payload.email && payload.name && payload.surname){
        return payload;
      }else{
        return null;
      }
      
    
    } catch (error) {
      return null;
    }
  }

  /** Send the token into the local storage with the interceptor, and
   * Get the role of the user logged
   */
  validateUserRole(){
    return this.http.get(generateBackPath('validate')+ '/' + this.storageSevice.getTokenIntoStorage());
  }

  logIn( data: {email: string, password: string} ){
    return this.http.post(generateBackPath('login'), data );
  }

  setPassword( data: { password:string}, token: string ){
    return this.http.put(generateBackPath(`modify/password/${token}`), data);
  }

}
