import { Component, input } from "@angular/core";



@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.html',
})

export class Pagination {

  pages = input(0);
  currentPage = input<number>(1);

  

}
