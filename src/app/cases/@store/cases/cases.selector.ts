import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from 'src/app/@store';
import * as fromCases from './cases.reducer';
import * as fromCasesReducer from '../reducer';

import {
  CaseModel,
  CaseType,
  CaseUnboxingModel,
  SpinnerItems,
  CaseViewItemModel
} from 'src/app/cases/models';
import { SiteItemsModel } from 'src/app/shared/models';

import { initialState } from './cases.reducer';

export const selectCasesState: MemoizedSelector<
  fromRoot.State,
  fromCases.CasesState
> = createSelector(
  fromCasesReducer.getCasesFeatureState,
  (state: fromCasesReducer.CasesFeatureState) => state ? state.cases : initialState
);

export const selectLoaded: MemoizedSelector<
  fromRoot.State,
  boolean
> = createSelector(selectCasesState, fromCases.getLoaded);

export const selectCases: MemoizedSelector<
  fromRoot.State,
  { total: number, caseType: CaseType, cases: CaseModel[] }
> = createSelector(selectCasesState, fromCases.getCases);

export const selectCaseType: MemoizedSelector<
  fromRoot.State,
  CaseType
> = createSelector(selectCasesState, fromCases.getCaseType);

export const selectCase: MemoizedSelector<
  fromRoot.State,
  CaseModel
> = createSelector(selectCasesState, fromCases.getCase);

export const selectSpinnerItems: MemoizedSelector<
  fromRoot.State,
  SpinnerItems
> = createSelector(selectCasesState, fromCases.getSpinnerItems);

export const selectMyCases: MemoizedSelector<
  fromRoot.State,
  { cases: CaseModel[], totalCount: number }
> = createSelector(selectCasesState, fromCases.getMyCases);

export const selectMyCases_: MemoizedSelector<
  fromRoot.State,
  any
> = createSelector(selectCasesState, fromCases.getMyCases_);

export const selectCaseLogos: MemoizedSelector<
  fromRoot.State,
  string[]
> = createSelector(selectCasesState, fromCases.getCaseLogos);

export const selectCasePrice: MemoizedSelector<
  fromRoot.State,
  number
> = createSelector(selectCasesState, fromCases.getCasePrice);

export const selectCasesPrices: MemoizedSelector<
  fromRoot.State,
  any[]
> = createSelector(selectCasesState, fromCases.getCasesPrices);

export const selectSiteItems: MemoizedSelector<
  fromRoot.State,
  SiteItemsModel[]
> = createSelector(selectCasesState, fromCases.getSiteItems);

export const selectUnboxModalOpened: MemoizedSelector<
  fromRoot.State,
  boolean
> = createSelector(selectCasesState, fromCases.getUnboxModalOpened);

export const selectUnboxingCase: MemoizedSelector<
  fromRoot.State,
  CaseUnboxingModel
> = createSelector(selectCasesState, fromCases.getUnboxingCase);

export const selectDescriptionModalOpened: MemoizedSelector<
  fromRoot.State,
  boolean
> = createSelector(selectCasesState, fromCases.getDescriptionModalOpened);

export const selectWinItems: MemoizedSelector<
  fromRoot.State,
  any[]
> = createSelector(selectCasesState, fromCases.getWinItems);

export const selectCheapestCase: MemoizedSelector<
  fromRoot.State,
  number
> = createSelector(selectCasesState, fromCases.getCheapestCase);

export const selectSearch: MemoizedSelector<
  fromRoot.State,
  string
> = createSelector(selectCasesState, fromCases.getSearch);

export const selectCaseCount: MemoizedSelector<
  fromRoot.State,
  number
> = createSelector(selectCasesState, fromCases.getCaseCount);

export const selectItemDetails: MemoizedSelector<
  fromRoot.State,
  CaseViewItemModel
> = createSelector(selectCasesState, fromCases.getItemDetails);

export const selectBackHistory: MemoizedSelector<
  fromRoot.State,
  any
> = createSelector(selectCasesState, fromCases.getBackHistory);

export const selectOddTableLoading: MemoizedSelector<
  fromRoot.State,
  boolean
> = createSelector(selectCasesState, fromCases.getOddTableLoading);

export const selectLoading: MemoizedSelector<
  fromRoot.State,
  boolean
> = createSelector(selectCasesState, fromCases.getLoading);
