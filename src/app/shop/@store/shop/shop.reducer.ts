import * as fromActions from './shop.action';

import { SiteItemsModel } from 'src/app/shared/models';

export class ShopState {
  items: SiteItemsModel[];
  total: number;
  categories: any;
  loading: boolean;
  error: string;
}

const initialState: ShopState = {
  items: [],
  categories: null,
  total: 0,
  loading: false,
  error: '',
};

export function shopReducer(
  state: ShopState = initialState,
  action: fromActions.ShopActions
): ShopState {
  switch (action.type) {
    case fromActions.LOAD_ITEMS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromActions.LOAD_CATEGORIES: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromActions.LOAD_ITEMS_SUCCESS: {
      return {
        ...state,
        items: action['payload']['data'],
        total: action['payload']['total'],
        loading: false,
      };
    }

    case fromActions.LOAD_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: action['payload'],
        loading: false,
      };
    }

    case fromActions.LOAD_ITEMS_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loading: false,
      };
    }

    case fromActions.LOAD_CATEGORIES_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getItems: any = (state: ShopState): SiteItemsModel[] =>
  state.items;
export const getCategories: any = (state: ShopState): any[] =>
  state.categories;
export const hasNoItems: any = (state: ShopState): boolean =>
  !state.loading && state.items.length === 0;
export const getTotal: any = (state: ShopState): number => state.total;
export const getLoading: any = (state: ShopState): boolean => state.loading;
