import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';

import * as battleReducer from './battle/battle.reducer';

export interface BattleFeatureState {
    battle: battleReducer.BattleState;
}

export const reducers: ActionReducerMap<BattleFeatureState> = {
    battle: battleReducer.battleReducer
};

export const getBattleFeatureState: any = createFeatureSelector('battle');
