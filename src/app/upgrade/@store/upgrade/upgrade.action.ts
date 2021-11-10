import { Action } from '@ngrx/store';
import { Filters, Pagination, SiteItemsModel, InventoryItemsModel } from 'src/app/shared/models';
import { CreateUpgradeModel, UpgradingModel, UpgradeConfigModel } from 'src/app/upgrade/models';

export const OPEN_INVENTORY_MODAL = '[Upgrade] Open Inventory Modal';
export const CLOSE_INVENTORY_MODAL = '[Upgrade] Close Inventory Modal';

export class OpenInventoryModal implements Action {
  readonly type: string = OPEN_INVENTORY_MODAL;
}

export class CloseInventoryModal implements Action {
  readonly type: string = CLOSE_INVENTORY_MODAL;
}

export const LOAD_SITE_ITEMS = '[Upgrade] Load Site Items';
export const LOAD_SITE_ITEMS_SUCCESS = '[Upgrade] Load Site Items Success';
export const LOAD_SITE_ITEMS_FAIL = '[Upgrade] Load Site Items Fail';

export class LoadSiteItems implements Action {
  readonly type: string = LOAD_SITE_ITEMS;
  constructor(public payload: { pagination?: Pagination, filters?: Filters, search?: string }) { }
}

export class LoadSiteItemsSuccess implements Action {
  readonly type: string = LOAD_SITE_ITEMS_SUCCESS;
  constructor(public payload: SiteItemsModel[]) { }
}

export class LoadSiteItemsFail implements Action {
  readonly type: string = LOAD_SITE_ITEMS_FAIL;
  constructor(public payload: any) { }
}

export const LOAD_INVENTORY_ITEMS = '[Upgrade] Load Inventory Items';
export const LOAD_INVENTORY_ITEMS_SUCCESS = '[Upgrade] Load Inventory Items Success';
export const LOAD_INVENTORY_ITEMS_FAIL = '[Upgrade] Load Inventory Items Fail';

export class LoadInventoryItems implements Action {
  readonly type: string = LOAD_INVENTORY_ITEMS;
  constructor(public payload: { user: string; pagination: Pagination, filters?: Filters, search?: string }) { }
}

export class LoadInventoryItemsSuccess implements Action {
  readonly type: string = LOAD_INVENTORY_ITEMS_SUCCESS;
  constructor(public payload: InventoryItemsModel[]) { }
}

export class LoadInventoryItemsFail implements Action {
  readonly type: string = LOAD_INVENTORY_ITEMS_FAIL;
  constructor(public payload: any) { }
}

export const LOAD_UPGRADES = '[Upgrade] Load Upgrades Items';
export const LOAD_UPGRADES_SUCCESS = '[Upgrade] Load Upgrades Items Success';
export const LOAD_UPGRADES_FAIL = '[Upgrade] Load Upgrades Items Fail';

export class LoadUpgrades implements Action {
  readonly type: string = LOAD_UPGRADES;
}

export class LoadUpgradesSuccess implements Action {
  readonly type: string = LOAD_UPGRADES_SUCCESS;
  constructor(public payload: UpgradingModel[]) { }
}

export class LoadUpgradesFail implements Action {
  readonly type: string = LOAD_UPGRADES_FAIL;
  constructor(public payload: any) { }
}

export const ADD_LATEST_UPGRADE = '[Upgrade] Add Latest Upgrade';

export class AddLatestUpgrade implements Action {
  readonly type: string = ADD_LATEST_UPGRADE;
  constructor(public payload: any) { }
}

export const SELECT_SITE_ITEMS = '[Upgrade] Select Site Items';

export class SelectSiteItems implements Action {
  readonly type: string = SELECT_SITE_ITEMS;
  constructor(public payload: SiteItemsModel[]) { }
}

export const SELECT_INVENTORY_ITEMS = '[Upgrade] Select Inventory Items';

export class SelectInventoryItems implements Action {
  readonly type: string = SELECT_INVENTORY_ITEMS;
  constructor(public payload: InventoryItemsModel[]) { }
}

export const UPDATE_INVENTORY_ITEMS = '[Upgrade] Add Inventory Items';

export class UpdateInventoryItems implements Action {
  readonly type: string = UPDATE_INVENTORY_ITEMS;
  constructor(public payload: { add: InventoryItemsModel[], remove: InventoryItemsModel[] }) { }
}

export const CREATE_UPGRADE = '[Upgrade] Create Upgrade';
export const CREATE_UPGRADE_SUCCESS = '[Upgrade] Create Upgrade Success';
export const CREATE_UPGRADE_FAIL = '[Upgrade] Create Upgrade Fail';
export const CREATE_ROLL_UPGRADE = '[Upgrade] Create Roll Upgrade';

