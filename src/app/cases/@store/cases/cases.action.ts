import { Action } from '@ngrx/store';

import { Pagination } from 'src/app/shared/models/pagination';
import { CaseModel, CasesType, CaseUnboxModel, SpinnerItems, CaseViewItemModel } from 'src/app/cases/models';
import { SiteItemsModel, Filters } from 'src/app/shared/models';

export const LOAD_CASES = '[Cases] Load Cases';
export const LOAD_CASES_SUCCESS = '[Cases] Load Cases Success';
export const LOAD_CASES_FAIL = '[Cases] Load Cases Fail';

export class LoadCases implements Action {
  readonly type: string = LOAD_CASES;
  constructor(public payload: { caseType: CasesType, name?: string, pagination?: Pagination, filters?: Filters }) { }
}

export class LoadCasesSuccess implements Action {
  readonly type: string = LOAD_CASES_SUCCESS;
  constructor(public payload: { caseType: CasesType, cases: CaseModel[], total: number }) { }
}

export class LoadCasesFail implements Action {
  readonly type: string = LOAD_CASES_FAIL;
  constructor(public payload: any) { }
}

export const LOAD_CASE = '[Cases] Load Case';
export const LOAD_CASE_SUCCESS = '[Cases] Load Case Success';
export const LOAD_CASE_FAIL = '[Cases] Load Case Fail';

export class LoadCase implements Action {
  readonly type: string = LOAD_CASE;
  constructor(public payload: string) { }
}

export class LoadCaseSuccess implements Action {
  readonly type: string = LOAD_CASE_SUCCESS;
  constructor(public payload: { case: CaseModel }) { }
}

export class LoadCaseFail implements Action {
  readonly type: string = LOAD_CASE_FAIL;
  constructor(public payload: any) { }
}

export const LOAD_SPINNER_ITEMS = '[Cases] Load Spinner Items';
export const LOAD_SPINNER_ITEMS_SUCCESS = '[Cases] Load Spinner Items Success';
export const LOAD_SPINNER_ITEMS_FAIL = '[Cases] Load Spinner Items Fail';

export class LoadSpinnerItems implements Action {
  readonly type: string = LOAD_SPINNER_ITEMS;
  constructor(public payload: string) { }
}

export class LoadSpinnerItemsSuccess implements Action {
  readonly type: string = LOAD_SPINNER_ITEMS_SUCCESS;
  constructor(public payload: SpinnerItems) { }
}

export class LoadSpinnerItemsFail implements Action {
  readonly type: string = LOAD_SPINNER_ITEMS_FAIL;
  constructor(public payload: any) { }
}

export const LOAD_MY_CASES = '[Cases] Load My Cases';
export const LOAD_MY_CASES_SUCCESS = '[Cases] Load My Cases Success';
export const LOAD_MY_CASES_FAIL = '[Cases] Load My Cases Fail';

export class LoadMyCases implements Action {
  readonly type: string = LOAD_MY_CASES;
  constructor(public payload: { pagination: Pagination }) { }
}

export class LoadMyCasesSuccess implements Action {
  readonly type: string = LOAD_MY_CASES_SUCCESS;
  constructor(public payload: CaseModel[]) { }
}

export class LoadMyCasesFail implements Action {
  readonly type: string = LOAD_MY_CASES_FAIL;
  constructor(public payload: any) { }
}

export const LOAD_CASE_LOGOS = '[Cases] Load Case Logos';
export const LOAD_CASE_LOGOS_SUCCESS = '[Cases] Load Case Logos Success';
export const LOAD_CASE_LOGOS_FAIL = '[Cases] Load Case Logos Fail';

export class LoadCaseLogos implements Action {
  readonly type: string = LOAD_CASE_LOGOS;
}

export class LoadCaseLogosSuccess implements Action {
  readonly type: string = LOAD_CASE_LOGOS_SUCCESS;
  constructor(public payload: any) { }
}

export class LoadCaseLogosFail implements Action {
  readonly type: string = LOAD_CASE_LOGOS_FAIL;
  constructor(public payload: any) { }
}

export const CREATE_CASE = '[Cases] Create Case';
export const CREATE_CASE_SUCCESS = '[Cases] Create Case Success';
export const CREATE_CASE_FAIL = '[Cases] Create Case Fail';

