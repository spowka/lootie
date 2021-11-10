import * as fromAffiliatesActions from './affiliates.action';
import { ReferralInfoModel } from 'src/app/affiliates/models';

export class AffiliatesState {
  referralInfo: ReferralInfoModel;
  loaded: boolean;
  loading: boolean;
  error: string;
}

const initialState: AffiliatesState = {
  referralInfo: {
    personal: {
      allEarnings: 0,
      availableEarnings: 0,
      commisionCut: 0.05,
      referralReceives: 3,
      totalReferrals: 0,
    },
  },
  loaded: true,
  loading: false,
  error: '',
};

export function affiliatesReducer(
  state: AffiliatesState = initialState,
  action: fromAffiliatesActions.AffiliatesActions
): AffiliatesState {
  switch (action.type) {
    case fromAffiliatesActions.LOAD_REFERRAL_INFO: {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }

    case fromAffiliatesActions.LOAD_REFERRAL_INFO_SUCCESS: {
      return {
        referralInfo: {
          personal: {
            ...state.referralInfo.personal,
            ...action['payload']['personal']
          }
        },
        loaded: true,
        loading: false,
        error: ''
      };
    }

    case fromAffiliatesActions.LOAD_REFERRAL_INFO_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromAffiliatesActions.CREATE_REFERRAL_CODE: {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }

    case fromAffiliatesActions.CREATE_REFERRAL_CODE_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromAffiliatesActions.CLAIM_EARNINGS_SUCCESS: {
      return {
        ...state,
        referralInfo: {
          personal: {
            ...state.referralInfo.personal,
            availableEarnings: 0,
          },
        },
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoading: any = (state: AffiliatesState): boolean => state.loading;

export const getReferralInfo: any = (state: AffiliatesState): ReferralInfoModel => state.referralInfo;

