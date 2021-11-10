import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';

import * as rewardsReducer from './rewards/rewards.reducer';

export interface RewardsFeatureState {
    rewards: rewardsReducer.RewardsState;
}

export const reducers: ActionReducerMap<RewardsFeatureState> = {
    rewards: rewardsReducer.rewardsReducer
};

export const getRewardsFeatureState: any = createFeatureSelector('rewards');
