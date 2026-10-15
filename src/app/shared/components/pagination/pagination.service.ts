import { toSignal } from '@angular/core/rxjs-interop';
import { inject, Injectable, signal } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { map, Observable, of, tap } from 'rxjs';
import { Product, ProductResponse } from '@products/interfaces/product-response.interface';
import { ProductService } from '@products/services/product.service';
import { ProductsData } from '@products/interfaces/products-data';
import { Options } from '@shared/interfaces/options';

type CategoryKey = 'men' |'women' | 'kid' | 'all';

type CacheStructure = Map<string, Map<number, ProductResponse>>;


@Injectable({providedIn: 'root'})
export class PaginationService {

  private readonly STORAGE_KEY = 'products_pagination_cache';

  private _activatedRoute = inject(ActivatedRoute);
  private _productService = inject(ProductService);

  private _cache: CacheStructure = new Map([
    ['men', new Map()],
    ['women', new Map()],
    ['kid', new Map()],
    ['all', new Map()]
  ]);


  currentPage = toSignal(
    this._activatedRoute.queryParamMap.pipe(
      map((params: any) => params.get('page') ? parseInt(params.get('page')) : 1),
      map((page: number) => isNaN(page) ? 1 : page),
    ),
    {initialValue: 1}
  );

  constructor() {
    //  this.loadFromLocalStorage();
  }


  private loadFromLocalStorage(): void {

  }



  private setPageProducts(category: any, productResponse: ProductResponse) {
    const categoryMap = this._cache.get(category);

    if (categoryMap) {
      categoryMap.set(this.currentPage(), productResponse)
      console.log(categoryMap, JSON.stringify(categoryMap));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categoryMap));
    }
  }




  getListProductsPaginate(options?: Options): Observable<ProductResponse> {

    const gender = (options?.gender ?? 'all');
    const productsCache = this._cache.get(gender);
    const productsPage = (productsCache && productsCache?.get(this.currentPage()));

    if (productsPage) {
      return of(productsPage);
    }

    return this._productService.getProducts({gender: options?.gender, offset: (this.currentPage() - 1) * 9}).pipe(
      tap((productResponse: ProductResponse) => this.setPageProducts(gender, productResponse))
    );
  }

}