export class CrateCase implements Action {
  readonly type: string = CREATE_CASE;
  constructor(public payload: CaseModel) { }
}

export class CrateCaseSuccess implements Action {
  readonly type: string = CREATE_CASE_SUCCESS;
  constructor(public payload: any) { }
}

export class CrateCaseFail implements Action {
  readonly type: string = CREATE_CASE_FAIL;
  constructor(public payload: any) { }
}

export const LOAD_SITE_ITEMS = '[Cases] Load Site Items';
export const LOAD_SITE_ITEMS_SUCCESS = '[Cases] Load Site Items Success';
export const LOAD_SITE_ITEMS_FAIL = '[Cases] Load Site Items Fail';

export class LoadSiteItems implements Action {
  readonly type: string = LOAD_SITE_ITEMS;
  constructor(public payload: { pagination: Pagination, filters?: Filters, search?: string, tag?: string }) { }
}

export class LoadSiteItemsSuccess implements Action {
  readonly type: string = LOAD_SITE_ITEMS_SUCCESS;
  constructor(public payload: SiteItemsModel[]) { }
}

export class LoadSiteItemsFail implements Action {
  readonly type: string = LOAD_SITE_ITEMS_FAIL;
  constructor(public payload: any) { }
}

export const CREAT_SITE_ITEMS = '[Cases] Create Site Items';
export const CREAT_SITE_ITEMS_SUCCESS = '[Cases] Create Site Items Success';
export const CREAT_SITE_ITEMS_FAIL = '[Cases] Createu Site Items Fail';

export class CreateSiteItems implements Action {
  readonly type: string = CREAT_SITE_ITEMS;
  constructor(public payload: SiteItemsModel) { }
}

export class CreateSiteItemsSuccess implements Action {
  readonly type: string = CREAT_SITE_ITEMS_SUCCESS;
  constructor(public payload: any) { }
}

export class CreateSiteItemsFail implements Action {
  readonly type: string = CREAT_SITE_ITEMS_FAIL;
  constructor(public payload: any) { }
}

export const GET_CASE_PRICE = '[Cases] Get Case Price';
export const RESET_CASE_PRICE = '[Cases] Reset Case Price';
export const GET_CASE_PRICE_SUCCESS = '[Cases] Get Case Price Success';
export const GET_CASE_PRICE_FAIL = '[Cases] Get Case Price Fail';

export class GetCasePrice implements Action {
  readonly type: string = GET_CASE_PRICE;
  constructor(public payload: any) { }
}

export class ResetCasePrice implements Action {
  readonly type: string = RESET_CASE_PRICE;
}

export class GetCasePriceSuccess implements Action {
  readonly type: string = GET_CASE_PRICE_SUCCESS;
  constructor(public payload: any) { }
}

export class GetCasePriceFail implements Action {
  readonly type: string = GET_CASE_PRICE_FAIL;
  constructor(public payload: any) { }
}

export const OPEN_UNBOX_MODAL = '[Cases] Open Unbox Modal';
export const CLOSE_UNBOX_MODAL = '[Cases] Close Unbox Modal';

export class OpenUnboxModal implements Action {
  readonly type: string = OPEN_UNBOX_MODAL;
}

export class CloseUnboxModal implements Action {
  readonly type: string = CLOSE_UNBOX_MODAL;
}

export const UNBOX_CASE = '[Cases] Unbox Case';
export const UNBOX_CASE_SUCCESS = '[Cases] Unbox Case Success';
export const UNBOX_CASE_FAIL = '[Cases] Unbox Case Fail';

export class UnboxCase implements Action {
  readonly type: string = UNBOX_CASE;
  constructor(public payload: CaseUnboxModel) { }
}

export class UnboxCaseSuccess implements Action {
  readonly type: string = UNBOX_CASE_SUCCESS;
  constructor(public payload: any) { }
}

export class UnboxCaseFail implements Action {
  readonly type: string = UNBOX_CASE_FAIL;
  constructor(public payload: any) { }
}

export const RESET_UNBOXING_CASE = '[Cases] Reset Unboxing Case';

export class ResetUnboxingCase implements Action {
  readonly type: string = RESET_UNBOXING_CASE;
}

export const ROLL_AN_UNBOXING = '[Cases] Roll An Unboxing';

