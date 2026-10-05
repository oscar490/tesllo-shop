import { toSignal } from '@angular/core/rxjs-interop';
import { inject, Injectable, signal } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { map } from 'rxjs';


@Injectable({providedIn: 'root'})
export class PaginationService {

  private _activatedRoute = inject(ActivatedRoute);
  currentPage = signal<number>(1);

  /*
  currentPage = toSignal(
    this._activatedRoute.queryParamMap.pipe(
      map((params: any) => params.get('page') ? parseInt(params.get('page')) : 1),
      map((page: number) => isNaN(page) ? 1 : page)
    ),
    {initialValue: 1}
  );
  */

  constructor() {
    this.initCurrentPage();
  }

  initCurrentPage() {

    this._activatedRoute.queryParamMap.subscribe((param: ParamMap) => {
      const pageRoute = param.get('page');

      if (pageRoute) {
        let page = parseInt(pageRoute);
        this.currentPage.set(isNaN(page) ? 1 : page);
      }
    })

  }

}
