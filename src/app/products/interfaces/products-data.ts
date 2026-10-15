import { Product } from "./product-response.interface";

export interface ProductsData {
  products: Product[],
  pages: number
}
