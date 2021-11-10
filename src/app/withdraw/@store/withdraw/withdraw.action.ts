import { Action } from '@ngrx/store';
import { InventoryItemsModel, Pagination, Filters } from 'src/app/shared/models';
import { WithdrawalQueryModel } from 'src/app/withdraw/models';
import { WithdrawalsModel } from 'src/app/withdraw/models';

export const OPEN_ADD_WITHDRAW_MODAL = '[Withdraw] Open Add Withdraw Modal';
export const CLOSE_ADD_WITHDRAW_MODAL = '[Withdraw] Close Add Withdraw Modal';

export class OpenAddWithdrawModal implements Action {
  readonly type: string = OPEN_ADD_WITHDRAW_MODAL;
}

export class CloseAddWithdrawModal implements Action {
  readonly type: string = CLOSE_ADD_WITHDRAW_MODAL;
}

export const CREATE_WITHDRAWAL = '[Upgrade] Create Withdrawal';
export const CREATE_WITHDRAWAL_SUCCESS = '[Upgrade] Create Withdrawal Success';
export const CREATE_WITHDRAWAL_FAIL = '[Upgrade] Create Withdrawal Fail';

export class CreateWithdrawal implements Action {
  readonly type: string = CREATE_WITHDRAWAL;
  constructor(public payload: WithdrawalQueryModel) { }
}

export class CreateWithdrawalSuccess implements Action {
  readonly type: string = CREATE_WITHDRAWAL_SUCCESS;
}

export class CreateWithdrawalFail implements Action {
  readonly type: string = CREATE_WITHDRAWAL_FAIL;
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

export const GET_ADDITIONAL_FEE = '[Upgrade] Get Additional Fee';
export const GET_ADDITIONAL_FEE_SUCCESS = '[Upgrade] Get Additional Fee Success';
export const GET_ADDITIONAL_FEE_FAIL = '[Upgrade] Get Additional Fee Fail';
export const RESET_ADDITIONAL_FEE = '[Upgrade] Reset Additional Fee';

export class GetAdditionalFee implements Action {
  readonly type: string = GET_ADDITIONAL_FEE;
  constructor(public payload: any) { }
}

export class GetAdditionalFeeSuccess implements Action {
  readonly type: string = GET_ADDITIONAL_FEE_SUCCESS;
  constructor(public payload: any) { }
}

export class GetAdditionalFeeFail implements Action {
  readonly type: string = GET_ADDITIONAL_FEE_FAIL;
  constructor(public payload: any) { }
}

export class ResetAdditionalFee implements Action {
  readonly type: string = RESET_ADDITIONAL_FEE;
  constructor(public payload?: string) { }
}

export const SELECT_INVENTORY_ITEMS = '[Withdraw] Select Inventory Items';

export class SelectInventoryItems implements Action {
  readonly type: string = SELECT_INVENTORY_ITEMS;
  constructor(public payload: InventoryItemsModel[]) { }
}

export const LOAD_WITHDRAWALS = '[Account] Load Withdrawals';
export const LOAD_WITHDRAWALS_SUCCESS = '[Account] Load Withdrawals Success';
export const LOAD_WITHDRAWALS_FAIL = '[Account] Load Withdrawals Fail';

export class LoadWithdrawals implements Action {
  readonly type: string = LOAD_WITHDRAWALS;
  constructor(public payload: { pagination: Pagination }) { }
}

export class LoadWithdrawalsSuccess implements Action {
  readonly type: string = LOAD_WITHDRAWALS_SUCCESS;
  constructor(public payload: WithdrawalsModel[]) { }
}

export class LoadWithdrawalsFail implements Action {
  readonly type: string = LOAD_WITHDRAWALS_FAIL;
  constructor(public payload: any) { }
}

export type WithdrawActions =
  | OpenAddWithdrawModal
  | CloseAddWithdrawModal
  | CreateWithdrawal
  | CreateWithdrawalSuccess
  | CreateWithdrawalFail
  | LoadInventoryItems
  | LoadInventoryItemsSuccess
  | LoadInventoryItemsFail
  | GetAdditionalFee
  | GetAdditionalFeeSuccess
  | GetAdditionalFeeFail
  | ResetAdditionalFee
  | SelectInventoryItems
  | LoadWithdrawals
  | LoadWithdrawalsSuccess
  | LoadWithdrawalsFail;
