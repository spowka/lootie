import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/@store';
import * as fromLeaderBoard from './leader-board.reducer';
import * as fromLeaderBoardReducer from '../reducer';
import { LeaderBoardModel } from 'src/app/shared/models';

export const getLeaderBoardState: MemoizedSelector<fromRoot.State, fromLeaderBoard.LeaderBoardState> = createSelector(
  fromLeaderBoardReducer.getLeaderBoardFeatureState,
  (state: fromLeaderBoardReducer.LeaderBoardFeatureState) => state.leaderBoard
);

export const selectLeaderBoardMonthlyTopDrop: MemoizedSelector<fromRoot.State, LeaderBoardModel> = createSelector(
  getLeaderBoardState,
  fromLeaderBoard.getLeaderBoardMonthlyTopDrop
);

export const selectLeaderBoardTopDropHistory: MemoizedSelector<fromRoot.State, LeaderBoardModel> = createSelector(
  getLeaderBoardState,
  fromLeaderBoard.getLeaderBoardTopDropHistory
);

export const selectLoading: MemoizedSelector<fromRoot.State, any> = createSelector(
  getLeaderBoardState,
  fromLeaderBoard.getLoading
);
