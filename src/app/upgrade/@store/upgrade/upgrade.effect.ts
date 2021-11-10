import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import * as fromRoot from 'src/app/@store';
import * as fromActions from './upgrade.action';
import * as fromProvablyFair from 'src/app/@store/provably-fair';
import { UpgradeService } from 'src/app/upgrade/services/upgrade.service';

@Injectable()
export class UpgradeEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.State>,
    private upgradeService: UpgradeService,
    private toast: ToastrService,
  ) { }

  @Effect()
  loadSiteItems$: Observable<fromActions.LoadSiteItemsSuccess | fromActions.LoadSiteItemsFail> = this.actions$
    .pipe(
      ofType(fromActions.LOAD_SITE_ITEMS),
      exhaustMap((action) => {
        const { pagination, filters, search } = action['payload'];

        return this.upgradeService.getSiteItems(pagination, filters, search).pipe(
          map((res) => {
            if (res['success']) {
              return new fromActions.LoadSiteItemsSuccess(res['result']['data']);
            }
            return new fromActions.LoadSiteItemsFail(res);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromActions.LoadSiteItemsFail(res));
          })
        );
      })
    );

  @Effect()
  loadInventoryItems$: Observable<fromActions.LoadInventoryItemsSuccess | fromActions.LoadInventoryItemsFail> = this.actions$
    .pipe(
      ofType(fromActions.LOAD_INVENTORY_ITEMS),
      exhaustMap((action) => {
        const { user, pagination, filters, search } = action['payload'];

        return this.upgradeService.getInventoryItems(user, pagination, filters, search).pipe(
          map((res) => {
            if (res['success']) {
              return new fromActions.LoadInventoryItemsSuccess(res['result']);
            }
            return new fromActions.LoadInventoryItemsFail(res);
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
  loadUpgrades$: Observable<fromActions.LoadUpgradesSuccess | fromActions.LoadUpgradesFail> = this.actions$
    .pipe(
      ofType(fromActions.LOAD_UPGRADES),
      exhaustMap(() => {
        return this.upgradeService.getUpgrades().pipe(
          map((res) => {
            if (res['statusCode'] === 200) {
              return new fromActions.LoadUpgradesSuccess(res['data'].items);
            }
            return new fromActions.LoadUpgradesFail(res);
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
  createUpgrade$: Observable<fromActions.CreateUpgradeSuccess | fromActions.CreateUpgradeFail> = this.actions$
    .pipe(
      ofType(fromActions.CREATE_UPGRADE),
      exhaustMap((action) => {

        return this.upgradeService.createUpgrade(action['payload']).pipe(
          map((res) => {
            if (res['data']) {
              const dice = res['data'].dice;
              this.store.dispatch(new fromProvablyFair.SetId(res['data']._id));
              this.store.dispatch(new fromProvablyFair.SetHashedServerSeed([{
                id: dice._id,
                seed: dice.seedHash,
              }]));

              return new fromActions.CreateUpgradeSuccess(res['data']);
            }
            return new fromActions.CreateUpgradeFail(res);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromActions.CreateUpgradeFail(res));
          })
        );
      }),
    );

  @Effect()
  rollAnUpgrade$: Observable<fromActions.RollAnUpgradeSuccess | fromActions.RollAnUpgradeFail> = this.actions$
    .pipe(
      ofType(fromActions.ROLL_AN_UPGRADE),
      exhaustMap((action) => {

        return this.upgradeService.rollAnUpgrade(action['payload']).pipe(
          map((res) => {
            if (res['data']) {
              const dice = res['data'].rollResult;
              this.store.dispatch(new fromProvablyFair.SetPreviousSeeds({
                clientSeed: dice.clientSeed,
                serverSeed: [dice.seed],
                serverSeedHashed: [dice.seedHash],
              }));

              this.store.dispatch(new fromActions.ResetUpgrade());
              return new fromActions.RollAnUpgradeSuccess(res['data']);
            }
            return new fromActions.RollAnUpgradeFail(res);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromActions.RollAnUpgradeFail(res));
          })
        );
      })
    );

  @Effect()
  createRollUpgrade$: Observable<fromActions.CreateUpgradeSuccess | fromActions.CreateUpgradeFail> = this.actions$
    .pipe(
      ofType(fromActions.CREATE_ROLL_UPGRADE),
      exhaustMap((action) => {

        return this.upgradeService.createUpgrade(action['payload']).pipe(
          map((res) => {
            if (res['data']) {
              this.store.dispatch(new fromActions.RollAnUpgrade(res['data']._id));
              return new fromActions.CreateUpgradeSuccess(res['data']);
            }
            return new fromActions.CreateUpgradeFail(res);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromActions.CreateUpgradeFail(res));
          })
        );
      }),
    );

  @Effect()
  getSuggestItem$: Observable<fromActions.GetSuggestItemSuccess | fromActions.GetSuggestItemFail> = this.actions$
    .pipe(
      ofType(fromActions.GET_SUGGEST_ITEM),
      exhaustMap((action) => {
        const { price, multiplier } = action['payload'];

        return this.upgradeService.getSuggestItem(price, multiplier).pipe(
          map((res) => {
            if (res['success']) {
              return new fromActions.GetSuggestItemSuccess(res['result']);
            }
            return new fromActions.GetSuggestItemFail(res);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromActions.GetSuggestItemFail(res));
          })
        );
      }),
    );

  @Effect()
  deleteUpgrade$: Observable<fromActions.DeleteUpgradeSuccess | fromActions.DeleteUpgradeFail> = this.actions$
    .pipe(
      ofType(fromActions.DELETE_UPGRADE),
      exhaustMap((action) => {
        return this.upgradeService.deleteUpgrade(action['payload']).pipe(
          map((res) => {
            return new fromActions.DeleteUpgradeSuccess();
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromActions.DeleteUpgradeFail(res));
          })
        );
      }),
    );
}
