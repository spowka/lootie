import { createSelector, MemoizedSelector } from '@ngrx/store';

import { BattleModel, BattleRoundModel } from 'src/app/battle/models';

import * as fromRoot from 'src/app/@store';
import * as fromBattle from './battle.reducer';
import * as fromBattleReducer from '../reducer';

import { CaseModel } from 'src/app/cases/models';

export const selectBattleState: MemoizedSelector<
  fromRoot.State,
  fromBattle.BattleState
> = createSelector(
  fromBattleReducer.getBattleFeatureState,
  (state: fromBattleReducer.BattleFeatureState) => state.battle
);

export const selectBattleBoxModalOpened: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  selectBattleState,
  fromBattle.getBattleBoxModalOpened
);

export const selectLoading: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  selectBattleState,
  fromBattle.getLoading
);

export const selectLoaded: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  selectBattleState,
  fromBattle.getLoaded
);

export const selectBattles: MemoizedSelector<fromRoot.State, BattleModel[]> = createSelector(
  selectBattleState,
  fromBattle.getBattles
);

export const selectBattle: MemoizedSelector<fromRoot.State, BattleModel> = createSelector(
  selectBattleState,
  fromBattle.getBattle
);

export const selectBoxes: MemoizedSelector<fromRoot.State, CaseModel[]> = createSelector(
  selectBattleState,
  fromBattle.getBoxes
);

export const selectSelectedBoxes: MemoizedSelector<fromRoot.State, CaseModel[]> = createSelector(
  selectBattleState,
  fromBattle.getSelectedBoxes
);

export const selectUrlFrom: MemoizedSelector<fromRoot.State, string> = createSelector(
  selectBattleState,
  fromBattle.getUrlFrom
);
