import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';

import * as upgradeReducer from './upgrade/upgrade.reducer';

export interface UpgradeFeatureState {
    upgrade: upgradeReducer.UpgradeState;
}

export const reducers: ActionReducerMap<UpgradeFeatureState> = {
    upgrade: upgradeReducer.upgradeReducer
};

export const getUpgradeFeatureState: any = createFeatureSelector('upgrade');
