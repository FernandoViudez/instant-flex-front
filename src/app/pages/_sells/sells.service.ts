import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { generateBackPath } from 'src/app/_utils/generateUrlDomain';

@Injectable({
  providedIn: 'root'
})
export class SellsService {

  constructor(private http: HttpClient) { }

  getSells() {
    return this.http.get(generateBackPath('buysById'));
  }

  getSellById(sellId: string){
    return this.http.get(generateBackPath(`buy/${sellId}`));
  }

  createSell(productId: string, data: {
    clientName: string,
    clientSurname: string,
    clientDNI: number,
    clientPhone: number,
    postalCode: number,
    clientAdress: string,
    city: string,
    stock: number,
  }) {
    return this.http.post(generateBackPath(`soldProduct/${productId}`), data)
  }

}
