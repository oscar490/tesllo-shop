import { Product, ProductResponse } from './../interfaces/product-response.interface';
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ProductMapper } from '@products/mapper/product.mapper';
import { map, Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { ProductCardItem } from '@products/interfaces/product-card-item.interface';

interface Options {
  limit?: number;
  offset?: number;
  gender?: string
};


@Injectable({providedIn: 'root'})

export class ProductService {

  private _http = inject(HttpClient);
  private _env = environment;

  getProducts(options: Options): Observable<ProductCardItem[]> {

    const {limit = 9, offset = 0, gender = ''} = options;

    return this._http.get<ProductResponse>(`${this._env.baseUrl}/products`, {
      params: {limit: limit, offset: offset, gender: gender}
    }).pipe(
      map((productResponse: ProductResponse) => {
        return productResponse.products.map((product: Product) => ProductMapper.productToProductCard(product))
      })
    )
  }

}
