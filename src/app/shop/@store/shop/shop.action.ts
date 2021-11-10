import { Action } from '@ngrx/store';
import { SiteItemsModel, Filters, Pagination, SidebarFilters } from 'src/app/shared/models';

export const LOAD_ITEMS = '[Shop] Load Items';
export const LOAD_ITEMS_SUCCESS = '[Shop] Load Items Success';
export const LOAD_ITEMS_FAIL = '[Shop] Load Items Fail';
export const LOAD_CATEGORIES = '[Shop] Load Categories';
export const LOAD_CATEGORIES_SUCCESS = '[Shop] Load Categories Success';
export const LOAD_CATEGORIES_FAIL = '[Shop] Load Categories Fail';
export const BUY_ITEM = '[Shop] Buy Item';
export const BUY_ITEM_SUCCESS = '[Shop] Buy Item Success';
export const BUY_ITEM_FAIL = '[Shop] Buy Item Fail';

export class LoadItems implements Action {
  readonly type: string = LOAD_ITEMS;
  constructor(
    public payload: {
      pagination: Pagination;
      filters?: Filters;
      search?: string;
      tag?: string;
      sidebarFilters?: SidebarFilters;
    }
  ) {}
}

export class LoadItemsSuccess implements Action {
  readonly type: string = LOAD_ITEMS_SUCCESS;
  constructor(public payload: { data: SiteItemsModel[]; total: number }) {}
}

export class LoadItemsFail implements Action {
  readonly type: string = LOAD_ITEMS_FAIL;
  constructor(public payload: any) {}
}

export class LoadCategories implements Action {
  readonly type: string = LOAD_CATEGORIES;
}

export class LoadCategoriesSuccess implements Action {
  readonly type: string = LOAD_CATEGORIES_SUCCESS;
  constructor(public payload: any) { }
}

export class LoadCategoriesFail implements Action {
  readonly type: string = LOAD_CATEGORIES_FAIL;
  constructor(public payload: any) { }
}

export class BuyItem implements Action {
  readonly type: string = BUY_ITEM;
  constructor(public payload: string) {}
}

export class BuyItemSuccess implements Action {
  readonly type: string = BUY_ITEM_SUCCESS;
  constructor(public payload: any) {}
}

export class BuyItemFail implements Action {
  readonly type: string = BUY_ITEM_FAIL;
  constructor(public payload: any) {}
}


export type ShopActions =
  | LoadItems
  | LoadItemsSuccess
  | LoadItemsFail
  | LoadCategories
  | LoadCategoriesSuccess
  | LoadCategoriesFail
  | BuyItem;
