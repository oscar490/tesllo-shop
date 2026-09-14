import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FrontNavbar } from "../components/front-navbar/front-navbar";



@Component({
  selector: 'store-front-layout',
  templateUrl: './store-front-layout.html',
  imports: [RouterOutlet, FrontNavbar]
})

export class StoreFrontLayout {

}
