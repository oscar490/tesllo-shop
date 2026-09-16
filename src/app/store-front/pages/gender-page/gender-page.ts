
import { Component, computed, DoCheck, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { title } from "process";
import { routes } from "../../../app.routes";
import { map, tap } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { ProductList } from "@products/components/product-list/product-list";
import { ProductService } from "@products/services/product.service";
import { Product } from "@products/interfaces/product-response.interface";

interface Title {
  title: string,
  router: string
};

@Component({
  selector: 'gender-page',
  templateUrl: './gender-page.html',
  imports: [ProductList]
})

export class GenderPage implements OnInit {

  _activeRouter = inject(ActivatedRoute);
  _productService = inject(ProductService);

  products = signal<Product[]>([]);
  gender = toSignal(this._activeRouter.params.pipe(
    map(({gender}) => gender)
  ));

  titles: Title[] = [
    {title: 'Hombres', router: 'men'},
    {title: 'Mujeres', router: 'women'},
    {title: 'Kids', router: 'kid'}
  ];


  titlePage = computed(() => {
    return this.titles.filter((title: Title) => title.router == this.gender())[0];
  })

  ngOnInit(): void {
    this._activeRouter.paramMap.subscribe((param: ParamMap) => {
      this._productService.getProducts({gender: this.gender()}).subscribe((products: Product[]) => {
        this.products.set(products);
      })
    })
  }

}
