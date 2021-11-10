import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/@store';
import * as fromAccount from './account.reducer';
import * as fromAccountReducer from '../reducer';

export const selectAccountState: MemoizedSelector<fromRoot.State, fromAccount.AccountState> = createSelector(
    fromAccountReducer.getAccountFeatureState,
    (state: fromAccountReducer.AccountFeatureState) => state.account
);
