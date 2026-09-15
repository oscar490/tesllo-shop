import { Component, inject, OnInit, signal } from "@angular/core";
import { ProductCardItem } from "@products/interfaces/product-card-item.interface";
import { ProductCard } from "@products/product-card/product-card";
import { ProductService } from "@products/services/product.service";



@Component({
  selector: 'home-page',
  templateUrl: 'home-page.html',
  imports: [ProductCard]
})

export class HomePage implements OnInit {

  productService = inject(ProductService);
  productCards = signal<ProductCardItem[]>([]);

  ngOnInit(): void {
    this.productService.getProducts({}).subscribe((productCards: ProductCardItem[]) => {
      this.productCards.set(productCards);
    })
  }

}
