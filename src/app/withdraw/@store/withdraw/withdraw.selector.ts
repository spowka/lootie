import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/@store';
import * as fromWithdraw from './withdraw.reducer';
import * as fromWithdrawReducer from '../reducer';

import { InventoryItemsModel } from 'src/app/shared/models';
import { WithdrawalsModel } from 'src/app/withdraw/models';

export const getWithdrawState: MemoizedSelector<fromRoot.State, fromWithdraw.WithdrawState> = createSelector(
  fromWithdrawReducer.getWithdrawFeatureState,
  (state: fromWithdrawReducer.WithdrawFeatureState) => state.withdraw
);

export const selectIsLoading: MemoizedSelector<fromRoot.State, any> = createSelector(
  getWithdrawState,
  fromWithdraw.getIsLoading
);

export const selectAddWithdrawModalOpened: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  getWithdrawState,
  fromWithdraw.getAddWithdrawModalOpened
);

export const selectInventoryItems: MemoizedSelector<fromRoot.State, InventoryItemsModel[]> = createSelector(
  getWithdrawState,
  fromWithdraw.getInventoryItems
);

export const selectSelectedInventoryItems: MemoizedSelector<fromRoot.State, InventoryItemsModel[]> = createSelector(
  getWithdrawState,
  fromWithdraw.getSelectedInventoryItems
);

export const selectAdditionalFees: MemoizedSelector<fromRoot.State, any> = createSelector(
  getWithdrawState,
  fromWithdraw.getAdditionalFees
);

export const selectWithdrawals: MemoizedSelector<fromRoot.State, WithdrawalsModel[]> = createSelector(
  getWithdrawState,
  fromWithdraw.getWithdrawals
);
