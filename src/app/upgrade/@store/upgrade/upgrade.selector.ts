import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/@store';
import * as fromUpgrade from './upgrade.reducer';
import * as fromUpgradeReducer from '../reducer';

import { UpgradingModel, UpgradeConfigModel } from 'src/app/upgrade/models';
import { SiteItemsModel, InventoryItemsModel } from 'src/app/shared/models';

export const getUpgradeState: MemoizedSelector<fromRoot.State, fromUpgrade.UpgradeState> = createSelector(
  fromUpgradeReducer.getUpgradeFeatureState,
  (state: fromUpgradeReducer.UpgradeFeatureState) => state.upgrade
);

export const selectIsLoading: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  getUpgradeState,
  fromUpgrade.getIsLoading
);

export const selectInventoryModalOpened: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  getUpgradeState,
  fromUpgrade.getInventoryModalOpened
);

export const selectSiteItems: MemoizedSelector<fromRoot.State, SiteItemsModel[]> = createSelector(
  getUpgradeState,
  fromUpgrade.getSiteItems
);

export const selectSelectedSiteItems: MemoizedSelector<fromRoot.State, SiteItemsModel[]> = createSelector(
  getUpgradeState,
  fromUpgrade.getSelectedSiteItems
);

export const selectInventoryItems: MemoizedSelector<fromRoot.State, InventoryItemsModel[]> = createSelector(
  getUpgradeState,
  fromUpgrade.getInventoryItems
);

export const selectSelectedInventoryItems: MemoizedSelector<fromRoot.State, InventoryItemsModel[]> = createSelector(
  getUpgradeState,
  fromUpgrade.getSelectedInventoryItems
);

export const selectUpgrades: MemoizedSelector<fromRoot.State, UpgradingModel[]> = createSelector(
  getUpgradeState,
  fromUpgrade.getUpgrades
);

export const selectUpgrading: MemoizedSelector<fromRoot.State, UpgradingModel> = createSelector(
  getUpgradeState,
  fromUpgrade.getUpgrading
);

export const selectUpgradingResult: MemoizedSelector<fromRoot.State, any> = createSelector(
  getUpgradeState,
  fromUpgrade.getUpgradingResult
);

export const selectConfig: MemoizedSelector<fromRoot.State, UpgradeConfigModel> = createSelector(
  getUpgradeState,
  fromUpgrade.getConfig
);
