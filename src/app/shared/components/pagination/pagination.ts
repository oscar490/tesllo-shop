import { Component, computed, input, OnInit, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.html',
  imports: [RouterLink]
})

export class Pagination implements OnInit {

  pages = input(0);
  currentPage = input<number>(1);

  activePage = signal<number>(1);

  getPageList = computed(() => {
    return Array.from({length: this.pages()}, (_, index) => index + 1);
  })

  ngOnInit(): void {
    this.activePage.set(this.currentPage());
  }


}
