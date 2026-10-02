import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { ProductCard } from "@products/components/product-card/product-card";
import { Product, ProductResponse } from "@products/interfaces/product-response.interface";
import { ProductService } from "@products/services/product.service";
import { Pagination } from "@shared/components/pagination/pagination";
import { PaginationService } from '@shared/components/pagination/pagination.service';



@Component({
  selector: 'home-page',
  templateUrl: 'home-page.html',
  imports: [ProductCard, Pagination]
})

export class HomePage implements OnInit {

  productService = inject(ProductService);
  paginationService = inject(PaginationService);

  products = signal<Product[]>([]);
  route = inject(ActivatedRoute);
  pages = signal(0);

  currentPage = signal<number>(1);


  ngOnInit(): void {

    this.route.queryParamMap.subscribe((param: ParamMap) => {

      this.currentPage.set(this.paginationService.currentPage());

      this.productService.getProducts({offset: (this.currentPage() - 1) * 9}).subscribe((productResponse: ProductResponse) => {
        this.products.set(productResponse.products);
        this.pages.set(productResponse.pages);
      });
    })


  }

}
