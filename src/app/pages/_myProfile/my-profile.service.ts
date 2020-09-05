import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { generateBackPath } from 'src/app/_utils/generateUrlDomain';

@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

  constructor(private http: HttpClient) { }

  getMe(){
    return this.http.get(generateBackPath('getMe'));
  }

}
