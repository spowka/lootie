import * as fromDepositActions from './deposit.action';

export class DepositState {
  steamItems: any[];
  checkoutUrl: string;
  isSuccess: boolean;
  isFail: string;
  loading: boolean;
  loaded: boolean;
  error: string;
}

const initialState: DepositState = {
  steamItems: [],
  checkoutUrl: '',
  isSuccess: false,
  isFail: null,
  loading: false,
  loaded: true,
  error: '',
};

export function depositReducer(
  state: DepositState = initialState,
  action: fromDepositActions.DepositActions
): DepositState {
  switch (action.type) {
    case fromDepositActions.LOAD_STEAM_ITEMS: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: '',
      };
    }

    case fromDepositActions.LOAD_STEAM_ITEMS_SUCCESS: {
      return {
        ...state,
        steamItems: action['payload'],
        loading: false,
        loaded: true,
        error: '',
      };
    }

    case fromDepositActions.LOAD_STEAM_ITEMS_FAIL: {
      return {
        ...state,
        steamItems: [],
        loading: false,
        loaded: true,
        error: action['payload'],
      };
    }

    case fromDepositActions.PROCEED_DEPOSIT: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case fromDepositActions.PROCEED_DEPOSIT_SUCCESS: {
      return {
        ...state,
        checkoutUrl: action['payload'],
        loading: false,
        loaded: true,
      };
    }

    case fromDepositActions.PROCEED_DEPOSIT_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload'],
      };
    }

    case fromDepositActions.SET_SUCCESS_STATUS: {
      return {
        ...state,
        isSuccess: true,
        isFail: null,
        checkoutUrl: '',
      };
    }

    case fromDepositActions.SET_FAIL_STATUS: {
      return {
        ...state,
        isFail: action['payload'],
        isSuccess: false,
        checkoutUrl: '',
      };
    }

    default: {
      return state;
    }
  }
}

export const getSteamItems: any = (state: DepositState): any[] => state.steamItems;
export const getIsLoading: any = (state: DepositState): boolean => state.loading;
export const getIsSuccess: any = (state: DepositState): boolean => state.isSuccess;
export const getIsFail: any = (state: DepositState): string => state.isFail;
export const getCheckoutUrl: any = (state: DepositState): string => state.checkoutUrl;
