import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { pickBy, identity } from 'lodash';

import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, from, Observable, timer, EMPTY } from 'rxjs';
import {
  catchError,
  map,
  exhaustMap,
  debounceTime,
  tap,
  switchMap
} from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/core/socket/services/socket.service';

import * as fromActions from './auth.action';
import * as fromRoot from 'src/app/@store';
import * as fromRouter from 'src/app/@store/router/router.action';

import { User } from 'src/app/auth/models/user-profile';
import { LoginContext, LoginProvider } from 'src/app/auth/models/login-context';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private socketService: SocketService,
    private toast: ToastrService,
    private router: Router,
    private translate: TranslateService,
    private store: Store<fromRoot.State>,
    private _ngxZendeskWebwidgetService: NgxZendeskWebwidgetService,
    public datepipe: DatePipe
  ) { }

  @Effect()
  login$: Observable<
    fromActions.LoginSuccess | fromActions.LoginFail
  > = this.actions$.pipe(
    ofType(
      fromActions.LOGIN,
      fromActions.GOOGLE_SIGN_IN_SUCCESS,
      fromActions.STEAM_AUTH,
      fromActions.OPSKINS_AUTH
    ),
    exhaustMap(action => {
      const { loginContext, provider, remember } = action['payload'] as any;
      const referralCode = localStorage.getItem('refCode');
      window.refreshSessionId();
      window.getSession();
      const d = localStorage.getItem('session');
      let loginCount = 1;

      return this.authService.login(loginContext, provider, referralCode, d).pipe(
        map(res => {
          let user: User;
          let token: string;
          let isNewGoogleUser: boolean;
          let refreshToken: string;

          switch (provider) {
            case 'local':
            case 'google':
              user = res['data'].user;
              token = res['data'].token;
              isNewGoogleUser = res['data'].new;
              refreshToken = res['data'].refreshToken;
              break;

            case 'steam':
            case 'opskins': {
              user = res['data'];
              const { loginContext } = action['payload'] as any;
              token = loginContext.token;
              refreshToken = loginContext.refreshToken;
              break;
            }

            default:
              user = res['data'].user;
              token = res['data'].token;
              isNewGoogleUser = false;
              refreshToken = res['data'].refreshToken;
          }

          if (isNewGoogleUser) {
            const boxId = localStorage.getItem('boxId');

            if (boxId) {
              const boxName = localStorage.getItem('boxName');

              window.analytics.identify(user._id,
                {
                  email: user.email,
                  username: user.username,
                  name: user.username,
                  SignupMethod: 'Google ID',
                  SignupDate: this.datepipe.transform(user.createdAt, 'MMM d, y, h:mm:ss a')
                }
              );

              window.analytics.track('Registration', {
                SignupMethod: 'Google ID',
                SignupDate: this.datepipe.transform(user.createdAt, 'MMM d, y, h:mm:ss a'),
                BoxIDLedToSignup: boxId,
                BoxNameLedToSignup: boxName,
              });

              localStorage.removeItem('boxId');
              localStorage.removeItem('boxName');
            }
          } else {
            window.analytics.identify(user._id, pickBy(
              {
                email: user.email,
                username: user.username,
                name: user.username,
                phone: user.shippingAddress? user.shippingAddress.phoneNumber : '',
                LoginMethod: provider,
                LoginCount: user.loggedCount,
                TotalDepositAmount: user.depositedValue,
                ReferralsCount: user.referredUserCount,
                FreeBoxCode: user.referredCode,
              },
              identity,
            ));
            window.analytics.track('Login', pickBy(
              {
                email: user.email,
                userName: user.username,
                name: user.username,
                LoginMethod: provider,
                LoginCount: user.loggedCount,
                TotalDepositAmount: user.depositedValue,
                ReferralsCount: user.referredUserCount,
                FreeBoxCode: user.referredCode,
              },
              identity,
            ));
          }

          this.authService.setUser(user);
          this.authService.setToken(token);
          this.authService.setRefreshToken(refreshToken);
          this.socketService.emit('users.login', { accessToken: token });

          const refCode = localStorage.getItem('refCode');
          const loginToRoute = localStorage.getItem('loginToRoute');
          localStorage.removeItem('loginToRoute');

          if (loginToRoute) {
            this.store.dispatch(new fromRouter.Go({ path: [loginToRoute] }));
          }

          loginCount += loginCount;
          return new fromActions.LoginSuccess({ user, token });
        }),
        catchError(res => {
          const error = res['error'];
          this.translate
            .get('UNDEFINED_ERROR')
            .subscribe((response: string) => {
              this.toast.error(
                error && error.message ? error.message : response
              );
            });
          return of(new fromActions.LoginFail(res));
        })
      );
    })
  );

  @Effect()
  forgotPassword$: Observable<
    fromActions.ForgotPasswordSuccess | fromActions.ForgotPasswordFail
  > = this.actions$.pipe(
    ofType(fromActions.FORGOT),
    exhaustMap(action => {
      const { context } = action['payload'] as any;
      return this.authService.forgotPassword(context).pipe(
        map(res => {
          this.translate.get('SENT_EMAIL').subscribe((response: string) => {
            this.toast.success(response);
          });
          return new fromActions.ForgotPasswordSuccess(true);
        }),
        catchError(res => {
          const error = res['error'];
          this.translate
            .get('UNDEFINED_ERROR')
            .subscribe((response: string) => {
              this.toast.error(
                error && error.message ? error.message : response
              );
            });
          return of(new fromActions.ForgotPasswordFail(res));
        })
      );
    })
  );

  @Effect()
  verifyEmail$: Observable<
    fromActions.VerifyEmailSuccess | fromActions.VerifyEmailFail
  > = this.actions$.pipe(
    ofType(fromActions.VERIFY_EMAIL),
    exhaustMap(action => {
      return this.authService.verifyEmail(action['payload']).pipe(
        map(res => {
          this.router.navigate(['/']);
          return new fromActions.VerifyEmailSuccess(true);
        }),
        catchError(res => {
          const error = res['error'];
          this.translate
            .get('UNDEFINED_ERROR')
            .subscribe((response: string) => {
              this.toast.error(
                error && error.message ? error.message : response
              );
            });

          this.router.navigate(['/']);
          return of(new fromActions.VerifyEmailFail(res));
        })
      );
    })
  );

  @Effect()
  resetPassword$: Observable<
    fromActions.Login | fromActions.ResetPasswordFail
  > = this.actions$.pipe(
    ofType(fromActions.RESET),
    exhaustMap(action => {
      const { context } = action['payload'] as any;

      return this.authService.resetPassword(context).pipe(
        map(res => {
          this.router.navigate(['/mysterybox']);

          return new fromActions.Login({
            loginContext: {
              email: context.email,
              password: context.newPassword
            },
            provider: 'local'
          });
        }),
        catchError(res => {
          const error = res['error'];
          this.translate
            .get('UNDEFINED_ERROR')
            .subscribe((response: string) => {
              this.toast.error(
                error && error.message ? error.message : response
              );
            });
          return of(new fromActions.ResetPasswordFail(res));
        })
      );
    })
  );

  @Effect()
  googleSignIn$: Observable<
    fromActions.GoogleSignInSuccess
  > = this.actions$.pipe(
    ofType<fromActions.GoogleSignIn>(fromActions.GOOGLE_SIGN_IN),
    switchMap(() => {
      return from(this.authService.googleSignIn());
    }),
    map(userData => {
      const loginContext: LoginContext = { idToken: userData.idToken };
      const provider: LoginProvider = 'google';

      return new fromActions.GoogleSignInSuccess({ loginContext, provider });
    })
  );

  @Effect()
  signUp$: Observable<
    fromActions.SignUpSuccess | fromActions.SignUpFail
  > = this.actions$.pipe(
    ofType(fromActions.SIGN_UP),
    exhaustMap(action => {
      const referralCode = localStorage.getItem('refCode');
      window.refreshSessionId();
      window.getSession();
      const d = localStorage.getItem('session');
      const { user } = action['payload'];

      return this.authService.signUp(user, referralCode, d).pipe(
        map(res => {
          this.authService.setUser(res['data'].user);
          this.authService.setToken(res['data'].token);
          this.authService.setRefreshToken(res['data'].refreshToken);
          this.socketService.emit('users.login', {
            accessToken: res['data'].token
          });

          const boxId = localStorage.getItem('boxId');
          let segPayload: any = {
            username: res['data'].user.username,
            email: res['data'].user.email,
            SignupMethod: 'E-mail',
            SignupDate: this.datepipe.transform(
              res['data'].user.createdAt, 'MMM d, y, h:mm:ss a'
            ),
          };
          if (boxId) {
            const boxName = localStorage.getItem('boxName');
            segPayload.BoxIDLedToSignup = boxId;
            segPayload.BoxNameLedToSignup = boxName;
          }

          window.analytics.identify(res['data'].user._id,
            pickBy(
              {
                email: res['data'].user.email,
                username: res['data'].user.username,
                name: res['data'].user.username,
                phone: res['data'].user.shippingAddress? res['data'].user.shippingAddress.phoneNumber : '',
                SignupMethod: 'E-mail',
                SignupDate: this.datepipe.transform(
                  res['data'].user.createdAt, 'MMM d, y, h:mm:ss a'
                ),
                TotalDepositAmount: res['data'].user.depositedValue,
                ReferralsCount: res['data'].user.referredUserCount,
              },
              identity,
            )
          );
          window.analytics.track('Registration', segPayload);


          localStorage.removeItem('boxId');
          localStorage.removeItem('boxName');

          this.translate
            .get('REGISTERED_SUCCESSFULLY')
            .subscribe((response: string) => {
              this.toast.success(response);
            });

          const refCode = localStorage.getItem('refCode');
          if (refCode) {
            this.store.dispatch(new fromRouter.Go({ path: [`/r/${refCode}`] }));
          }

          return new fromActions.SignUpSuccess(res['data']);
        }),

        catchError(res => {
          const error = res['error'];
          this.translate
            .get('UNDEFINED_ERROR')
            .subscribe((response: string) => {
              this.toast.error(
                error && error.message ? error.message : response
              );
            });
          return of(new fromActions.SignUpFail(res));
        })
      );
    })
  );

  @Effect()
  authCheck$: Observable<
    fromActions.AuthCheckSuccess | fromActions.AuthCheckFail
  > = this.actions$.pipe(
    ofType<fromActions.AuthCheck>(fromActions.AUTH_CHECK),
    debounceTime(10),
    exhaustMap(action => {
      const token = this.authService.getToken();
      const user = this.authService.getUser();
      if (!token || !user) {
        this.socketService.emit('users.logout', null);
        return of(new fromActions.AuthCheckFail('No token'));
      }
      return of(new fromActions.AuthCheckSuccess({ user, token }));
    })
  );

  @Effect({ dispatch: false })
  logout$: Observable<fromActions.AuthAction> = this.actions$.pipe(
    ofType(fromActions.LOGOUT),
    tap(() => {
      this.authService.removeAuth();
      this.socketService.emit('users.logout', null);
      try {
        this._ngxZendeskWebwidgetService.zE('webWidget', 'reset');
      } catch (e) {}
      this.router.navigate(['/']);
    })
  );

  @Effect()
  updateUserInfo$: Observable<
    fromActions.UpdateUserInfoSuccess | fromActions.UpdateUserInfoFail
  > = this.actions$.pipe(
    ofType(fromActions.UPDATE_USER_INFO),
    exhaustMap(() => {
      return this.authService.updateUserInfo().pipe(
        map(res => {
          if (res['data']) {
            this.authService.setUser(res['data']);
            return new fromActions.UpdateUserInfoSuccess(res['data']);
          }
          return new fromActions.UpdateUserInfoFail(res);
        }),
        catchError((res: Error) => {
          return of(new fromActions.UpdateUserInfoFail(res));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  updateReferralCode$ = this.actions$.pipe(
    ofType(fromActions.UPDATE_REFERRAL_CODE),
    tap(action => {
      const user = this.authService.getUser();
      user.referralCode = action['payload'];
      return this.authService.setUser(user);
    })
  );

  @Effect()
  acceptTerms$: Observable<
    fromActions.UpdateUserInfoSuccess | fromActions.ApproveTosFail
  > = this.actions$.pipe(
    ofType(fromActions.APPROVE_TOS),
    exhaustMap(action => {
      return this.authService.approvedTos(action['payload']).pipe(
        map(res => {
          if (res['data']) {
            this.authService.setUser(res['data']);
            return new fromActions.UpdateUserInfoSuccess(res['data']);
          }
          return new fromActions.ApproveTosFail(res);
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
          return of(new fromActions.ApproveTosFail(res));
        })
      );
    })
  );

  @Effect()
  applyReferralCode$: Observable<
    fromActions.ApplyReferralCodeSuccess | fromActions.ApplyReferralCodeFail
  > = this.actions$.pipe(
    ofType(fromActions.APPLY_REFERRAL_CODE),
    exhaustMap(action => {
      return this.authService.applyReferralCode(action['payload']).pipe(
        map(res => {
          if (res['data'].freeboxSlug) {
            this.router.navigate([
              '/mysterybox/unbox',
              res['data'].freeboxSlug
            ]);
            return new fromActions.ApplyReferralCodeSuccess({
              code: action['payload'],
              codeType: res['data']['codeType'],
            });
          }
          return new fromActions.ApplyReferralCodeFail(res);
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
          return of(new fromActions.ApplyReferralCodeFail(res));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  updateBalance$ = this.actions$.pipe(
    ofType(fromActions.UPDATE_USER_BALANCE),
    tap(action => {
      const user = this.authService.getUser();
      if (user) {
        const { balance, deposited, type } = action['payload'];
        user.balance = balance !== undefined ? balance : user.balance;
        user.depositedValue =
          type === 'DEPOSIT' ? deposited : user.depositedValue;
        return this.authService.setUser(user);
      }
    })
  );

  @Effect({ dispatch: false })
  updateUnboxedCases$ = this.actions$.pipe(
    ofType(fromActions.UPDATE_USER_UNBOXED_CASES),
    tap(action => {
      const user = this.authService.getUser();
      const { unboxedCases } = action['payload'];
      user.unboxedCases =
        unboxedCases !== undefined ? unboxedCases : user.unboxedCases;
      return this.authService.setUser(user);
    })
  );

  @Effect()
  updateShippingAddress$: Observable<
    | fromActions.UpdateShippingAddressSuccess
    | fromActions.UpdateShippingAddressFail
  > = this.actions$.pipe(
    ofType(fromActions.UPDATE_SHIPPING_ADDRESS),
    exhaustMap(action => {
      const { postalCode } = action['payload'] as any;

      const payload = {
        ...action['payload'] as any,
        postalCode: postalCode && postalCode.toString()
      };

      return this.authService.updateShippingAddress(payload).pipe(
        map(res => {
          this.translate
            .get('UPDATED_SUCCESSFULLY')
            .subscribe((response: string) => {
              this.toast.success(response);
            });

          const user = this.authService.getUser();

          window.analytics.identify(user._id, {
            phone: payload.phoneNumber,
            Street: payload.address,
            City: payload.city,
            State: payload.province,
            Country: payload.country,
            PostCode: payload.postalCode,
          });

          window.analytics.track('Shipping Info Updated', {
            firstName: payload.firstName,
            lastName: payload.lastName,
            phone: payload.phoneNumber,
            Street: payload.address,
            City: payload.city,
            State: payload.province,
            Country: payload.country,
            PostCode: payload.postalCode,
          });

          user.shippingAddress = action['payload'];

          this.authService.setUser(user);
          return new fromActions.UpdateShippingAddressSuccess(user);
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
          return of(new fromActions.UpdateShippingAddressFail(res));
        })
      );
    })
  );

  @Effect()
  updateTradeUrl$: Observable<
    fromActions.UpdateTradeUrlSuccess | fromActions.UpdateTradeUrlFail
  > = this.actions$.pipe(
    ofType(fromActions.UPDATE_TRADE_URL),
    exhaustMap(action => {
      return this.authService.updateTradeUrl(action['payload']).pipe(
        map(res => {
          this.translate
            .get('UPDATED_SUCCESSFULLY')
            .subscribe((response: string) => {
              this.toast.success(response);
            });
          const user = this.authService.getUser();
          user.tradeUrl = action['payload'];
          this.authService.setUser(user);
          return new fromActions.UpdateTradeUrlSuccess(user);
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
          return of(new fromActions.UpdateTradeUrlFail(res));
        })
      );
    })
  );

  @Effect()
  updateUserAvatar$: Observable<
    fromActions.UpdateUserAvatarSuccess | fromActions.UpdateUserAvatarFail
  > = this.actions$.pipe(
    ofType(fromActions.UPDATE_USER_AVATAR),
    exhaustMap(action => {
      return this.authService.updateUserAvatar(action['payload']).pipe(
        map(res => {
          this.toast.success('Updated successfully');
          const user = res['data'];

          this.authService.setUser(user);
          return new fromActions.UpdateUserAvatarSuccess(user);
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
          return of(new fromActions.UpdateUserAvatarFail(res));
        })
      );
    })
  );

  @Effect()
  getShippingCountries$: Observable<
    | fromActions.GetShippingCountriesSuccess
    | fromActions.GetShippingCountriesFail
  > = this.actions$.pipe(
    ofType(fromActions.GET_SHIPPING_COUNTRIES),
    exhaustMap(() => {
      return this.authService.getShippingCountries().pipe(
        map(res => {
          return new fromActions.GetShippingCountriesSuccess(res['data']);
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
          return of(new fromActions.GetShippingCountriesFail(res));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  muteUser$ = this.actions$.pipe(
    ofType(fromActions.MUTE_USER),
    tap(action => {
      const user = this.authService.getUser();
      user.chatMuteInfo = action['payload'];
      return this.authService.setUser(user);
    })
  );

  @Effect({ dispatch: false })
  unmuteUser$ = this.actions$.pipe(
    ofType(fromActions.UNMUTE_USER),
    tap(_ => {
      const user = this.authService.getUser();
      delete user.chatMuteInfo;

      return this.authService.setUser(user);
    })
  );

  @Effect({ dispatch: false })
  caseOpened$ = this.actions$.pipe(
    ofType(fromActions.CASE_OPENED),
    tap(action => {
      const user = this.authService.getUser();
      if (!user) {
        return EMPTY;
      }

      user.caseEarnings = action['payload'];
      return this.authService.setUser(user);
    })
  );
}
