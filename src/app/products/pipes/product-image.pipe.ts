import { inject, Pipe, PipeTransform } from "@angular/core";
import { ProductService } from "@products/services/product.service";


@Pipe({
  name: 'productImage'
})

export class ProductImagePipe implements PipeTransform {

  _productService = inject(ProductService);

  transform(value: string | string[]): string {

    if (typeof value == 'string') {
      return this._productService.getFileProduct(value);
    }

    const image = value[0];

    if (!image) {
      return '/assets/images/no-image.jpg';
    }

    return this._productService.getFileProduct(image);

  }

}
