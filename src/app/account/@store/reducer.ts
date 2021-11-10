import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';

import * as accountReducer from './account/account.reducer';

export interface AccountFeatureState {
    account: accountReducer.AccountState;
}

export const reducers: ActionReducerMap<AccountFeatureState> = {
    account: accountReducer.accountReducer
};

export const getAccountFeatureState: any = createFeatureSelector('account');
