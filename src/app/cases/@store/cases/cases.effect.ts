import { CasesService } from '../../services/cases.service';
import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, exhaustMap, debounceTime } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import * as fromRoot from 'src/app/@store';
import * as fromAuth from 'src/app/auth/@store';
import * as fromActions from './cases.action';
import * as fromProvablyFair from 'src/app/@store/provably-fair';
import * as fromRouter from 'src/app/@store/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CasesEffects {
  constructor(
    private actions$: Actions,
    private casesService: CasesService,
    private toast: ToastrService,
    private translate: TranslateService,
    private store: Store<fromRoot.State>
  ) {}

  @Effect()
  loadCases$: Observable<
    fromActions.LoadCasesSuccess | fromActions.LoadCasesFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_CASES),
    exhaustMap(action => {
      const { caseType, pagination, filters, name } = action['payload'];

      return this.casesService
        .getCases(caseType, pagination, filters, name)
        .pipe(
          map(res => {
            return new fromActions.LoadCasesSuccess({
              caseType,
              cases: res['data'] ? res['data']['data'] : [],
              total: res['data'] ? res['data']['total'] : 0,
            });
          }),
          catchError((res: Error) => {
            const error = res['error'];
            if (error && error.name === 'SyntaxError') {
              this.toast.error('You can’t use that charactor for a search');
            } else {
              this.translate
                .get('UNDEFINED_ERROR')
                .subscribe((response: string) => {
                  this.toast.error(
                    error && error.message ? error.message : response
                  );
                });
            }
            return of(new fromActions.LoadCasesFail(res));
          })
        );
    })
  );

  @Effect()
  loadCase$: Observable<
    fromActions.LoadCaseSuccess | fromActions.LoadCaseFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_CASE),
    exhaustMap(action => {
      return this.casesService.getCase(action['payload']).pipe(
        map(res => {
          return new fromActions.LoadCaseSuccess({ case: res['data'] });
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
          return of(new fromActions.LoadCaseFail(res));
        })
      );
    })
  );

  @Effect()
  loadSpinnerItems$: Observable<
    fromActions.LoadSpinnerItemsSuccess | fromActions.LoadSpinnerItemsFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_SPINNER_ITEMS),
    exhaustMap(action => {
      return this.casesService.getSpinnerItems(action['payload']).pipe(
        map(res => {
          return new fromActions.LoadSpinnerItemsSuccess(res['data']);
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
          return of(new fromActions.LoadSpinnerItemsFail(res));
        })
      );
    })
  );

  @Effect()
  loadMyCases$: Observable<
    fromActions.LoadMyCasesSuccess | fromActions.LoadMyCasesFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_MY_CASES),
    exhaustMap(action => {
      const { pagination } = action['payload'];
      return this.casesService.getMyCases(pagination).pipe(
        map(res => {
          return new fromActions.LoadMyCasesSuccess(res['data']);
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
          return of(new fromActions.LoadMyCasesFail(res));
        })
      );
    })
  );

  @Effect()
  editCase$: Observable<
    fromActions.EditCaseSuccess | fromActions.EditCaseFail
  > = this.actions$.pipe(
    ofType(fromActions.EDIT_CASE),
    exhaustMap(action => {
      const { id, editedCase } = action['payload'];
      return this.casesService.updateCase(id, editedCase).pipe(
        map(res => {
          this.translate
            .get('CASE_EDIT_SUCCESS')
            .subscribe((response: string) => {
              this.toast.success(response);
            });
          return new fromActions.EditCaseSuccess(res['data']);
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
          return of(new fromActions.EditCaseFail(res));
        })
      );
    })
  );

  @Effect()
  addCaseCategory$: Observable<
    fromActions.AddCaseCategorySuccess | fromActions.AddCaseCategoryFail
  > = this.actions$.pipe(
    ofType(fromActions.ADD_CASE_CATEGORY),
    exhaustMap(action => {
      const { caseId, category } = action['payload'];
      return this.casesService.addCaseCategory(caseId, category).pipe(
        map(_ => {
          this.translate
            .get('CAT_EDIT_SUCCESS')
            .subscribe((response: string) => {
              this.toast.success(response);
            });
          return new fromActions.AddCaseCategorySuccess();
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
          return of(new fromActions.AddCaseCategoryFail(res));
        })
      );
    })
  );

  @Effect()
  removeCaseCategory$: Observable<
    fromActions.RemoveCaseCategorySuccess | fromActions.RemoveCaseCategoryFail
  > = this.actions$.pipe(
    ofType(fromActions.REMOVE_CASE_CATEGORY),
    exhaustMap(action => {
      const { caseId, category } = action['payload'];
      return this.casesService.removeCaseCategory(caseId, category).pipe(
        map(_ => {
          this.translate
            .get('CAT_EDIT_SUCCESS')
            .subscribe((response: string) => {
              this.toast.success(response);
            });
          return new fromActions.RemoveCaseCategorySuccess();
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
          return of(new fromActions.RemoveCaseCategoryFail(res));
        })
      );
    })
  );

  @Effect()
  unboxCase$: Observable<
    fromActions.UnboxCaseSuccess | fromActions.UnboxCaseFail
  > = this.actions$.pipe(
    ofType(fromActions.UNBOX_CASE),
    exhaustMap(action => {
      const { slug, ...payload } = action['payload'] as any;

      return this.casesService.unboxCase(payload).pipe(
        map(res => {
          const dice = res['data'].dice;
          this.store.dispatch(new fromProvablyFair.SetId(res['data']._id));
          this.store.dispatch(
            new fromProvablyFair.SetHashedServerSeed([
              {
                id: dice._id,
                seed: dice.seedHash
              }
            ])
          );

          return new fromActions.UnboxCaseSuccess({
            case: payload.caseId,
            slug,
            ...res['data']
          });
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
          return of(new fromActions.UnboxCaseFail(res));
        })
      );
    })
  );

  @Effect()
  getCasePrice$: Observable<
    fromActions.GetCasePriceSuccess | fromActions.GetCasePriceFail
  > = this.actions$.pipe(
    ofType(fromActions.GET_CASE_PRICE),
    debounceTime(500),
    exhaustMap(action => {
      this.store.dispatch(new fromActions.OddTableLoading(true));
      return this.casesService.getCasePrice(action['payload']).pipe(
        map(res => {
          return new fromActions.GetCasePriceSuccess(res['data']);
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
          return of(new fromActions.GetCasePriceFail(res));
        })
      );
    })
  );

  @Effect()
  createCase$: Observable<
    fromRouter.Go | fromActions.CrateCaseFail
  > = this.actions$.pipe(
    ofType(fromActions.CREATE_CASE),
    exhaustMap(action => {
      return this.casesService.createCase(action['payload']).pipe(
        map(_ => {
          this.toast.success('Case successfully created');
          return new fromRouter.Go({ path: ['mysterybox/my'] });
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
          return of(new fromActions.CrateCaseFail(res));
        })
      );
    })
  );

  @Effect()
  loadCaseLogos$: Observable<
    fromActions.LoadCaseLogosSuccess | fromActions.LoadCaseLogosFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_CASE_LOGOS),
    exhaustMap(() => {
      return this.casesService.getCaseLogos().pipe(
        map(res => {
          return new fromActions.LoadCaseLogosSuccess(res['data']);
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
          return of(new fromActions.LoadCaseLogosFail(res));
        })
      );
    })
  );

  @Effect()
  loadSiteItems$: Observable<
    fromActions.LoadSiteItemsSuccess | fromActions.LoadSiteItemsFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_SITE_ITEMS),
    exhaustMap(action => {
      const { pagination, filters, search, tag } = action['payload'];
      return this.casesService
        .getSiteItems(pagination, filters, search, tag)
        .pipe(
          map(res => {
            return new fromActions.LoadSiteItemsSuccess(res['data']['data']);
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
            return of(new fromActions.LoadSiteItemsFail(res));
          })
        );
    })
  );

  @Effect()
  sellItems$: Observable<
    fromActions.SellItemsSuccess | fromActions.SellItemsFail
  > = this.actions$.pipe(
    ofType(fromActions.SELL_ITEMS),
    exhaustMap(action => {
      return this.casesService.sellItems(action['payload']).pipe(
        map(_ => {
          return new fromActions.SellItemsSuccess();
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
          return of(new fromActions.SellItemsFail(res));
        })
      );
    })
  );

  @Effect()
  deleteCase$: Observable<
    fromActions.DeleteCaseSuccess | fromActions.DeleteCaseFail
  > = this.actions$.pipe(
    ofType(fromActions.DELETE_CASE),
    exhaustMap(action => {
      return this.casesService.deleteCase(action['payload']).pipe(
        map(_ => {
          this.toast.success('Case successfully removed');
          return new fromActions.DeleteCaseSuccess(action['payload']);
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
          return of(new fromActions.DeleteCaseFail(res));
        })
      );
    })
  );

  @Effect()
  claimCaseEarnings$: Observable<
    fromActions.ClaimEarningsSuccess | fromActions.ClaimEarningsFail
  > = this.actions$.pipe(
    ofType(fromActions.CLAIM_EARNINGS),
    exhaustMap(() => {
      return this.casesService.claimCaseEarnings().pipe(
        map(res => {
          this.store.dispatch(new fromAuth.UpdateUserInfo());
          return new fromActions.ClaimEarningsSuccess(res['data']);
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
          return of(new fromActions.ClaimEarningsFail(res));
        })
      );
    })
  );

  @Effect()
  getItemDetails$: Observable<
    fromActions.GetItemDetailsSuccess | fromActions.GetItemDetailsFail
  > = this.actions$.pipe(
    ofType(fromActions.GET_ITEM_DETAILS),
    exhaustMap(action => {
      return this.casesService.getItemDetails(action['payload']).pipe(
        map(res => {
          return new fromActions.GetItemDetailsSuccess(res['data']);
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
          return of(new fromActions.GetItemDetailsFail(res));
        })
      );
    })
  );
}
