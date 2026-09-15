
import { SlicePipe } from "@angular/common";
import { Component, input } from "@angular/core"
import { RouterLink } from "@angular/router";


@Component({
    selector: 'product-card',
    templateUrl: './product-card.html',
    imports: [RouterLink, SlicePipe]
})

export class ProductCard {

  title = input.required<string>();
  description = input.required<string>();

}
