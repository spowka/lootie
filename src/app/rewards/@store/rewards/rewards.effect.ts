import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromActions from './rewards.action';
import { RewardsService } from 'src/app/rewards/services/rewards.service';

@Injectable()
export class RewardsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.State>,
    private rewardsService: RewardsService,
    private toast: ToastrService,
  ) { }

  @Effect()
  sendInvite$: Observable<fromActions.ClaimEmailSuccess | fromActions.ClaimEmailFail> = this.actions$
    .pipe(
      ofType(fromActions.CLAIM_EMAIL),
      exhaustMap(() => {
        return this.rewardsService.claimEmail().pipe(
          map((res) => {
            this.toast.success('Email reward claimed successfully');
            this.store.dispatch(new fromAuth.UpdateUserInfo());
            return new fromActions.ClaimEmailSuccess(res['data']);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromActions.ClaimEmailFail(res));
          })
        );
      })
    );

  @Effect()
  claimDiscrod$: Observable<fromActions.ClaimDiscordSuccess | fromActions.ClaimDiscordFail> = this.actions$
    .pipe(
      ofType(fromActions.CLAIM_DISCORD),
      exhaustMap((action) => {
        return this.rewardsService.claimDiscord(action['payload']).pipe(
          map((res) => {
            this.toast.success('Discrod reward claimed successfully');
            this.store.dispatch(new fromAuth.UpdateUserInfo());
            return new fromActions.ClaimDiscordSuccess(res['data']);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromActions.ClaimDiscordFail(res));
          })
        );
      })
    );

  @Effect()
  claimFacebook$: Observable<fromActions.ClaimFacebookSuccess | fromActions.ClaimFacebookFail> = this.actions$
    .pipe(
      ofType(fromActions.CLAIM_FACEBOOK),
      exhaustMap((action) => {
        return this.rewardsService.claimFacebook().pipe(
          map((res) => {
            this.toast.success('Facebook reward claimed successfully');
            this.store.dispatch(new fromAuth.UpdateUserInfo());
            return new fromActions.ClaimFacebookSuccess(res['data']);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromActions.ClaimFacebookFail(res));
          })
        );
      })
    );

  @Effect()
  claimTwitter$: Observable<fromActions.ClaimTwitterSuccess | fromActions.ClaimTwitterFail> = this.actions$
    .pipe(
      ofType(fromActions.CLAIM_TWITTER),
      exhaustMap((action) => {
        return this.rewardsService.claimTwitter().pipe(
          map((res) => {
            this.toast.success('Twitter reward claimed successfully');
            this.store.dispatch(new fromAuth.UpdateUserInfo());
            return new fromActions.ClaimTwitterSuccess(res['data']);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromActions.ClaimTwitterFail(res));
          })
        );
      })
    );

}
