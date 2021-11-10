import { createSelector, MemoizedSelector } from '@ngrx/store';

import { State as AppState } from 'src/app/@store';
import { SiteItemsModel } from 'src/app/shared/models';

import * as shopReducer from './shop.reducer';
import { getShopFeatureState, ShopFeatureState } from '../reducer';

export const selectShopState: MemoizedSelector<
  AppState,
  shopReducer.ShopState
> = createSelector(
  getShopFeatureState,
  (state: ShopFeatureState) => state.shop
);

export const selectItems: MemoizedSelector<
  AppState,
  SiteItemsModel[]
> = createSelector(selectShopState, shopReducer.getItems);

export const selectCategories: MemoizedSelector<
  AppState,
  any
  > = createSelector(selectShopState, shopReducer.getCategories);

export const selectHasNoItems: MemoizedSelector<
  AppState,
  boolean
> = createSelector(selectShopState, shopReducer.hasNoItems);

export const selectTotal: MemoizedSelector<
  AppState,
  number
> = createSelector(selectShopState, shopReducer.getTotal);

export const selectLoading: MemoizedSelector<
  AppState,
  boolean
> = createSelector(selectShopState, shopReducer.getLoading);
