import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductCard } from "@products/components/product-card/product-card";
import { Product } from "@products/interfaces/product-response.interface";
import { ProductService } from "@products/services/product.service";
import { Pagination } from "@shared/components/pagination/pagination";



@Component({
  selector: 'home-page',
  templateUrl: 'home-page.html',
  imports: [ProductCard, Pagination]
})

export class HomePage implements OnInit {

  productService = inject(ProductService);
  products = signal<Product[]>([]);
  route = inject(ActivatedRoute);

  ngOnInit(): void {

    const pageParam = this.route.snapshot.queryParamMap.get('page') ?? 1;

    this.productService.getProducts({}).subscribe((products: Product[]) => {
      this.products.set(products);
    })
  }

}
