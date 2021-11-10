import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable, EMPTY } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import { BattleService } from 'src/app/battle/services/battle.service';
import { ToastrService } from 'ngx-toastr';

import * as fromActions from './battle.action';
import * as fromRoot from 'src/app/@store';
import * as fromRouter from 'src/app/@store/router';
import { TranslateService } from '@ngx-translate/core';

import { BattleModel } from 'src/app/battle/models';
import { Router } from '@angular/router';

@Injectable()
export class BattleEffects {
  constructor(
    private actions$: Actions,
    private battleService: BattleService,
    private toast: ToastrService,
    private translate: TranslateService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) { }

  @Effect()
  loadBattles$: Observable<
    fromActions.LoadBattlesSuccess | fromActions.LoadBattlesFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_BATTLES),
    exhaustMap((action) => {
      const { type, pagination } = action['payload'];

      return this.battleService.getBattles(type, pagination).pipe(
        map((res: BattleModel[]) => {
          return new fromActions.LoadBattlesSuccess(res['data']);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
            this.toast.error(error && error.message ? error.message : response);
          });
          return of(new fromActions.LoadBattlesFail(res));
        })
      );
    })
  );

  @Effect()
  loadBattle$: Observable<
    fromActions.LoadBattleSuccess | fromActions.LoadBattleFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_BATTLE),
    exhaustMap((action) => {
      return this.battleService.getBattle(action['payload']).pipe(
        map((res: BattleModel) => {
          return new fromActions.LoadBattleSuccess(res['data']);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
            this.toast.error(error && error.message ? error.message : response);
            return this.router.navigate(['/404']);
          });
          return of(new fromActions.LoadBattleFail(res));
        })
      );
    })
  );

  @Effect()
  joinBattle$: Observable<
    fromActions.JoinBattleSuccess | fromActions.JoinBattleFail
  > = this.actions$.pipe(
    ofType(fromActions.JOIN_BATTLE),
    exhaustMap((action) => {
      const { id, seed } = action['payload'];
      return this.battleService.joinBattle(id, seed).pipe(
        map((_) => {
          return new fromActions.JoinBattleSuccess();
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
            this.toast.error(error && error.message ? error.message : response);
          });
          return of(new fromActions.JoinBattleFail(res));
        })
      );
    })
  );

  @Effect()
  cancelBattle$: Observable<
    fromActions.CancelBattleSuccess | fromActions.CancelBattleFail
  > = this.actions$.pipe(
    ofType(fromActions.CANCEL_BATTLE),
    exhaustMap((action) => {
      return this.battleService.cancelBattle(action['payload']).pipe(
        map((res) => new fromActions.CancelBattleSuccess(action['payload'])),
        catchError((res: Error) => {
          const error = res['error'];
          this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
            this.toast.error(error && error.message ? error.message : response);
          });
          return of(new fromActions.CancelBattleFail(res));
        })
      );
    })
  );

  @Effect()
  quitBattle$: Observable<
    fromActions.QuitBattleSuccess | fromActions.QuitBattleFail
  > = this.actions$.pipe(
    ofType(fromActions.QUIT_BATTLE),
    exhaustMap((action) => {
      const { id, seed } = action['payload'];
      return this.battleService.quitBattle(id, seed).pipe(
        map((res) => {
          return new fromActions.QuitBattleSuccess(res);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
            this.toast.error(error && error.message ? error.message : response);
          });
          return of(new fromActions.QuitBattleFail(res));
        })
      );
    })
  );

  @Effect()
  startBattleNow$: Observable<
    fromActions.StartBattleNowSuccess | fromActions.StartBattleNowFail
  > = this.actions$.pipe(
    ofType(fromActions.START_BATTLE_NOW),
    exhaustMap((action) => {
      return this.battleService.startBattle(action['payload']).pipe(
        map((res) => {
          return new fromActions.StartBattleNowSuccess();
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
            this.toast.error(error && error.message ? error.message : response);
          });
          return of(new fromActions.StartBattleNowFail(res));
        })
      );
    })
  );

  @Effect()
  loadBoxes$: Observable<
    fromActions.LoadBattleSuccess | fromActions.LoadBattleFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_BOXES),
    exhaustMap((action) => {
      const { caseType, pagination, filters, name } = action['payload'];

      return this.battleService.getBoxes(caseType, pagination, filters, name).pipe(
        map((res) => {
          return new fromActions.LoadBoxesSuccess(res['data']['data']);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          if (error && error.name === 'SyntaxError') {
            this.toast.error('You can’t use that charactor for a search');
          } else {
            this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
              this.toast.error(error && error.message ? error.message : response);
            });
          }
          return of(new fromActions.LoadBoxesFail(res));
        })
      );
    })
  );

  @Effect()
  createBattle$: Observable<
    fromActions.CreateBattleSuccess | fromActions.CreateBattleFail
  > = this.actions$.pipe(
    ofType(fromActions.CREATE_BATTLE),
    exhaustMap((action) => {
      return this.battleService.createBattle(action['payload']).pipe(
        map((res) => {
          this.store.dispatch(new fromActions.CreateBattleSuccess(res['data']));
          return new fromRouter.Go({ path: ['battle/pending', res['data']._id] });
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.translate.get('UNDEFINED_ERROR').subscribe((response: string) => {
            this.toast.error(error && error.message ? error.message : response);
          });
          return of(new fromActions.CreateBattleFail(res));
        })
      );
    })
  );
}
