import * as fromLeaderBoardActions from './leader-board.action';
import { LeaderBoardModel } from 'src/app/shared/models';

export class LeaderBoardState {
  leaderBoardMonthlyTopDrop: LeaderBoardModel;
  leaderBoardTopDropHistory: LeaderBoardModel;
  loading: boolean;
  error: string;
}

const initialState: LeaderBoardState = {
  leaderBoardMonthlyTopDrop: null,
  leaderBoardTopDropHistory: null,
  loading: false,
  error: '',
};

export function leaderBoardReducer(
  state: LeaderBoardState = initialState,
  action: fromLeaderBoardActions.LeaderBoardActions
): LeaderBoardState {
  switch (action.type) {
    case fromLeaderBoardActions.LOAD_LEADER_BOARD_MONTHLY_TOP_DROP: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromLeaderBoardActions.LOAD_LEADER_BOARD_MONTHLY_TOP_DROP_SUCCESS: {
      return {
        ...state,
        leaderBoardMonthlyTopDrop: action['payload'],
        loading: false,
      };
    }

    case fromLeaderBoardActions.LOAD_LEADER_BOARD_MONTHLY_TOP_DROP_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loading: false,
      };
    }

    case fromLeaderBoardActions.LOAD_LEADER_BOARD_TOP_DROP_HISTORY: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromLeaderBoardActions.LOAD_LEADER_BOARD_TOP_DROP_HISTORY_SUCCESS: {
      return {
        ...state,
        leaderBoardTopDropHistory: action['payload'],
        loading: false,
      };
    }

    case fromLeaderBoardActions.LOAD_LEADER_BOARD_TOP_DROP_HISTORY_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoading: any = (state: LeaderBoardState): any => state.loading;
export const getLeaderBoardMonthlyTopDrop: any = (state: LeaderBoardState): LeaderBoardModel => state.leaderBoardMonthlyTopDrop;
export const getLeaderBoardTopDropHistory: any = (state: LeaderBoardState): LeaderBoardModel => state.leaderBoardTopDropHistory;
