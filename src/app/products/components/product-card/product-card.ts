import { ProductService } from '@products/services/product.service';

import { SlicePipe } from "@angular/common";
import { Component, computed, inject, Inject, input } from "@angular/core"
import { RouterLink } from "@angular/router";
import { Product } from "@products/interfaces/product-response.interface";
import { environment } from "../../../../environments/environment";
import { ProductImagePipe } from '@products/pipes/product-image.pipe';


@Component({
    selector: 'product-card',
    templateUrl: './product-card.html',
    imports: [RouterLink, SlicePipe, ProductImagePipe]
})

export class ProductCard {

  product = input.required<Product>();

  _env = environment;
  _productService = inject(ProductService);

  imageUrl = computed(() => {
    return this._productService.getFileProduct(this.product().images[0]);
  })
}
