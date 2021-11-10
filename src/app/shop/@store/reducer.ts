import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';

import * as shopReducer from './shop/shop.reducer';

export interface ShopFeatureState {
  shop: shopReducer.ShopState;
}

export const reducers: ActionReducerMap<ShopFeatureState> = {
  shop: shopReducer.shopReducer,
};

export const getShopFeatureState: any = createFeatureSelector('shop');
