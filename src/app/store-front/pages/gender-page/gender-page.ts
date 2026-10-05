
import { Component, computed, DoCheck, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { title } from "process";
import { routes } from "../../../app.routes";
import { map, tap } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { ProductList } from "@products/components/product-list/product-list";
import { ProductService } from "@products/services/product.service";
import { Product, ProductResponse } from "@products/interfaces/product-response.interface";
import { PaginationService } from "@shared/components/pagination/pagination.service";
import { Pagination } from "@shared/components/pagination/pagination";

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
    this._activeRouter.queryParamMap.subscribe((param: ParamMap) => {

      this.currentPage.set(this._paginateService.currentPage());
      const offset = (this.currentPage() - 1) * 9;

      this._productService.getProducts({gender: this.gender(), offset: offset}).subscribe((productResponse: ProductResponse) => {
        this.products.set(productResponse.products);
        this.pages.set(productResponse.pages);
      })
    })
  }

}
