import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import * as fromActions from './inventory.action';
import { InventoryService } from 'src/app/inventory/services/inventory.service';

@Injectable()
export class InventoryEffects {
  constructor(
    private actions$: Actions,
    private inventoryService: InventoryService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadInventoryItems$: Observable<
    fromActions.LoadInventoryItemsSuccess | fromActions.LoadInventoryItemsFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_INVENTORY_ITEMS),
    exhaustMap((action) => {
      const { user, pagination, filters, search } = action['payload'] as any;

      return this.inventoryService.getInventoryItems(user, pagination, filters, search).pipe(
        map((res) => {
          return new fromActions.LoadInventoryItemsSuccess(res['data']['data']);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.message ? error.message : 'Something went wrong');
          return of(new fromActions.LoadInventoryItemsFail(res));
        })
      );
    })
  );

  @Effect()
  sellItem$: Observable<
    fromActions.SellItemSuccess | fromActions.SellItemFail
  > = this.actions$.pipe(
    ofType(fromActions.SELL_ITEM),
    exhaustMap((action) => {
      const items = action['payload'] as any[];
      items.map((inventoryItem) => {
        window.analytics.track('Item Sold', {
          ProductNameSold: inventoryItem.item.name,
          ProductIDSold: inventoryItem.item._id,
          AmountSold: inventoryItem.item.value
        });
      });

      const removeItemsIds = items.map((inventoryItem) => inventoryItem._id);
      return this.inventoryService.sellItems(removeItemsIds).pipe(
        map((_) => {
          return new fromActions.SellItemSuccess();
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.message ? error.message : 'Something went wrong');
          return of(new fromActions.SellItemFail(res));
        })
      );
    })
  );

  @Effect()
  loadInventoryItemsForBattle$: Observable<
    fromActions.LoadInventoryItemsSuccess | fromActions.LoadInventoryItemsFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_INVENTORY_ITEMS_FOR_BATTLE),
    exhaustMap((action) => {
      const { battle } = action['payload'];

      return this.inventoryService.getInventoryItemsForBattle(battle).pipe(
        map((res) => {
          return new fromActions.LoadInventoryItemsSuccess(res['data']['data']);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.message ? error.message : 'Something went wrong');
          return of(new fromActions.LoadInventoryItemsFail(res));
        })
      );
    })
  );
}
