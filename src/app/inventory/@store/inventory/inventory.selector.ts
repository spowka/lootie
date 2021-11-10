import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/@store';
import * as fromInventory from './inventory.reducer';
import * as fromInventoryReducer from '../reducer';

import { InventoryItemsModel } from 'src/app/shared/models';

export const getInventoryState: MemoizedSelector<fromRoot.State, fromInventory.InventoryState> = createSelector(
  fromInventoryReducer.getInventoryFeatureState,
  (state: fromInventoryReducer.InventoryFeatureState) => state.inventory
);

export const selectInventoryItems: MemoizedSelector<fromRoot.State, InventoryItemsModel[]> = createSelector(
  getInventoryState,
  fromInventory.getInventoryItems
);

export const selectSelectedInventoryItems: MemoizedSelector<fromRoot.State, InventoryItemsModel[]> = createSelector(
  getInventoryState,
  fromInventory.getSelectedInventoryItems
);

export const selectLoading: MemoizedSelector<fromRoot.State, any> = createSelector(
  getInventoryState,
  fromInventory.getLoading
);
