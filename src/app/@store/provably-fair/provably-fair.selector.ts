import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from '../reducer';
import * as fromProvablyFair from './provably-fair.reducer';
import { ServerSeed, PreviousSeeds } from '../../provably-fair/models';

export const selectLoading: MemoizedSelector<fromRoot.State, any> = createSelector(
  (state: fromRoot.State) => state.provablyFair,
  fromProvablyFair.getLoading
);

export const selectLookupModalOpened: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.provablyFair,
  fromProvablyFair.getLookupModalOpened
);

export const selectClientSeed: MemoizedSelector<fromRoot.State, string> = createSelector(
  (state: fromRoot.State) => state.provablyFair,
  fromProvablyFair.getClientSeed
);

export const selectServerSeedHashed: MemoizedSelector<fromRoot.State, ServerSeed[]> = createSelector(
  (state: fromRoot.State) => state.provablyFair,
  fromProvablyFair.getServerSeedHashed
);

export const selectPreviousSeeds: MemoizedSelector<fromRoot.State, PreviousSeeds> = createSelector(
  (state: fromRoot.State) => state.provablyFair,
  fromProvablyFair.getPreviousSeeds
);

export const selectUrlFrom: MemoizedSelector<fromRoot.State, string> = createSelector(
  (state: fromRoot.State) => state.provablyFair,
  fromProvablyFair.getUrlFrom
);

export const selectId: MemoizedSelector<fromRoot.State, string> = createSelector(
  (state: fromRoot.State) => state.provablyFair,
  fromProvablyFair.getId
);

export const selectProvablyFair: MemoizedSelector<fromRoot.State, any> = createSelector(
  (state: fromRoot.State) => state.provablyFair,
  fromProvablyFair.getProvablyFair
);
