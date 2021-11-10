import { unionBy } from 'lodash';

import * as fromCasesActions from './cases.action';
import {
  CaseModel,
  CaseType,
  CaseUnboxingModel,
  SpinnerItems,
  CaseViewItemModel
} from 'src/app/cases/models';
import { SiteItemsModel } from 'src/app/shared/models';

export class CasesState {
  caseType: CaseType;
  allCases: CaseModel[];
  total: number;
  myCases: CaseModel[];
  case: CaseModel;
  spinnerItems: SpinnerItems;
  caseLogos: string[];
  casePrice: { price: number; items: any[] };
  siteItems: SiteItemsModel[];
  unboxModalOpened: boolean;
  unboxingCase: CaseUnboxingModel;
  caseCount: number;
  myCaseCount: number;
  descriptionModalOpened: boolean;
  itemDetails: CaseViewItemModel;
  cheapestCase: number;
  winItems: [];
  search: string;
  backHistory: any;
  oddLoading: boolean;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const initialState: CasesState = {
  allCases: [],
  total: 0,
  caseType: CaseType.official,
  myCases: [],
  case: null,
  spinnerItems: null,
  caseLogos: [],
  casePrice: { price: 0, items: [] },
  siteItems: [],
  unboxModalOpened: false,
  unboxingCase: null,
  caseCount: 1,
  myCaseCount: 0,
  descriptionModalOpened: false,
  itemDetails: null,
  cheapestCase: null,
  winItems: [],
  search: '',
  backHistory: null,
  oddLoading: false,
  loading: false,
  loaded: true,
  error: ''
};

export function casesReducer(
  state: CasesState = initialState,
  action: fromCasesActions.CasesActions
): CasesState {
  switch (action.type) {
    case fromCasesActions.LOAD_CASES: {
      return {
        ...state,
        caseType: action['payload']['caseType'],
        loading: true,
        loaded: false
      };
    }

    case fromCasesActions.LOAD_CASES_SUCCESS: {
      return {
        ...state,
        allCases: unionBy(state.allCases, action['payload']['cases'], '_id'),
        total: action['payload']['total'],
        loading: false,
        loaded: true,
        error: ''
      };
    }

    case fromCasesActions.LOAD_CASES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromCasesActions.LOAD_CASE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCasesActions.LOAD_CASE_SUCCESS: {
      return {
        ...state,
        case: action['payload'].case,
        loading: false,
        loaded: true,
        error: ''
      };
    }

    case fromCasesActions.LOAD_CASE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromCasesActions.LOAD_SPINNER_ITEMS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCasesActions.LOAD_SPINNER_ITEMS_SUCCESS: {
      return {
        ...state,
        spinnerItems: action['payload'],
        loading: false,
        loaded: true,
        error: ''
      };
    }

    case fromCasesActions.LOAD_SPINNER_ITEMS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromCasesActions.LOAD_MY_CASES: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCasesActions.LOAD_MY_CASES_SUCCESS: {
      return {
        ...state,
        myCases: action['payload']['data'],
        myCaseCount: action['payload']['total'],
        loading: false,
        loaded: true,
        error: ''
      };
    }

    case fromCasesActions.LOAD_MY_CASES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromCasesActions.LOAD_CASE_LOGOS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCasesActions.LOAD_CASE_LOGOS_SUCCESS: {
      return {
        ...state,
        caseLogos: action['payload'],
        loading: false,
        loaded: true,
        error: ''
      };
    }

    case fromCasesActions.LOAD_CASE_LOGOS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromCasesActions.LOAD_SITE_ITEMS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCasesActions.LOAD_SITE_ITEMS_SUCCESS: {
      return {
        ...state,
        siteItems: action['payload'],
        loading: false,
        loaded: true,
        error: ''
      };
    }

    case fromCasesActions.LOAD_SITE_ITEMS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromCasesActions.GET_CASE_PRICE: {
      return {
        ...state
      };
    }

    case fromCasesActions.RESET_CASE_PRICE: {
      return {
        ...state,
        casePrice: initialState.casePrice,
        oddLoading: false,
        error: ''
      };
    }

    case fromCasesActions.GET_CASE_PRICE_SUCCESS: {
      return {
        ...state,
        casePrice: action['payload'],
        oddLoading: false,
        error: ''
      };
    }

    case fromCasesActions.GET_CASE_PRICE_FAIL: {
      return {
        ...state,
        error: action['payload']
      };
    }

    case fromCasesActions.OPEN_UNBOX_MODAL: {
      return {
        ...state,
        unboxModalOpened: true
      };
    }

    case fromCasesActions.CLOSE_UNBOX_MODAL: {
      return {
        ...state,
        unboxModalOpened: false
      };
    }

    case fromCasesActions.UNBOX_CASE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCasesActions.UNBOX_CASE_SUCCESS: {
      return {
        ...state,
        unboxingCase: action['payload'],
        loading: false,
        loaded: true,
        error: ''
      };
    }

    case fromCasesActions.UNBOX_CASE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromCasesActions.RESET_UNBOXING_CASE: {
      return {
        ...state,
        unboxingCase: initialState.unboxingCase
      };
    }

    case fromCasesActions.ROLL_AN_UNBOXING: {
      return {
        ...state,
        winItems: action['payload'],
        loading: false,
        loaded: true,
        error: ''
      };
    }

    case fromCasesActions.DELETE_CASE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCasesActions.DELETE_CASE_SUCCESS: {
      const deleteId = action['payload'];
      let myCases = state.myCases.slice();
      myCases = myCases.filter(myCase => myCase._id !== deleteId);

      return {
        ...state,
        myCases,
        myCaseCount: state.myCaseCount - 1,
        loading: false,
        loaded: true,
        error: ''
      };
    }

    case fromCasesActions.DELETE_CASE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromCasesActions.EDIT_CASE: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCasesActions.EDIT_CASE_SUCCESS: {
      const editedCase = action['payload'] as CaseModel;
      const allCases = state.allCases.map(c => c._id === editedCase._id ? editedCase : c);


      const spinnerItems = state.spinnerItems
        ? { ...state.spinnerItems }
        : null;
      if (spinnerItems && spinnerItems.caseInfo._id === editedCase._id) {
        spinnerItems.caseInfo = {
          ...spinnerItems.caseInfo,
          caseTypes: editedCase.caseTypes,
          name: editedCase.name,
          price: editedCase.price,
          slug: editedCase.slug
        };
      }

      return {
        ...state,
        allCases,
        spinnerItems,
        case: editedCase,
        loading: false,
        loaded: true,
        error: ''
      };
    }

    case fromCasesActions.EDIT_CASE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromCasesActions.ADD_CASE_CATEGORY: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCasesActions.ADD_CASE_CATEGORY_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromCasesActions.REMOVE_CASE_CATEGORY: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCasesActions.REMOVE_CASE_CATEGORY_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action['payload']
      };
    }

