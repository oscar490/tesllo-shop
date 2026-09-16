
import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "@products/interfaces/product-response.interface";
import { ProductService } from "@products/services/product.service";


@Component({
  selector: 'product-page',
  templateUrl: './product-page.html'
})

export class ProductPage implements OnInit {

  _productService = inject(ProductService);
  _router = inject(ActivatedRoute)

  product = signal<Product | null>(null);

  productIdSlug: string = this._router.snapshot.params['idSlug'];

  ngOnInit(): void {
    this._productService.getProductByIdSlug(this.productIdSlug).subscribe((product: Product) => {
      this.product.set(product);
    })
  }

}
