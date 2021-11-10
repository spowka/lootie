import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromHistoryAction from './history.action';
import * as fromProvablyFair from 'src/app/@store/provably-fair';
import * as fromRouter from 'src/app/@store/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HistoryEffects {
  constructor(
    private actions$: Actions,
    private toast: ToastrService,
    private translate: TranslateService,
    private store: Store<fromRoot.State>,
    private http: HttpClient
  ) {}

  @Effect()
  loadUpgrades$: Observable<
    fromHistoryAction.LoadUpgradesSuccess | fromHistoryAction.LoadUpgradesFail
  > = this.actions$.pipe(
    ofType(fromHistoryAction.LOAD_UPGRADES),
    exhaustMap((action: fromHistoryAction.LoadUpgrades) => {
      const { pagination: { limit, offset }, userId } = action['payload'] as any;
      const params = `limit=${limit}&offset=${offset}&user=${userId}`;

      return this.http.get(`${environment.apiUrl}/upgrades?${params}`).pipe(
        map((res) => {
          return new fromHistoryAction.LoadUpgradesSuccess(res['data']);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
            this.toast.error(error && error.message ? error.message : response);
          });
          return of(new fromHistoryAction.LoadUpgradesFail(res));
        })
      );
    })
  );

  @Effect()
  loadUnboxings$: Observable<
    fromHistoryAction.LoadUnboxingsSuccess | fromHistoryAction.LoadUnboxingsFail
  > = this.actions$.pipe(
    ofType(fromHistoryAction.LOAD_UNBOXINGS),
    exhaustMap((action) => {
      const { pagination: { limit, offset }, userId } = action['payload'] as any;
      const params = `limit=${limit}&offset=${offset}&user=${userId}`;

      return this.http.get(`${environment.apiUrl}/case-openings?${params}`).pipe(
        map((res) => {
          const { data } = res['data'];
          return new fromHistoryAction.LoadUnboxingsSuccess(data);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
            this.toast.error(error && error.message ? error.message : response);
          });
          return of(new fromHistoryAction.LoadUnboxingsFail(res));
        })
      );
    })
  );

  @Effect()
  loadWitdrawals$: Observable<
    fromHistoryAction.LoadWithdrawalsSuccess | fromHistoryAction.LoadWithdrawalsFail
  > = this.actions$.pipe(
    ofType(fromHistoryAction.LOAD_WITHDRAWALS),
    exhaustMap((action) => {
      const { pagination: { limit, offset } } = action['payload'] as any;
      const params = `limit=${limit}&offset=${offset}&sortBy=createdAt&sortDirection=desc`;

      return this.http.get(`${environment.apiUrl}/withdrawals?${params}`).pipe(
        map((res) => {
          return new fromHistoryAction.LoadWithdrawalsSuccess(res['data']['data']);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
            this.toast.error(error && error.message ? error.message : response);
          });
          return of(new fromHistoryAction.LoadWithdrawalsFail(res));
        })
      );
    })
  );

  @Effect()
  loadDeposits$: Observable<
    fromHistoryAction.LoadDepositsSuccess | fromHistoryAction.LoadDepositsFail
  > = this.actions$.pipe(
    ofType(fromHistoryAction.LOAD_DEPOSITS),
    exhaustMap((action) => {
      const { transactionType, pagination: { limit, offset } } = action['payload'] as any;
      let params = transactionType
        ? `transactionType=${transactionType}&limit=${limit}&offset=${offset}&sortBy=createdAt&sortDirection=desc`
        : `limit=${limit}&offset=${offset}&sortBy=createdAt&sortDirection=desc`;

      return this.http.get(`${environment.apiUrl}/transactions?${params}`).pipe(
        map((res) => {
          return new fromHistoryAction.LoadDepositsSuccess(res['data']['data']);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
            this.toast.error(error && error.message ? error.message : response);
          });
          return of(new fromHistoryAction.LoadDepositsFail(res));
        })
      );
    })
  );

  @Effect()
  loadLatestDrops$: Observable<
    fromHistoryAction.LoadLatestDropsSuccess | fromHistoryAction.LoadLatestDropsFail
  > = this.actions$.pipe(
    ofType(fromHistoryAction.LOAD_LATEST_DROPS),
    exhaustMap(() => {
      return this.http.get(`${environment.apiUrl}/case-openings/latest-drops`).pipe(
        map((res) => {
          return new fromHistoryAction.LoadLatestDropsSuccess(res['data']);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
            this.toast.error(error && error.message ? error.message : response);
          });
          return of(new fromHistoryAction.LoadLatestDropsFail(res));
        })
      );
    })
  );

  @Effect()
  loadTags$: Observable<
    fromHistoryAction.LoadTagsSuccess | fromHistoryAction.LoadTagsFail
  > = this.actions$.pipe(
    ofType(fromHistoryAction.LOAD_TAGS),
    exhaustMap(() => {
      return this.http.get(`${environment.apiUrl}/site-items/categories `).pipe(
        map((res) => {
          const { categories } = res['data'];
          const tags = [];
          Object.keys(categories).map(cat => tags.push(...Object.keys(categories[cat])));
          tags.unshift('All');
          return new fromHistoryAction.LoadTagsSuccess(tags);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
            this.toast.error(error && error.message ? error.message : response);
          });
          return of(new fromHistoryAction.LoadTagsFail(res));
        })
      );
    })
  );
}
