import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { generateBackPath } from 'src/app/_utils/generateUrlDomain';

@Injectable({
  providedIn: 'root'
})
export class DemandFlexService {

  constructor(private http: HttpClient) { }

  demandFlex(productId: string, userFlexId: string, sub: PushSubscription){
    return this.http.put(generateBackPath(`demandFlex/${productId}`), { userFlexId, sub });
  }
  
}
