import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/@store';
import * as fromAuth from './auth.reducer';
import * as fromAuthReducer from '../reducer';

import { User } from '../../models/user-profile';
import { ShippingCountry } from '../../models';

export const selectAuthState: MemoizedSelector<fromRoot.State, fromAuth.AuthState> = createSelector(
    fromAuthReducer.getAuthFeatureState,
    (state: fromAuthReducer.AuthFeatureState) => state.auth
);

export const selectLoading: MemoizedSelector<fromRoot.State, boolean> = createSelector(
    selectAuthState,
    fromAuth.getLoading
);

export const selectIsLoggedIn: MemoizedSelector<fromRoot.State, boolean> = createSelector(
    selectAuthState,
    fromAuth.getIsLoggedIn
);

export const selectAuthLoading: MemoizedSelector<fromRoot.State, boolean> = createSelector(
    selectAuthState,
    fromAuth.getAuthLoading
);

export const selectAuthLoaded: MemoizedSelector<fromRoot.State, boolean> = createSelector(
    selectAuthState,
    fromAuth.getAuthLoaded
);

export const selectUser: MemoizedSelector<fromRoot.State, User> = createSelector(
    selectAuthState,
    fromAuth.getUser
);

export const selectToken: MemoizedSelector<fromRoot.State, string> = createSelector(
    selectAuthState,
    fromAuth.getToken
);

export const selectShippingCountries: MemoizedSelector<fromRoot.State, ShippingCountry[]> = createSelector(
    selectAuthState,
    fromAuth.getShippingCountries
);

export const selectRefCode: MemoizedSelector<fromRoot.State, string> = createSelector(
    selectAuthState,
    fromAuth.getRefCode
);
