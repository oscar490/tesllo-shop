import { ProductCardItem } from "@products/interfaces/product-card-item.interface";
import { Product } from "@products/interfaces/product-response.interface";

export class ProductMapper {

  static productToProductCard(product: Product): ProductCardItem {
    return {
      id: product.id,
      title: product.title,
      description: product.description
    }
  }

}
