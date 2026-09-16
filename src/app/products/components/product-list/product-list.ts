import { Component, input } from "@angular/core";
import { Product } from "@products/interfaces/product-response.interface";
import { ProductCard } from "../product-card/product-card";



@Component({
  selector: 'product-list',
  templateUrl: './product-list.html',
  imports: [ProductCard]
})

export class ProductList {

  products = input.required<Product[]>();

}
