
import { Component, computed, DoCheck, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { title } from "process";
import { routes } from "../../../app.routes";
import { combineLatest, map, tap } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { ProductList } from "@products/components/product-list/product-list";
import { ProductService } from "@products/services/product.service";
import { Product, ProductResponse } from "@products/interfaces/product-response.interface";
import { PaginationService } from "@shared/components/pagination/pagination.service";
import { Pagination } from "@shared/components/pagination/pagination";
import { ProductsData } from "@products/interfaces/products-data";

interface Title {
  title: string,
  router: string
};

@Component({
  selector: 'gender-page',
  templateUrl: './gender-page.html',
  imports: [ProductList, Pagination]
})

export class GenderPage implements OnInit {

  _activeRouter = inject(ActivatedRoute);
  _productService = inject(ProductService);
  _paginateService = inject(PaginationService);

  products = signal<Product[]>([]);

  gender = toSignal(this._activeRouter.params.pipe(
    map(({gender}) => gender)
  ));

  pages = signal<number>(0);
  currentPage = signal<number>(1);


  ngOnInit(): void {
    combineLatest([
      this._activeRouter.paramMap,
      this._activeRouter.queryParamMap
    ]).subscribe(([param, queryParams]) => {

      this.currentPage.set(this._paginateService.currentPage());

      this._paginateService.getListProductsPaginate({gender: param.get('gender') ?? 'all'}).subscribe((productsData: ProductsData) => {
        this.products.set(productsData.products);
        this.pages.set(productsData.pages);
      })
    });
  }

}
