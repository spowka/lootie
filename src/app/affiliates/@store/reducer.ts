import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';

import * as affiliatesReducer from './affiliates/affiliates.reducer';

export interface AffiliatesFeatureState {
    affiliates: affiliatesReducer.AffiliatesState;
}

export const reducers: ActionReducerMap<AffiliatesFeatureState> = {
    affiliates: affiliatesReducer.affiliatesReducer
};

export const getAffiliatesFeatureState: any = createFeatureSelector('affiliates');
