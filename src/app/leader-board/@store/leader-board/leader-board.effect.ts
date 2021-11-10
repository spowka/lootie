import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import * as fromActions from './leader-board.action';
import { LeaderBoardService } from 'src/app/leader-board/services/leader-board.service';

@Injectable()
export class LeaderBoardEffects {
  constructor(
    private actions$: Actions,
    private leaderBoardService: LeaderBoardService,
    private toast: ToastrService
  ) {}

  @Effect()
  loadLeaderBoardMonthlyTopDrop$: Observable<
    fromActions.LoadLeaderBoardMonthlyTopDropSuccess | fromActions.LoadLeaderBoardMonthlyTopDropFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_LEADER_BOARD_MONTHLY_TOP_DROP),
    exhaustMap((action) => {
      const { pagination } = action['payload'];

      return this.leaderBoardService.getMonthlyTopDrop(pagination).pipe(
        map((res) => {
          return new fromActions.LoadLeaderBoardMonthlyTopDropSuccess(res['data']);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.message ? error.message : 'Something went wrong');
          return of(new fromActions.LoadLeaderBoardMonthlyTopDropFail(res));
        })
      );
    })
  );

  @Effect()
  loadLeaderBoardTopDropHistory$: Observable<
    fromActions.LoadLeaderBoardTopDropHistorySuccess | fromActions.LoadLeaderBoardTopDropHistoryFail
  > = this.actions$.pipe(
    ofType(fromActions.LOAD_LEADER_BOARD_TOP_DROP_HISTORY),
    exhaustMap((action) => {
      const { pagination } = action['payload'];

      return this.leaderBoardService.getTopDropHistory(pagination).pipe(
        map((res) => {
          return new fromActions.LoadLeaderBoardTopDropHistorySuccess(res['data'][0]);
        }),
        catchError((res: Error) => {
          const error = res['error'];
          this.toast.error(error && error.message ? error.message : 'Something went wrong');
          return of(new fromActions.LoadLeaderBoardTopDropHistoryFail(res));
        })
      );
    })
  );
}
