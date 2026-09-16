import { Component, inject, OnInit, signal } from "@angular/core";
import { ProductCard } from "@products/components/product-card/product-card";
import { Product } from "@products/interfaces/product-response.interface";
import { ProductService } from "@products/services/product.service";



@Component({
  selector: 'home-page',
  templateUrl: 'home-page.html',
  imports: [ProductCard]
})

export class HomePage implements OnInit {

  productService = inject(ProductService);
  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.productService.getProducts({}).subscribe((products: Product[]) => {
      this.products.set(products);
    })
  }

}
