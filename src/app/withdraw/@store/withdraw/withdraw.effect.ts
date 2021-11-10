import { WithdrawService } from '../../services/withdraw.service';
import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, exhaustMap, switchMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import * as fromActions from './withdraw.action';

@Injectable()
export class WithdrawEffects {
  constructor(
    private actions$: Actions,
    private withdrawService: WithdrawService,
    private toast: ToastrService
  ) {}

  @Effect()
  createWithdrawal$: Observable<
    fromActions.CreateWithdrawalSuccess | fromActions.CreateWithdrawalFail
  > = this.actions$.pipe(
    ofType(fromActions.CREATE_WITHDRAWAL),
    exhaustMap((action) => {
      return this.withdrawService.createWithdrawal(action['payload']).pipe(
        switchMap((_) => {
          this.toast.success('Withdrawal created successfully');
          return [
            new fromActions.CreateWithdrawalSuccess(),
            new fromActions.LoadWithdrawals({ pagination: { limit: 12, offset: 0 } }),
          ];
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.message ? error.message : 'Something went wrong');
          return of(new fromActions.CreateWithdrawalFail(res));
        })
      );
    })
  );

  @Effect()
  loadInventoryItems$: Observable<
    fromActions.LoadInventoryItemsSuccess | fromActions.LoadInventoryItemsFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_INVENTORY_ITEMS),
    exhaustMap((action) => {
      const { user, pagination, filters, search } = action['payload'];

      return this.withdrawService.getInventoryItems(user, pagination, filters, search).pipe(
        map((res) => {
          return new fromActions.LoadInventoryItemsSuccess(res['data'].data);
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
  getAdditionalFee$: Observable<
    fromActions.GetAdditionalFeeSuccess | fromActions.GetAdditionalFeeFail
  > = this.actions$.pipe(
    ofType(fromActions.GET_ADDITIONAL_FEE),
    exhaustMap((action) => {
      const payload = {
        details: action['payload'],
      };

      return this.withdrawService.getAdditionalFee(payload).pipe(
        map((res) => {
          return new fromActions.GetAdditionalFeeSuccess(res['data']);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.message ? error.message : 'Something went wrong');
          return of(new fromActions.GetAdditionalFeeFail(res));
        })
      );
    })
  );

  @Effect()
  loadWithdrawals$: Observable<
    fromActions.LoadWithdrawalsSuccess | fromActions.LoadWithdrawalsFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_WITHDRAWALS),
    exhaustMap((action) => {
      const { pagination } = action['payload'];
      return this.withdrawService.getWithdrawals(pagination).pipe(
        map((res) => {
          res['data']['data'].forEach((withdrawal) => {
            const item = withdrawal.item.itemId;
            if (withdrawal.item.details) {
              const details = withdrawal.item.details.variant || withdrawal.item.details;
              item.image = details.image || item.image;
              item.value = details.value || item.value;
              item.props = details.props;
            }
            withdrawal.item = item;
          });
          return new fromActions.LoadWithdrawalsSuccess(res['data']['data']);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.message ? error.message : 'Something went wrong');
          return of(new fromActions.LoadWithdrawalsFail(res));
        })
      );
    })
  );
}
