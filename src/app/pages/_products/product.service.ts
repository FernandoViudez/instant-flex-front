import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { generateBackPath } from 'src/app/_utils/generateUrlDomain';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(generateBackPath('productsById'));
  }

  getProductById(productId: string){
    return this.http.get(generateBackPath(`product/${productId}`));
  }

  createProduct(data: {
    title: string,
    description: string,
    price: number,
    stock: number,
    img?: string
  }) {
    return this.http.post(generateBackPath('newProduct'), data);
  }

  updateProduct(data: {
    propertiesToUpdate: {
      title: string,
      description: string,
      price: number,
      stock: number,
      img?: string
    }
  }, prodId: string){
    return this.http.put(generateBackPath(`editProduct/${prodId}`), data);
  }

  deleteProduct(prodId: string){
    return this.http.delete(generateBackPath(`removeProduct/${prodId}`));
  }

}
