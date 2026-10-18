import { Product, ProductResponse } from '@products/interfaces/product-response.interface';
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";
import { environment } from '../../../environments/environment';
import { ProductsData } from '@products/interfaces/products-data';
import { Options } from '@shared/interfaces/options';


@Injectable({providedIn: 'root'})

export class ProductService {

  private _http = inject(HttpClient);
  private _env = environment;
  private _cache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductResponse> {

    const {limit = 9, offset = 0, gender = ''} = options;

    return this._http.get<ProductResponse>(`${this._env.baseUrl}/products`, {
      params: {limit: limit, offset: offset, gender: gender}
    });
  }

  getFileProduct(fileName: string): string {
    return `${this._env.baseUrl}/files/product/${fileName}`;
  }

  getProductByIdSlug(slug: string): Observable<Product> {

    const productCache = this._cache.get(slug);

    if (productCache) {
      return of(productCache);
    }

    return this._http.get<Product>(`${this._env.baseUrl}/products/${slug}`).pipe(
      tap((product: Product) => this._cache.set(product.slug, product))
    )
  }

}
