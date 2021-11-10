import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';

import * as withdrawReducer from './withdraw/withdraw.reducer';

export interface WithdrawFeatureState {
    withdraw: withdrawReducer.WithdrawState;
}

export const reducers: ActionReducerMap<WithdrawFeatureState> = {
    withdraw: withdrawReducer.withdrawReducer
};

export const getWithdrawFeatureState: any = createFeatureSelector('withdraw');
