import * as fromInventoryActions from './inventory.action';
import { InventoryItemsModel } from 'src/app/shared/models';

export class InventoryState {
  inventoryItems: InventoryItemsModel[];
  selectedInventoryItems: InventoryItemsModel[];
  loading: { data: boolean, sell: boolean };
  error: string;
}

const initialState: InventoryState = {
  inventoryItems: [],
  selectedInventoryItems: [],
  loading: { data: false, sell: false },
  error: '',
};

export function inventoryReducer(
  state: InventoryState = initialState,
  action: fromInventoryActions.InventoryActions
): InventoryState {
  switch (action.type) {
    case fromInventoryActions.LOAD_INVENTORY_ITEMS: {
      return {
        ...state,
        loading: { data: true, sell: false },
      };
    }

    case fromInventoryActions.LOAD_INVENTORY_ITEMS_SUCCESS: {
      return {
        ...state,
        inventoryItems: action['payload'],
        loading: { data: false, sell: false },
      };
    }

    case fromInventoryActions.LOAD_INVENTORY_ITEMS_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loading: { data: false, sell: false },
      };
    }

    case fromInventoryActions.SELL_ITEM: {
      return {
        ...state,
        loading: { data: false, sell: true },
      };
    }

    case fromInventoryActions.SELL_ITEM_SUCCESS: {
      return {
        ...state,
        loading: { data: false, sell: false },
      };
    }

    case fromInventoryActions.SELL_ITEM_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loading: { data: false, sell: false },
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoading: any = (state: InventoryState): any => state.loading;

export const getInventoryItems: any = (state: InventoryState): InventoryItemsModel[] => state.inventoryItems;
export const getSelectedInventoryItems: any = (state: InventoryState): InventoryItemsModel[] => state.selectedInventoryItems;

