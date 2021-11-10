import * as fromWithdrawActions from './withdraw.action';
import { InventoryItemsModel } from 'src/app/shared/models';
import { WithdrawalsModel } from 'src/app/withdraw/models';

export class WithdrawState {
  addWithdrawModalOpened: boolean;
  inventoryItems: InventoryItemsModel[];
  selectedInventoryItems: InventoryItemsModel[];
  additionalFees: any;
  withdrawals: WithdrawalsModel[];
  loading: { create: boolean, inventory: boolean, withdraw: boolean };
  loaded: boolean;
  error: string;
}

const initialState: WithdrawState = {
  addWithdrawModalOpened: false,
  inventoryItems: [],
  selectedInventoryItems: [],
  additionalFees: null,
  withdrawals: [],
  loading: { create: false, inventory: false, withdraw: false },
  loaded: false,
  error: '',
};

export function withdrawReducer(
  state: WithdrawState = initialState,
  action: fromWithdrawActions.WithdrawActions
): WithdrawState {
  switch (action.type) {
    case fromWithdrawActions.OPEN_ADD_WITHDRAW_MODAL: {
      return {
        ...state,
        addWithdrawModalOpened: true
      };
    }

    case fromWithdrawActions.CLOSE_ADD_WITHDRAW_MODAL: {
      return {
        ...state,
        addWithdrawModalOpened: false
      };
    }

    case fromWithdrawActions.LOAD_INVENTORY_ITEMS: {
      return {
        ...state,
        loading: { ...state.loading, inventory: true },
      };
    }

    case fromWithdrawActions.LOAD_INVENTORY_ITEMS_SUCCESS: {
      return {
        ...state,
        inventoryItems: action['payload'],
        loading: { ...state.loading, inventory: false },
      };
    }

    case fromWithdrawActions.LOAD_INVENTORY_ITEMS_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loading: { ...state.loading, inventory: false },
      };
    }

    case fromWithdrawActions.GET_ADDITIONAL_FEE: {
      return {
        ...state,
      };
    }

    case fromWithdrawActions.GET_ADDITIONAL_FEE_SUCCESS: {
      return {
        ...state,
        additionalFees: { ...state.additionalFees, ...action['payload'] },
      };
    }

    case fromWithdrawActions.GET_ADDITIONAL_FEE_FAIL: {
      return {
        ...state,
        error: action['payload'],
      };
    }

    case fromWithdrawActions.RESET_ADDITIONAL_FEE: {
      const id = action['payload'];
      let additionalFees = { ...state.additionalFees };

      if (id && additionalFees) {
        delete additionalFees[id];
        if (!Object.keys(additionalFees).length) {
          additionalFees = initialState.additionalFees;
        }
      } else {
        additionalFees = initialState.additionalFees;
      }

      return {
        ...state,
        additionalFees,
      };
    }

    case fromWithdrawActions.SELECT_INVENTORY_ITEMS: {
      return {
        ...state,
        selectedInventoryItems: action['payload'],
      };
    }

    case fromWithdrawActions.CREATE_WITHDRAWAL: {
      return {
        ...state,
        loading: { ...state.loading, create: true },
      };
    }

    case fromWithdrawActions.CREATE_WITHDRAWAL_SUCCESS: {
      return {
        ...state,
        loading: { ...state.loading, create: false },
        additionalFees: null
      };
    }

    case fromWithdrawActions.CREATE_WITHDRAWAL_FAIL: {
      return {
        ...state,
        loading: { ...state.loading, create: false },
      };
    }

    case fromWithdrawActions.LOAD_WITHDRAWALS: {
      return {
        ...state,
        loading: { ...state.loading, withdraw: true },
        loaded: false
      };
    }

    case fromWithdrawActions.LOAD_WITHDRAWALS_SUCCESS: {
      return {
        ...state,
        withdrawals: action['payload'],
        loading: { ...state.loading, withdraw: false },
        loaded: true,
        error: ''
      };
    }

    case fromWithdrawActions.LOAD_WITHDRAWALS_FAIL: {
      return {
        ...state,
        loading: { ...state.loading, withdraw: false },
        loaded: true,
        error: action['payload']
      };
    }

    default: {
      return state;
    }
  }
}

export const getIsLoading: any = (state: WithdrawState): any => state.loading;

export const getAddWithdrawModalOpened: any = (state: WithdrawState): boolean => state.addWithdrawModalOpened;

export const getInventoryItems: any = (state: WithdrawState): InventoryItemsModel[] => state.inventoryItems;
export const getSelectedInventoryItems: any = (state: WithdrawState): InventoryItemsModel[] => state.selectedInventoryItems;
export const getAdditionalFees: any = (state: WithdrawState): any => state.additionalFees;

export const getWithdrawals: any = (state: WithdrawState): WithdrawalsModel[] => state.withdrawals;
