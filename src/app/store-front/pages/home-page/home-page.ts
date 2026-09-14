import { Component } from "@angular/core";
import { ProductCard } from "@products/product-card/product-card";



@Component({
  selector: 'home-page',
  templateUrl: 'home-page.html',
  imports: [ProductCard]
})

export class HomePage {

}
