import { ProvablyFairService } from '../../provably-fair/services/provably-fair.service';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import * as fromRoot from 'src/app/@store';
import * as fromActions from './provably-fair.action';
import * as fromBattleActions from 'src/app/battle/@store/battle/battle.action';

@Injectable()
export class ProvablyFairEffects {
  constructor(
    private actions$: Actions,
    private toast: ToastrService,
    private service: ProvablyFairService,
    private store: Store<fromRoot.State>
  ) { }

  @Effect()
  setClientSeed$: Observable<fromActions.ChangeClientSeedSuccess> = this.actions$
    .pipe(
      ofType(fromActions.SET_CLIENT_SEED),
      map(() => {
        let seed = localStorage.getItem('clientSeed');
        if (!seed) {
          seed = this.service.generateClientSeed();
          localStorage.setItem('clientSeed', seed);
        }
        return new fromActions.ChangeClientSeedSuccess(seed);
      })
    );

  @Effect()
  changeClientSeed$: Observable<fromActions.ChangeClientSeedSuccess | fromActions.ChangeClientSeedFail | fromActions.UpdateServerSeedFail> = this.actions$
    .pipe(
      ofType(fromActions.CHANGE_CLIENT_SEED),
      exhaustMap((action) => {
        const { id, seed } = action['payload'];

        localStorage.setItem('clientSeed', seed);

        if (!id) {
          this.toast.success('Client seed successfully updated');
          return of(new fromActions.ChangeClientSeedSuccess(seed));
        }

        return this.service.changeClientSeed(id, seed).pipe(
          map(_ => {
            this.toast.success('Client seed successfully updated');
            return new fromActions.ChangeClientSeedSuccess(seed);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromActions.UpdateServerSeedFail(res));
          })
        );
      })
    );

  @Effect()
  updateServerSeed$: Observable<fromActions.UpdateServerSeedSuccess | fromActions.UpdateServerSeedFail> = this.actions$
    .pipe(
      ofType(fromActions.UPDATE_SERVER_SEED),
      exhaustMap((action) => {
        const { id, diceId, isBattle } = action['payload'];

        return this.service.updateServerSeed(id, diceId).pipe(
          map((res) => {
            if (isBattle) {
              this.store.dispatch(new fromBattleActions.UpdateServerSeed(res['data']));
            }

            return new fromActions.UpdateServerSeedSuccess(res['data']);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromActions.UpdateServerSeedFail(res));
          }) 
        );
      })
    );

  @Effect()
  getProvablyFair$: Observable<fromActions.GetProvablyFairSuccess | fromActions.GetProvablyFairFail> = this.actions$
    .pipe(
      ofType(fromActions.GET_PROVABLY_FAIR),
      exhaustMap((action) => {
        return this.service.getProvablyFair(action['payload']).pipe(
          map((res) => {
            return new fromActions.GetProvablyFairSuccess(res['data']);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromActions.GetProvablyFairFail(res));
          })
        );
      })
    );
}