export class RollAnUnboxing implements Action {
  readonly type: string = ROLL_AN_UNBOXING;
  constructor(public payload: any[]) { }
}

export const SELL_ITEMS = '[Cases] Sell Items';
export const SELL_ITEMS_SUCCESS = '[Cases] Sell Items Success';
export const SELL_ITEMS_FAIL = '[Cases] Sell Items Fail';

export class SellItems implements Action {
  readonly type: string = SELL_ITEMS;
  constructor(public payload: string[]) { }
}

export class SellItemsSuccess implements Action {
  readonly type: string = SELL_ITEMS_SUCCESS;
}

export class SellItemsFail implements Action {
  readonly type: string = SELL_ITEMS_FAIL;
  constructor(public payload: any) { }
}

export const DELETE_CASE = '[Cases] Delete Case';
export const DELETE_CASE_SUCCESS = '[Cases] Delete Case Success';
export const DELETE_CASE_FAIL = '[Cases] Delete Case Fail';

export class DeleteCase implements Action {
  readonly type: string = DELETE_CASE;
  constructor(public payload: string) { }
}

export class DeleteCaseSuccess implements Action {
  readonly type: string = DELETE_CASE_SUCCESS;
  constructor(public payload: any) { }
}

export class DeleteCaseFail implements Action {
  readonly type: string = DELETE_CASE_FAIL;
  constructor(public payload: any) { }
}

export const EDIT_CASE = '[Cases] Edit Case';
export const EDIT_CASE_SUCCESS = '[Cases] Edit Case Success';
export const EDIT_CASE_FAIL = '[Cases] Edit Case Fail';

export class EditCase implements Action {
  readonly type: string = EDIT_CASE;
  constructor(public payload: { id: string; editedCase: CaseModel }) { }
}

export class EditCaseSuccess implements Action {
  readonly type: string = EDIT_CASE_SUCCESS;
  constructor(public payload: CaseModel) { }
}

export class EditCaseFail implements Action {
  readonly type: string = EDIT_CASE_FAIL;
  constructor(public payload: any) { }
}

export const ADD_CASE_CATEGORY = '[Cases] Add Case Category';
export const ADD_CASE_CATEGORY_SUCCESS = '[Cases] Add Case Category Success';
export const ADD_CASE_CATEGORY_FAIL = '[Cases] Add Case Category Fail';

export class AddCaseCategory implements Action {
  readonly type: string = ADD_CASE_CATEGORY;
  constructor(public payload: { caseId: string; category: CasesType }) { }
}

export class AddCaseCategorySuccess implements Action {
  readonly type: string = ADD_CASE_CATEGORY_SUCCESS;
}

export class AddCaseCategoryFail implements Action {
  readonly type: string = ADD_CASE_CATEGORY_FAIL;
  constructor(public payload: any) { }
}

export const REMOVE_CASE_CATEGORY = '[Cases] Remove Case Category';
export const REMOVE_CASE_CATEGORY_SUCCESS = '[Cases] Remove Case Category Success';
export const REMOVE_CASE_CATEGORY_FAIL = '[Cases] Add Remove Category Fail';

export class RemoveCaseCategory implements Action {
  readonly type: string = REMOVE_CASE_CATEGORY;
  constructor(public payload: { caseId: string; category: CasesType }) { }
}

export class RemoveCaseCategorySuccess implements Action {
  readonly type: string = REMOVE_CASE_CATEGORY_SUCCESS;
}

export class RemoveCaseCategoryFail implements Action {
  readonly type: string = REMOVE_CASE_CATEGORY_FAIL;
  constructor(public payload: any) { }
}

export const OPEN_DESCRIPTION_MODAL = '[Cases] Open Description Modal';
export const CLOSE_DESCRIPTION_MODAL = '[Cases] Close Description Modal';

export class OpenDescriptionModal implements Action {
  readonly type: string = OPEN_DESCRIPTION_MODAL;
}

export class CloseDescriptionModal implements Action {
  readonly type: string = CLOSE_DESCRIPTION_MODAL;
}

export const CLAIM_EARNINGS = '[Cases] Claim Earnings';
export const CLAIM_EARNINGS_SUCCESS = '[Cases] Claim Earnings Success';
export const CLAIM_EARNINGS_FAIL = '[Cases] Claim Earnings Fail';

export class ClaimEarnings implements Action {
  readonly type: string = CLAIM_EARNINGS;
}

