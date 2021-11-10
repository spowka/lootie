import { DepositService } from '../../services/deposit.service';
import { Injectable } from '@angular/core';

import { Store, select, Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, from, Observable } from 'rxjs';
import { catchError, map, exhaustMap, debounceTime, tap, switchMap, withLatestFrom, flatMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import * as fromRoot from 'src/app/@store';
import * as fromAuthActions from 'src/app/auth/@store/auth/auth.action';
import * as fromDepositActions from './deposit.action';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class DepositEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.State>,
    private toast: ToastrService,
    private depositService: DepositService,
    private authService: AuthService
  ) { }

  @Effect()
  loadSteamItems$: Observable<fromDepositActions.LoadSteamItemsSuccess | fromDepositActions.LoadSteamItemsFail> = this.actions$
    .pipe(
      ofType(fromDepositActions.LOAD_STEAM_ITEMS),
      exhaustMap((action) => {
        return this.depositService.getSteamItems(action['payload']).pipe(
          map((res) => {
            if (res['statusCode']) {
              return new fromDepositActions.LoadSteamItemsSuccess(res['data']);
            }
            return new fromDepositActions.LoadSteamItemsFail(res);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromDepositActions.LoadSteamItemsFail(res));
          })
        );
      })
    );

  @Effect()
  proceedDeposit$: Observable<fromDepositActions.ProceedDepositSuccess | fromDepositActions.ProceedDepositFail> = this.actions$
    .pipe(
      ofType(fromDepositActions.PROCEED_DEPOSIT),
      exhaustMap((action) => {
        const { type, data, coupon } = action['payload'];
        const isCreditCharge = type === 'credit';
        const paymentOption = isCreditCharge ? 'card' : undefined;
        const box = localStorage.getItem('boxId');
        const d = localStorage.getItem('session');

        return this.depositService[isCreditCharge ? 'g2a' : type]({ data, coupon, paymentOption, box, d }).pipe(
          map((res) => {
            if (type === 'steam') {
              this.toast.success('We are processing your requests, please wait...');
            } else if (res['data'] && res['data'].checkoutUrl) {
              return new fromDepositActions.ProceedDepositSuccess(res['data'].checkoutUrl);
            }

            localStorage.removeItem('boxId');
            localStorage.removeItem('boxName');

            if (res['data'] && res['data'].balance && res['data'].deposited) {
              const { balance, deposited } = res['data'];
              this.store.dispatch(new fromAuthActions.UpdateUserBalance({ type: 'DEPOSIT', balance, deposited }));
              if (res['message']) {
                this.toast.success(res['message']);
              }
              return new fromDepositActions.ProceedDepositFail(res);
            }
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromDepositActions.ProceedDepositFail(res));
          })
        );
      })
    );
}