export class CreateUpgrade implements Action {
  readonly type: string = CREATE_UPGRADE;
  constructor(public payload: CreateUpgradeModel) { }
}

export class CreateUpgradeSuccess implements Action {
  readonly type: string = CREATE_UPGRADE_SUCCESS;
  constructor(public payload: UpgradingModel) { }
}

export class CreateUpgradeFail implements Action {
  readonly type: string = CREATE_UPGRADE_FAIL;
  constructor(public payload: any) { }
}

export class CreateRollUpgrade implements Action {
  readonly type: string = CREATE_ROLL_UPGRADE;
  constructor(public payload: CreateUpgradeModel) { }
}

export const ROLL_AN_UPGRADE = '[Upgrade] Roll An Upgrade';
export const ROLL_AN_UPGRADE_SUCCESS = '[Upgrade] Roll An Upgrade Success';
export const ROLL_AN_UPGRADE_FAIL = '[Upgrade] Roll An Upgrade Fail';

export class RollAnUpgrade implements Action {
  readonly type: string = ROLL_AN_UPGRADE;
  constructor(public payload: string) { }
}

export class RollAnUpgradeSuccess implements Action {
  readonly type: string = ROLL_AN_UPGRADE_SUCCESS;
  constructor(public payload: any) { }
}

export class RollAnUpgradeFail implements Action {
  readonly type: string = ROLL_AN_UPGRADE_FAIL;
  constructor(public payload: any) { }
}

export const RESET_UPGRADE = '[Upgrade] Reset Upgrade';

export class ResetUpgrade implements Action {
  readonly type: string = RESET_UPGRADE;
}

export const DELETE_UPGRADE = '[Upgrade] Delete Upgrade';
export const DELETE_UPGRADE_SUCCESS = '[Upgrade] Delete Upgrade Success';
export const DELETE_UPGRADE_FAIL = '[Upgrade] Delete Upgrade Fail';

export class DeleteUpgrade implements Action {
  readonly type: string = DELETE_UPGRADE;
  constructor(public payload: string) { }
}

export class DeleteUpgradeSuccess implements Action {
  readonly type: string = DELETE_UPGRADE_SUCCESS;
}

export class DeleteUpgradeFail implements Action {
  readonly type: string = DELETE_UPGRADE_FAIL;
  constructor(public payload: any) { }
}

export const UPDATE_CONFIG = '[Upgrade] Update Config';

export class UpdateConfig implements Action {
  readonly type: string = UPDATE_CONFIG;
  constructor(public payload: UpgradeConfigModel) { }
}

export const GET_SUGGEST_ITEM = '[Upgrade] Get Suggest Item';
export const GET_SUGGEST_ITEM_SUCCESS = '[Upgrade] Get Suggest Item Success';
export const GET_SUGGEST_ITEM_FAIL = '[Upgrade] Get Suggest Item Fail';

export class GetSuggestItem implements Action {
  readonly type: string = GET_SUGGEST_ITEM;
  constructor(public payload: { price: number, multiplier: number }) { }
}

export class GetSuggestItemSuccess implements Action {
  readonly type: string = GET_SUGGEST_ITEM_SUCCESS;
  constructor(public payload: SiteItemsModel) { }
}

export class GetSuggestItemFail implements Action {
  readonly type: string = GET_SUGGEST_ITEM_FAIL;
  constructor(public payload: any) { }
}

export type UpgradeActions =
  | OpenInventoryModal
  | CloseInventoryModal
  | LoadSiteItems
  | LoadSiteItemsSuccess
  | LoadSiteItemsFail
  | LoadInventoryItems
  | LoadInventoryItemsSuccess
  | LoadInventoryItemsFail
  | LoadUpgrades
  | LoadUpgradesSuccess
  | LoadUpgradesFail
  | AddLatestUpgrade
  | SelectSiteItems
  | SelectInventoryItems
  | UpdateInventoryItems
  | CreateUpgrade
  | CreateUpgradeSuccess
  | CreateUpgradeFail
  | RollAnUpgrade
  | RollAnUpgradeSuccess
  | RollAnUpgradeFail
  | ResetUpgrade
  | DeleteUpgrade
  | DeleteUpgradeSuccess
  | DeleteUpgradeFail
  | CreateRollUpgrade
  | UpdateConfig
  | GetSuggestItem
  | GetSuggestItemSuccess
  | GetSuggestItemFail;
