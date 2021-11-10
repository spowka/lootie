import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';

import * as inventoryReducer from './inventory/inventory.reducer';

export interface InventoryFeatureState {
    inventory: inventoryReducer.InventoryState;
}

export const reducers: ActionReducerMap<InventoryFeatureState> = {
    inventory: inventoryReducer.inventoryReducer
};

export const getInventoryFeatureState: any = createFeatureSelector('inventory');
