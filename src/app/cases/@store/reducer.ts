import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';

import * as casesReducer from './cases/cases.reducer';

export interface CasesFeatureState {
    cases: casesReducer.CasesState;
}

export const reducers: ActionReducerMap<CasesFeatureState> = {
    cases: casesReducer.casesReducer
};

export const getCasesFeatureState: any = createFeatureSelector('cases');
