import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import * as fromLayout from './layout/layout.reducer';
import * as fromHistory from './history/history.reducer';
import { provablyFairReducer, ProvablyFairState } from './provably-fair';

import { RouterStateUrl } from './router';

export interface State {
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    layout: fromLayout.LayoutState;
    history: fromHistory.HistoryState;
    provablyFair: ProvablyFairState
}

export const reducers: ActionReducerMap<State> = {
    router: fromRouter.routerReducer,
    layout: fromLayout.layoutReducer,
    history: fromHistory.historyReducer,
    provablyFair: provablyFairReducer,
};

export const getAppState: any = createFeatureSelector<State>('root');
