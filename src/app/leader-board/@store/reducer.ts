import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';

import * as leaderBoardReducer from './leader-board/leader-board.reducer';

export interface LeaderBoardFeatureState {
  leaderBoard: leaderBoardReducer.LeaderBoardState;
}

export const reducers: ActionReducerMap<LeaderBoardFeatureState> = {
  leaderBoard: leaderBoardReducer.leaderBoardReducer
};

export const getLeaderBoardFeatureState: any = createFeatureSelector('leaderBoard');
