import * as fromActions from './auth.action';
import * as _ from 'lodash';

import { User } from '../../models/user-profile';
import { ShippingCountry } from '../../models';

export class AuthState {
  user: User;
  token: string;
  refCode: string;
  isLoggedIn: boolean;
  shippingCountries: ShippingCountry[];
  loading: boolean;
  loaded: boolean;
  error: string;
}

const initialState: AuthState = {
  user: null,
  token: '',
  refCode: '',
  isLoggedIn: false,
  shippingCountries: [],
  loading: true,
  loaded: false,
  error: ''
};

export function authReducer(
  state: AuthState = initialState,
  action: fromActions.AuthAction
): AuthState {
  switch (action.type) {
    case fromActions.LOGIN: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromActions.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        isLoggedIn: true,
        user: action['payload'].user,
        token: action['payload'].token,
        error: ''
      };
    }

    case fromActions.LOGIN_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        isLoggedIn: false,
        user: null,
        error: action['payload']
      };
    }

    case fromActions.SIGN_UP: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromActions.SIGN_UP_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        isLoggedIn: true,
        user: action['payload'].user,
        token: action['payload'].token,
        error: ''
      };
    }

    case fromActions.SIGN_UP_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        isLoggedIn: false,
        user: null,
        error: action['payload']
      };
    }

    case fromActions.FORGOT: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromActions.FORGOT_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }

    case fromActions.FORGOT_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }

    case fromActions.AUTH_CHECK: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromActions.AUTH_CHECK_SUCCESS: {
      const { user, token } = action['payload'];
      return {
        ...state,
        loading: false,
        loaded: true,
        isLoggedIn: true,
        token,
        user
      };
    }

    case fromActions.AUTH_CHECK_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        isLoggedIn: false,
        error: action['payload']
      };
    }

    case fromActions.LOGOUT: {
      return {
        ...state,
        loading: false,
        loaded: true,
        user: null,
        isLoggedIn: false
      };
    }

    case fromActions.UPDATE_USER_BALANCE: {
      const { balance, deposited, type } = action['payload'];

      return {
        ...state,
        loading: false,
        loaded: true,
        user: state.user ? {
          ...state.user,
          balance: balance !== undefined ? balance : state.user.balance,
          depositedValue:
            deposited !== undefined ? deposited : state.user.depositedValue
        } : null
      };
    }

    case fromActions.UPDATE_USER_UNBOXED_CASES: {
      const { unboxedCases } = action['payload'];

      return {
        ...state,
        loading: false,
        loaded: true,
        user: {
          ...state.user,
          unboxedCases:
            unboxedCases !== undefined ? unboxedCases : state.user.unboxedCases
        }
      };
    }

    case fromActions.UPDATE_REFERRAL_INFO: {
      return {
        ...state,
        loading: false,
        loaded: true,
        user: { ...state.user, ...action['payload'] }
      };
    }

    case fromActions.UPDATE_REFERRAL_CODE: {
      const referralCode = action['payload'];
      return {
        ...state,
        loading: false,
        loaded: true,
        user: { ...state.user, referralCode }
      };
    }

    case fromActions.UPDATE_USER_INFO: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromActions.UPDATE_USER_INFO_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action['payload'],
        error: ''
      };
    }

    case fromActions.UPDATE_USER_INFO_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromActions.APPROVE_TOS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromActions.APPROVE_TOS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromActions.UPDATE_SHIPPING_ADDRESS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromActions.UPDATE_SHIPPING_ADDRESS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action['payload'],
        error: ''
      };
    }

    case fromActions.UPDATE_SHIPPING_ADDRESS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromActions.UPDATE_TRADE_URL: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromActions.UPDATE_TRADE_URL_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action['payload'],
        error: ''
      };
    }

    case fromActions.UPDATE_TRADE_URL_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromActions.UPDATE_USER_AVATAR: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromActions.UPDATE_USER_AVATAR_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action['payload'],
        error: ''
      };
    }

    case fromActions.UPDATE_USER_AVATAR_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromActions.GET_SHIPPING_COUNTRIES: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }

    case fromActions.GET_SHIPPING_COUNTRIES_SUCCESS: {
      return {
        ...state,
        shippingCountries: _.map(action['payload'], (name, code) => ({ code, name })),
        loaded: true,
        loading: false
      };
    }

    case fromActions.GET_SHIPPING_COUNTRIES_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loaded: true,
        loading: false
      };
    }

    case fromActions.MUTE_USER: {
      const { minute, timestamp } = action['payload'];

      return {
        ...state,
        user: { ...state.user, chatMuteInfo: { minute, timestamp } }
      };
    }

    case fromActions.UNMUTE_USER: {
      const user = { ...state.user };
      delete user.chatMuteInfo;

      return {
        ...state,
        user
      };
    }

    case fromActions.CASE_OPENED: {
      const user = { ...state.user };
      user.caseEarnings = action['payload'];

      return {
        ...state,
        user
      };
    }

    case fromActions.APPLY_REFERRAL_CODE: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }

    case fromActions.APPLY_REFERRAL_CODE_SUCCESS: {
      return {
        ...state,
        refCode: action['payload']['code'],
        user:
          action['payload']['codeType'] === 'ADMIN'
            ? {
                ...state,
                hasFreeboxOpened: false,
              }
            : state.user,
        loaded: true,
        loading: false
      };
    }

    case fromActions.APPLY_REFERRAL_CODE_FAIL: {
      return {
        ...state,
        loaded: true,
        loading: false,
        error: action['payload']
      };
    }

    case fromActions.UPDATE_HAS_FREEBOX_OPENED: {
      return {
        ...state,
        user: {
          ...state.user,
          hasFreeboxOpened: action['payload']
        }
      };
    }

    default: {
      return state;
    }
  }
}

export const getAuthState: any = (state: AuthState): AuthState => state;

export const getLoading: any = (state: AuthState): boolean => state.loading;
export const getUser: any = (state: AuthState): User => state.user;
export const getToken: any = (state: AuthState): string => state.token;
export const getIsLoggedIn: any = (state: AuthState): boolean =>
  state.isLoggedIn;
export const getAuthLoading: any = (state: AuthState): boolean => state.loading;
export const getAuthLoaded: any = (state: AuthState): boolean => state.loaded;
export const getShippingCountries: any = (state: AuthState): ShippingCountry[] =>
  state.shippingCountries;
export const getRefCode: any = (state: AuthState): string => state.refCode;