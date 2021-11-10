import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { of, Observable } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import { ShopService } from 'src/app/shop/services/shop.service';

import * as fromActions from './shop.action';

@Injectable()
export class ShopEffects {
  constructor(
    private actions$: Actions,
    private shopService: ShopService,
    private toast: ToastrService,
    private translate: TranslateService
  ) {}

  @Effect()
  loadSiteItems$: Observable<
    fromActions.LoadItemsSuccess | fromActions.LoadItemsFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_ITEMS),
    exhaustMap((action) => {
      const { pagination, filters, sidebarFilters, search, tag } = action['payload'];
      return this.shopService
        .getSiteItems(pagination, filters, sidebarFilters, search, tag)
        .pipe(
          map((res) => {
            return new fromActions.LoadItemsSuccess(res['data']);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.translate
              .get('UNDEFINED_ERROR')
              .subscribe((response: string) => {
                this.toast.error(
                  error && error.message ? error.message : response
                );
              });
            return of(new fromActions.LoadItemsFail(res));
          })
        );
    })
  );

  @Effect()
  loadCategories$: Observable<
    fromActions.LoadCategoriesSuccess | fromActions.LoadCategoriesFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_CATEGORIES),
    exhaustMap(() => {
      return this.shopService.getSiteItemsCategories().pipe(
        map((res) => {
          return new fromActions.LoadCategoriesSuccess(res['data']);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
            this.toast.error(error && error.message ? error.message : response);
          });
          return of(new fromActions.LoadCategoriesFail(res));
        })
      );
    })
  );

  @Effect()
  buyItem$: Observable<
    fromActions.BuyItemSuccess | fromActions.BuyItemFail
  > = this.actions$.pipe(
    ofType(fromActions.BUY_ITEM),
    exhaustMap((action) => {
      const itemId = action['payload'];
      return this.shopService
        .buyItem(itemId)
        .pipe(
          map((res) => {
            return new fromActions.BuyItemSuccess(res['data']);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.translate
              .get('UNDEFINED_ERROR')
              .subscribe((response: string) => {
                this.toast.error(
                  error && error.message ? error.message : response
                );
              });
            return of(new fromActions.BuyItemFail(res));
          })
        );
    })
  );
}
