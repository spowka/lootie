import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';

import * as depositReducer from './deposit/deposit.reducer';

export interface DepositFeatureState {
    deposit: depositReducer.DepositState;
}

export const reducers: ActionReducerMap<DepositFeatureState> = {
    deposit: depositReducer.depositReducer
};

export const getDepositFeatureState: any = createFeatureSelector('deposit');
