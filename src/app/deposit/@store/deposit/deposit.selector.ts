import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/@store';
import * as fromDeposit from './deposit.reducer';
import * as fromDepositReducer from '../reducer';

export const getDepositState: MemoizedSelector<fromRoot.State, fromDeposit.DepositState> = createSelector(
  fromDepositReducer.getDepositFeatureState,
  (state: fromDepositReducer.DepositFeatureState) => state.deposit
);

export const selectSteamItems: MemoizedSelector<fromRoot.State, any[]> = createSelector(
  getDepositState,
  fromDeposit.getSteamItems
);

export const selectIsLoading: MemoizedSelector<fromRoot.State, boolean> = createSelector (
  getDepositState,
  fromDeposit.getIsLoading
);

export const selectCheckoutUrl: MemoizedSelector<fromRoot.State, string> = createSelector (
  getDepositState,
  fromDeposit.getCheckoutUrl
);

export const selectIsSuccess: MemoizedSelector<fromRoot.State, boolean> = createSelector (
  getDepositState,
  fromDeposit.getIsSuccess
);

export const selectIsFail: MemoizedSelector<fromRoot.State, string> = createSelector (
  getDepositState,
  fromDeposit.getIsFail
);
