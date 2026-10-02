import { toSignal } from '@angular/core/rxjs-interop';
import { inject, Injectable, signal } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { map } from 'rxjs';


@Injectable({providedIn: 'root'})
export class PaginationService {

  private _activatedRoute = inject(ActivatedRoute);

  currentPage = toSignal(
    this._activatedRoute.queryParamMap.pipe(
      map((params: any) => params.get('page') ? parseInt(params.get('page')) : 1),
      map((page: number) => isNaN(page) ? 1 : page)
    ),
    {initialValue: 1}
  );

}