export class ClaimEarningsSuccess implements Action {
  readonly type: string = CLAIM_EARNINGS_SUCCESS;
  constructor(public payload: any) { }
}

export class ClaimEarningsFail implements Action {
  readonly type: string = CLAIM_EARNINGS_FAIL;
  constructor(public payload: any) { }
}

export const SEARCH_CASE = '[Cases] Search Case';

export class SearchCase implements Action {
  readonly type: string = SEARCH_CASE;
  constructor(public payload: string) { }
}

export const SET_CASE_COUNT = '[Cases] Set Case Count';

export class SetCaseCount implements Action {
  readonly type: string = SET_CASE_COUNT;
  constructor(public payload: number) { }
}

export const GET_ITEM_DETAILS = '[Cases] Get Item Details';
export const GET_ITEM_DETAILS_SUCCESS = '[Cases] Get Item Details Success';
export const GET_ITEM_DETAILS_FAIL = '[Cases] Get Item Details Fail';

export class GetItemDetails implements Action {
  readonly type: string = GET_ITEM_DETAILS;
  constructor(public payload: string) { }
}

export class GetItemDetailsSuccess implements Action {
  readonly type: string = GET_ITEM_DETAILS_SUCCESS;
  constructor(public payload: CaseViewItemModel) { }
}

export class GetItemDetailsFail implements Action {
  readonly type: string = GET_ITEM_DETAILS_FAIL;
  constructor(public payload: any) { }
}

export const CASE_OPENED = '[Cases] Case opened';

export class CaseOpened implements Action {
  readonly type: string = CASE_OPENED;
  constructor(public payload: string) { }
}

export const SET_BACK_HISTORY = '[Cases] Set Back History';

export class SetBackHistory implements Action {
  readonly type: string = SET_BACK_HISTORY;
  constructor(public payload: { caseType: CasesType, pagination: Pagination, scrollHeight: number }) { }
}

export const SET_CASE_TYPE = '[Cases] Set Case Type';

export class SetCaseType implements Action {
  readonly type: string = SET_CASE_TYPE;
  constructor(public payload: CasesType) { }
}

export const ODD_TABLE_LOADING = '[Cases] Odd Table Loading';

export class OddTableLoading implements Action {
  readonly type: string = ODD_TABLE_LOADING;
  constructor(public payload: boolean) { }
}

export type CasesActions =
  | LoadCases
  | LoadCasesSuccess
  | LoadCasesFail
  | LoadCase
  | LoadCaseSuccess
  | LoadCaseFail
  | LoadSpinnerItems
  | LoadSpinnerItemsSuccess
  | LoadSpinnerItemsFail
  | LoadMyCases
  | LoadMyCasesSuccess
  | LoadMyCasesFail
  | LoadCaseLogos
  | LoadCaseLogosSuccess
  | LoadCaseLogosFail
  | CrateCase
  | CrateCaseSuccess
  | CrateCaseFail
  | LoadSiteItems
  | LoadSiteItemsSuccess
  | LoadSiteItemsFail
  | CreateSiteItems
  | CreateSiteItemsSuccess
  | CreateSiteItemsFail
  | GetCasePrice
  | ResetCasePrice
  | GetCasePriceSuccess
  | GetCasePriceFail
  | OpenUnboxModal
  | CloseUnboxModal
  | UnboxCase
  | UnboxCaseSuccess
  | UnboxCaseFail
  | RollAnUnboxing
  | SellItems
  | SellItemsSuccess
  | SellItemsFail
  | DeleteCase
  | DeleteCaseSuccess
  | DeleteCaseFail
  | OpenDescriptionModal
  | CloseDescriptionModal
  | ClaimEarnings
  | ClaimEarningsSuccess
  | ClaimEarningsFail
  | SearchCase
  | SetCaseCount
  | GetItemDetails
  | GetItemDetailsSuccess
  | GetItemDetailsFail
  | CaseOpened
  | SetBackHistory
  | EditCase
  | EditCaseSuccess
  | EditCaseFail
  | AddCaseCategory
  | AddCaseCategorySuccess
  | AddCaseCategoryFail
  | RemoveCaseCategory
  | RemoveCaseCategorySuccess
  | RemoveCaseCategoryFail
  | OddTableLoading
  | SetCaseType;
