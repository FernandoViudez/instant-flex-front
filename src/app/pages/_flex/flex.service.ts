import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { generateBackPath } from 'src/app/_utils/generateUrlDomain';
import { Roles } from 'src/app/_utils/enums';

@Injectable({
  providedIn: 'root'
})
export class FlexService {

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get(generateBackPath(`getAllUsers/${Roles.flexRole}`));
  }

  getAllPackages(){
    return this.http.get(generateBackPath('getPackages'));
  }

  getSpecificPackage(packageId: string){
    return this.http.get(generateBackPath(`getPackage/${packageId}`));
  }

  addNewPackage(packageId: string, postalCode: string){
    return this.http.post(generateBackPath("newPackage"), { packageId, postalCode });
  }

  onGenerateRoute( buyId: string ){
    return this.http.get(generateBackPath(`generateRoute/${buyId}`));
  }

  onFinishDeliver(buyId: string, data: { getDeliverPersonId: number }){
    return this.http.put(generateBackPath(`deliverFinish/${buyId}`), data);
  }

  onFinishDay(arrayBuys: any[]){
    return this.http.post(generateBackPath("deliverFinishAll"), { arrayBuys });
  }

}
