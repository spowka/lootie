import * as fromUpgradeActions from './upgrade.action';
import { UpgradingModel, UpgradeConfigModel } from 'src/app/upgrade/models';
import { SiteItemsModel, InventoryItemsModel } from 'src/app/shared/models';

export class UpgradeState {
  inventoryModalOpened: boolean;
  siteItems: SiteItemsModel[];
  selectedSiteItems: SiteItemsModel[];
  inventoryItems: InventoryItemsModel[];
  selectedInventoryItems: InventoryItemsModel[];
  config: UpgradeConfigModel;
  upgrades: UpgradingModel[];
  upgrading: UpgradingModel;
  upgradingResult: any;
  loaded: boolean;
  loading: boolean;
  error: string;
}

const initialState: UpgradeState = {
  inventoryModalOpened: false,
  siteItems: [],
  selectedSiteItems: [],
  inventoryItems: [],
  selectedInventoryItems: [],
  config: {
    multiplier: 2,
    selectedMultiplier: 2,
    winChanceDirection: 'DOWN'
  },
  upgrades: [],
  upgrading: null,
  upgradingResult: null,
  loaded: true,
  loading: false,
  error: '',
};

export function upgradeReducer(
  state: UpgradeState = initialState,
  action: fromUpgradeActions.UpgradeActions
): UpgradeState {
  switch (action.type) {
    case fromUpgradeActions.OPEN_INVENTORY_MODAL: {
      return {
        ...state,
        inventoryModalOpened: true
      };
    }

    case fromUpgradeActions.CLOSE_INVENTORY_MODAL: {
      return {
        ...state,
        inventoryModalOpened: false
      };
    }

    case fromUpgradeActions.LOAD_SITE_ITEMS: {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }

    case fromUpgradeActions.LOAD_SITE_ITEMS_SUCCESS: {
      return {
        ...state,
        siteItems: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromUpgradeActions.LOAD_SITE_ITEMS_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromUpgradeActions.SELECT_SITE_ITEMS: {
      return {
        ...state,
        selectedSiteItems: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromUpgradeActions.LOAD_INVENTORY_ITEMS: {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }

    case fromUpgradeActions.LOAD_INVENTORY_ITEMS_SUCCESS: {
      return {
        ...state,
        inventoryItems: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromUpgradeActions.LOAD_INVENTORY_ITEMS_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loaded: true,
        loading: false,
      };
    }


    case fromUpgradeActions.LOAD_UPGRADES: {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }

    case fromUpgradeActions.LOAD_UPGRADES_SUCCESS: {
      return {
        ...state,
        upgrades: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromUpgradeActions.LOAD_UPGRADES_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromUpgradeActions.ADD_LATEST_UPGRADE: {
      const newCase = action['payload'];
      const upgrades = state.upgrades.slice();
      if (upgrades.length >= 30) {
        upgrades.pop();
      }
      upgrades.unshift(newCase);

      return {
        ...state,
        upgrades,
        loading: false,
      };
    }

    case fromUpgradeActions.SELECT_INVENTORY_ITEMS: {
      return {
        ...state,
        selectedInventoryItems: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromUpgradeActions.UPDATE_INVENTORY_ITEMS: {
      const removeItems = action['payload'].remove;
      const addItems = action['payload'].add;

      let inventoryItems = state.inventoryItems;

      removeItems.map(item => {
        inventoryItems = inventoryItems.filter(inventoryItem => {
          return inventoryItem._id !== item._id;
        });
      });

      addItems.map((item) => {
        inventoryItems.push(item);
      });

      return {
        ...state,
        inventoryItems,
        loaded: true,
        loading: false,
      };
    }

    case fromUpgradeActions.CREATE_UPGRADE: {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }

    case fromUpgradeActions.CREATE_UPGRADE_SUCCESS: {
      return {
        ...state,
        upgrading: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromUpgradeActions.CREATE_UPGRADE_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromUpgradeActions.ROLL_AN_UPGRADE: {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }

    case fromUpgradeActions.ROLL_AN_UPGRADE_SUCCESS: {
      return {
        ...state,
        upgradingResult: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromUpgradeActions.ROLL_AN_UPGRADE_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromUpgradeActions.RESET_UPGRADE: {
      return {
        ...state,
        upgrading: initialState.upgrading,
      };
    }

    case fromUpgradeActions.DELETE_UPGRADE: {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }

    case fromUpgradeActions.DELETE_UPGRADE_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        upgrading: initialState.upgrading,
      };
    }

    case fromUpgradeActions.DELETE_UPGRADE_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromUpgradeActions.UPDATE_CONFIG: {
      return {
        ...state,
        config: action['payload'],
      };
    }

    case fromUpgradeActions.GET_SUGGEST_ITEM: {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }

    case fromUpgradeActions.GET_SUGGEST_ITEM_SUCCESS: {
      return {
        ...state,
        selectedSiteItems: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromUpgradeActions.GET_SUGGEST_ITEM_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getIsLoading: any = (state: UpgradeState): boolean => state.loading;

export const getInventoryModalOpened: any = (state: UpgradeState): boolean => state.inventoryModalOpened;

export const getSiteItems: any = (state: UpgradeState): SiteItemsModel[] => state.siteItems;
export const getSelectedSiteItems: any = (state: UpgradeState): SiteItemsModel[] => state.selectedSiteItems;

export const getInventoryItems: any = (state: UpgradeState): InventoryItemsModel[] => state.inventoryItems;
export const getSelectedInventoryItems: any = (state: UpgradeState): InventoryItemsModel[] => state.selectedInventoryItems;

export const getUpgrades: any = (state: UpgradeState): UpgradingModel[] => state.upgrades;
export const getUpgrading: any = (state: UpgradeState): UpgradingModel => state.upgrading;
export const getUpgradingResult: any = (state: UpgradeState): any => state.upgradingResult;

export const getConfig: any = (state: UpgradeState): UpgradeConfigModel => state.config;
