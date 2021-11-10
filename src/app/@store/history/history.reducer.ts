import * as fromActions from './history.action';
import { UpgradingModel } from 'src/app/upgrade/models';
import { CaseUnboxingModel, CaseUnboxingHisoryModel } from 'src/app/cases/models';
import { WithdrawalsModel } from 'src/app/withdraw/models';
import { DepositModel } from 'src/app/shared/models';
import { LOGIN } from 'src/app/auth/@store';

export class HistoryState {
  upgrades: UpgradingModel[];
  unboxings: CaseUnboxingModel[];
  unboxingId: string;
  withdrawals: WithdrawalsModel[];
  deposits: DepositModel[];
  latestDrops: CaseUnboxingHisoryModel[];
  tags: string[];
  loading: boolean;
  error: string;
}

const initialState: HistoryState = {
  upgrades: [],
  unboxings: [],
  unboxingId: '',
  withdrawals: [],
  deposits: [],
  latestDrops: [],
  tags: [],
  loading: false,
  error: '',
};

export function historyReducer(
  state: HistoryState = initialState,
  action: fromActions.HistoryActions
): HistoryState {
  switch (action.type) {
    case fromActions.LOAD_UPGRADES: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromActions.LOAD_UPGRADES_SUCCESS: {
      return {
        ...state,
        upgrades: action['payload'].items,
        loading: false,
      };
    }

    case fromActions.LOAD_UPGRADES_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loading: false,
      };
    }

    case fromActions.LOAD_UNBOXINGS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromActions.LOAD_UNBOXINGS_SUCCESS: {
      return {
        ...state,
        unboxings: action['payload'],
        loading: false,
      };
    }

    case fromActions.LOAD_UNBOXINGS_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loading: false,
      };
    }

    case fromActions.UNBOXING_ID: {

      return {
        ...state,
        unboxingId: action['payload'],
        loading: true,
      };
    }


    case fromActions.LOAD_WITHDRAWALS: {

      return {
        ...state,
        loading: true,
      };
    }

    case fromActions.LOAD_WITHDRAWALS_SUCCESS: {
      return {
        ...state,
        withdrawals: action['payload'],
        loading: false,
      };
    }

    case fromActions.LOAD_WITHDRAWALS_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loading: false,
      };
    }

    case fromActions.LOAD_DEPOSITS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromActions.LOAD_DEPOSITS_SUCCESS: {
      return {
        ...state,
        deposits: action['payload'],
        loading: false,
      };
    }

    case fromActions.LOAD_DEPOSITS_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loading: false,
      };
    }

    case fromActions.LOAD_LATEST_DROPS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromActions.LOAD_LATEST_DROPS_SUCCESS: {
      return {
        ...state,
        latestDrops: action['payload'],
        loading: false,
        error: '',
      };
    }

    case fromActions.LOAD_LATEST_DROPS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action['payload'],
      };
    }

    case fromActions.ADD_LATEST_DROP: {
      const newCase = action['payload'];
      const latestDrops = state.latestDrops.slice();
      if (latestDrops.length > 11) {
        latestDrops.pop();
      }
      latestDrops.unshift(newCase);

      return {
        ...state,
        latestDrops,
        loading: false,
      };
    }

    case fromActions.LOAD_TAGS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromActions.LOAD_TAGS_SUCCESS: {
      return {
        ...state,
        tags: action['payload'],
        loading: false,
      };
    }

    case fromActions.LOAD_TAGS_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loading: false,
      };
    }


    default:
      return state;
  }
}

export const getLoading: any = (state: HistoryState): boolean => state.loading;

export const getUpgrades: any = (state: HistoryState): UpgradingModel[] => state.upgrades;
export const getUnboxings: any = (state: HistoryState): CaseUnboxingModel[] => state.unboxings;
export const getUnboxingId: any = (state: HistoryState): string => state.unboxingId;
export const getWithdrawals: any = (state: HistoryState): WithdrawalsModel[] => state.withdrawals;
export const getDeposits: any = (state: HistoryState): DepositModel[] => state.deposits;
export const getTags: any = (state: HistoryState): string[] => state.tags;
export const getLatestDrops: any = (state: HistoryState): CaseUnboxingHisoryModel[] =>
  state.latestDrops;
