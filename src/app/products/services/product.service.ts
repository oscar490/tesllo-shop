import { Product, ProductResponse } from './../interfaces/product-response.interface';
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from '../../../environments/environment';

interface Options {
  limit?: number;
  offset?: number;
  gender?: string
};


@Injectable({providedIn: 'root'})

export class ProductService {

  private _http = inject(HttpClient);
  private _env = environment;

  getProducts(options: Options): Observable<Product[]> {

    const {limit = 9, offset = 0, gender = ''} = options;

     return this._http.get<ProductResponse>(`${this._env.baseUrl}/products`, {
        params: {limit: limit, offset: offset, gender: gender}
      }).pipe(
        map((productResponse: ProductResponse) => {
          return productResponse.products;
        })
      )
  }

  getFileProduct(fileName: string): string {
    return `${this._env.baseUrl}/files/product/${fileName}`;
  }

}
