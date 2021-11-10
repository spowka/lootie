import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromActions from './affiliates.action';
import { AffiliatesService } from 'src/app/affiliates/services/affiliates.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AffiliatesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.State>,
    private affiliatesService: AffiliatesService,
    private toast: ToastrService,
    private translate: TranslateService
  ) { }

  @Effect()
  loadReferralInfo$: Observable<fromActions.LoadReferralInfoSuccess | fromActions.LoadReferralInfoFail> = this.actions$
    .pipe(
      ofType(fromActions.LOAD_REFERRAL_INFO),
      exhaustMap(() => {
        return this.affiliatesService.getReferralInfo().pipe(
          map((res) => {
            if (res['data']) {
              return new fromActions.LoadReferralInfoSuccess(res['data']);
            }
            return new fromActions.LoadReferralInfoFail(res);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
              this.toast.error(error && error.message ? error.message : response);
           });
            return of(new fromActions.LoadReferralInfoFail(res));
          })
        );
      })
    );

  @Effect()
  claimEarnings$: Observable<fromActions.ClaimEarningsSuccess | fromActions.ClaimEarningsFail> = this.actions$
    .pipe(
      ofType(fromActions.CLAIM_EARNINGS),
      exhaustMap(() => {
        return this.affiliatesService.getClaimEarnings().pipe(
          map((res) => {
            if (res['data']) {
              return new fromActions.ClaimEarningsSuccess(res['data']);
            }
            return new fromActions.ClaimEarningsFail(res);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
              this.toast.error(error && error.message ? error.message : response);
           });
            return of(new fromActions.ClaimEarningsFail(res));
          })
        );
      })
    );

  @Effect()
  createReferralCode$: Observable<fromAuth.UpdateReferralCode | fromActions.CreateReferralCodeFail> = this.actions$
    .pipe(
      ofType(fromActions.CREATE_REFERRAL_CODE),
      exhaustMap((action) => {
        return this.affiliatesService.createReferralCode(action['payload']).pipe(
          map((res) => {
            this.translate.get('AFFILIATES.REF_CODE_UPDATE_SUCCESS').subscribe((response: string) => {
              this.toast.success(response);
            });
            return new fromAuth.UpdateReferralCode(action['payload']);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
              this.toast.error(error && error.message ? error.message : response);
            });
            return of(new fromActions.CreateReferralCodeFail(res));
          })
        );
      })
    );

  @Effect()
  sendInvite$: Observable<fromActions.SendInviteSuccess | fromActions.SendInviteFail> = this.actions$
    .pipe(
      ofType(fromActions.SEND_INVITE),
      exhaustMap((action) => {
        return this.affiliatesService.sendInvite(action['payload']).pipe(
          map((res) => {
            this.translate.get('SEND_INVITATION').subscribe((response: string) => {
              this.toast.success(response);
            });
            return new fromActions.SendInviteSuccess(action['payload']);
          }),
          catchError((res: Error) => {
            const error = res['error'];
            this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
              this.toast.error(error && error.message ? error.message : response);
            });
            return of(new fromActions.SendInviteFail(res));
          })
        );
      })
    );
}
