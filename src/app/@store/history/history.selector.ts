import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from '../reducer';
import * as fromHistory from './history.reducer';

import { UpgradingModel } from 'src/app/upgrade/models';
import { CaseUnboxingModel, CaseUnboxingHisoryModel } from 'src/app/cases/models';
import { WithdrawalsModel } from 'src/app/withdraw/models';
import { DepositModel } from 'src/app/shared/models';

export const selectLoading: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.history,
  fromHistory.getLoading
);

export const selectUpgrades: MemoizedSelector<fromRoot.State, UpgradingModel[]> = createSelector(
  (state: fromRoot.State) => state.history,
  fromHistory.getUpgrades
);

export const selectUnboxings: MemoizedSelector<fromRoot.State, CaseUnboxingModel[]> = createSelector(
  (state: fromRoot.State) => state.history,
  fromHistory.getUnboxings
);

export const selectUnboxingId: MemoizedSelector<fromRoot.State, string> = createSelector(
  (state: fromRoot.State) => state.history,
  fromHistory.getUnboxingId
);

export const selectWithdrawals: MemoizedSelector<fromRoot.State, WithdrawalsModel[]> = createSelector(
  (state: fromRoot.State) => state.history,
  fromHistory.getWithdrawals
);

export const selectDeposits: MemoizedSelector<fromRoot.State, DepositModel[]> = createSelector(
  (state: fromRoot.State) => state.history,
  fromHistory.getDeposits
);

export const selectLatestDrops: MemoizedSelector<fromRoot.State, CaseUnboxingHisoryModel[]> = createSelector(
  (state: fromRoot.State) => state.history,
  fromHistory.getLatestDrops,
);

export const selectTags: MemoizedSelector<fromRoot.State, string[]> = createSelector(
  (state: fromRoot.State) => state.history,
  fromHistory.getTags
);
