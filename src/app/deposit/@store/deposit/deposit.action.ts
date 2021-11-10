import { Action } from '@ngrx/store';

export const LOAD_STEAM_ITEMS = '[Deposit] Load Steam Items';
export const LOAD_STEAM_ITEMS_SUCCESS = '[Deposit] Load Steam Items Success';
export const LOAD_STEAM_ITEMS_FAIL = '[Deposit] Load Steam Items Fail';

export class LoadSteamItems implements Action {
  readonly type: string = LOAD_STEAM_ITEMS;
  constructor(public payload: any) { }
}

export class LoadSteamItemsSuccess implements Action {
  readonly type: string = LOAD_STEAM_ITEMS_SUCCESS;
  constructor(public payload: any) { }
}

export class LoadSteamItemsFail implements Action {
  readonly type: string = LOAD_STEAM_ITEMS_FAIL;
  constructor(public payload: any) { }
}

export const PROCEED_DEPOSIT = '[Deposit] Proceed Deposit';
export const PROCEED_DEPOSIT_SUCCESS = '[Deposit] Proceed Deposit Success';
export const PROCEED_DEPOSIT_FAIL = '[Deposit] Proceed Deposit Fail';

export class ProceedDeposit implements Action {
  readonly type: string = PROCEED_DEPOSIT;
  constructor(public payload: any) { }
}

export class ProceedDepositSuccess implements Action {
  readonly type: string = PROCEED_DEPOSIT_SUCCESS;
  constructor(public payload: string) { }
}

export class ProceedDepositFail implements Action {
  readonly type: string = PROCEED_DEPOSIT_FAIL;
  constructor(public payload: any) { }
}

export const SET_SUCCESS_STATUS = '[Deposit] Set Success Status';
export const SET_FAIL_STATUS = '[Deposit] Set Fail Status';

export class SetSuccessStatus implements Action {
  readonly type: string = SET_SUCCESS_STATUS;
}

export class SetFailStatus implements Action {
  readonly type: string = SET_FAIL_STATUS;
  constructor(public payload: string) { }
}

export type DepositActions =
  | LoadSteamItems
  | LoadSteamItemsSuccess
  | LoadSteamItemsFail
  | ProceedDeposit
  | ProceedDepositSuccess
  | ProceedDepositFail
  | SetSuccessStatus
  | SetFailStatus;
