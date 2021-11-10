import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/@store';
import * as fromRewards from './rewards.reducer';
import * as fromRewardsReducer from '../reducer';

export const getAffiliatesState: MemoizedSelector<fromRoot.State, fromRewards.RewardsState> = createSelector(
  fromRewardsReducer.getRewardsFeatureState,
  (state: fromRewardsReducer.RewardsFeatureState) => state.rewards
);

