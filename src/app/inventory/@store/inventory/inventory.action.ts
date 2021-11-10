import { Action } from '@ngrx/store';
import { Filters, Pagination, InventoryItemsModel } from 'src/app/shared/models';

export const LOAD_INVENTORY_ITEMS = '[Inventory] Load Inventory Items';
export const LOAD_INVENTORY_ITEMS_SUCCESS = '[Inventory] Load Inventory Items Success';
export const LOAD_INVENTORY_ITEMS_FAIL = '[Inventory] Load Inventory Items Fail';
export const LOAD_INVENTORY_ITEMS_FOR_BATTLE = '[Inventory] Load Inventory Items for Battle';

export class LoadInventoryItems implements Action {
  readonly type: string = LOAD_INVENTORY_ITEMS;
  constructor(
    public payload: { user: string; pagination: Pagination; filters?: Filters; search?: string }
  ) {}
}

export class LoadInventoryItemsSuccess implements Action {
  readonly type: string = LOAD_INVENTORY_ITEMS_SUCCESS;
  constructor(public payload: InventoryItemsModel[]) {}
}

export class LoadInventoryItemsFail implements Action {
  readonly type: string = LOAD_INVENTORY_ITEMS_FAIL;
  constructor(public payload: any) {}
}

export class LoadInventoryItemsForBattle implements Action {
  readonly type: string = LOAD_INVENTORY_ITEMS_FOR_BATTLE;
  constructor(public payload: { battle: string }) {}
}

export const SELL_ITEM = '[Inventory] Sell Item';
export const SELL_ITEM_SUCCESS = '[Inventory] Sell Item Success';
export const SELL_ITEM_FAIL = '[Inventory] Sell Item Fail';

export class SellItem implements Action {
  readonly type: string = SELL_ITEM;
  constructor(public payload: InventoryItemsModel[]) {}
}

export class SellItemSuccess implements Action {
  readonly type: string = SELL_ITEM_SUCCESS;
}

export class SellItemFail implements Action {
  readonly type: string = SELL_ITEM_FAIL;
  constructor(public payload: any) {}
}

export type InventoryActions =
  | LoadInventoryItems
  | LoadInventoryItemsSuccess
  | LoadInventoryItemsFail
  | SellItem
  | SellItemSuccess
  | SellItemFail
  | LoadInventoryItemsForBattle;