    case fromCasesActions.OPEN_DESCRIPTION_MODAL: {
      return {
        ...state,
        descriptionModalOpened: true
      };
    }

    case fromCasesActions.CLOSE_DESCRIPTION_MODAL: {
      return {
        ...state,
        descriptionModalOpened: false
      };
    }

    case fromCasesActions.SEARCH_CASE: {
      return {
        ...state,
        search: action['payload']
      };
    }

    case fromCasesActions.SET_CASE_COUNT: {
      return {
        ...state,
        caseCount: action['payload']
      };
    }

    case fromCasesActions.GET_ITEM_DETAILS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCasesActions.GET_ITEM_DETAILS_SUCCESS: {
      return {
        ...state,
        itemDetails: action['payload'],
        loading: false,
        loaded: true
      };
    }

    case fromCasesActions.GET_ITEM_DETAILS_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loading: false,
        loaded: true
      };
    }

    case fromCasesActions.CASE_OPENED: {
      const myCases = [...state.myCases].map(_case => {
        if (_case._id === action['payload']) {
          return {
            ..._case,
            unboxCounts: _case.unboxCounts + 1
          };
        }

        return _case;
      });

      return {
        ...state,
        myCases,
        loading: false,
        loaded: true
      };
    }

    case fromCasesActions.SET_BACK_HISTORY: {
      return {
        ...state,
        backHistory: action['payload']
      };
    }

    case fromCasesActions.SELL_ITEMS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case fromCasesActions.SELL_ITEMS_SUCCESS:
    case fromCasesActions.SELL_ITEMS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }

    case fromCasesActions.ODD_TABLE_LOADING: {
      return {
        ...state,
        oddLoading: action['payload']
      };
    }

    case fromCasesActions.SET_CASE_TYPE: {
      return {
        ...state,
        caseType: action['payload']
      };
    }

    default: {
      return state;
    }
  }
}

export const getCasesState: any = (state: CasesState): CasesState => state;

export const getLoaded: any = (state: CasesState): boolean => state.loaded;

export const getCases: any = (state: CasesState): any => {
  const cases = state.allCases.filter(
    (c) => 
      !!c.caseTypes &&
      c.caseTypes.indexOf(state.caseType) >= 0 &&
      c.name.toLowerCase().indexOf(state.search.toLowerCase()) >= 0
  );

  return {
    cases,
    caseType: state.caseType,
    total: state.total,
  };
}
export const getCase: any = (state: CasesState): CaseModel => state.case;
export const getMyCases: any = (state: CasesState): { cases: CaseModel[], totalCount: number } => ({
  cases: state.myCases,
  totalCount: state.myCaseCount
});

export const getMyCases_: any = (state: CasesState): CaseModel[] =>
  state.myCases;

export const getSpinnerItems: any = (state: CasesState): SpinnerItems =>
  state.spinnerItems;

export const getCasePrice: any = (state: CasesState): number =>
  state.casePrice.price;
export const getCasesPrices: any = (state: CasesState): any[] =>
  state.casePrice.items;
export const getCaseLogos: any = (state: CasesState): string[] =>
  state.caseLogos;
export const getSiteItems: any = (state: CasesState): SiteItemsModel[] =>
  state.siteItems;

export const getUnboxModalOpened: any = (state: CasesState): boolean =>
  state.unboxModalOpened;
export const getUnboxingCase: any = (state: CasesState): CaseUnboxingModel =>
  state.unboxingCase;

export const getDescriptionModalOpened: any = (state: CasesState): boolean =>
  state.descriptionModalOpened;

export const getWinItems: any = (state: CasesState): any[] => state.winItems;

export const getCheapestCase: any = (state: CasesState): number =>
  state.cheapestCase;

export const getSearch: any = (state: CasesState): string => state.search;
export const getCaseCount: any = (state: CasesState): number => state.caseCount;

export const getItemDetails: any = (state: CasesState): CaseViewItemModel =>
  state.itemDetails;

export const getBackHistory: any = (state: CasesState): any =>
  state.backHistory;

export const getOddTableLoading: any = (state: CasesState): boolean =>
  state.oddLoading;

  export const getLoading: any = (state: CasesState): boolean =>
  state.loading;

export const getCaseType: any = (state: CasesState): CaseType =>
  state.caseType;
