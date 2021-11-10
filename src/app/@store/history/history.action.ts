import { Action } from '@ngrx/store';
import { Pagination, DepositModel } from 'src/app/shared/models';
import { UpgradingModel } from 'src/app/upgrade/models';
import { CaseUnboxingModel, CaseUnboxingHisoryModel } from 'src/app/cases/models';
import { WithdrawalsModel } from 'src/app/withdraw/models';

export const LOAD_UPGRADES = '[History] Load Upgrades';
export const LOAD_UPGRADES_SUCCESS = '[History] Load Upgrades Success';
export const LOAD_UPGRADES_FAIL = '[History] Load Upgrades Fail';

export class LoadUpgrades implements Action {
  readonly type: string = LOAD_UPGRADES;
  constructor(public payload: { userId: string, pagination: Pagination }) {
  }
}

export class LoadUpgradesSuccess implements Action {
  readonly type: string = LOAD_UPGRADES_SUCCESS;
  constructor(public payload: UpgradingModel[]) {
  }
}

export class LoadUpgradesFail implements Action {
  readonly type: string = LOAD_UPGRADES_FAIL;
  constructor(public payload: any) {
  }
}

export const LOAD_UNBOXINGS = '[History] Load Unboxings';
export const LOAD_UNBOXINGS_SUCCESS = '[History] Load Unboxings Success';
export const LOAD_UNBOXINGS_FAIL = '[History] Load Unboxings Fail';

export class LoadUnboxings implements Action {
  readonly type: string = LOAD_UNBOXINGS;
  constructor(public payload: { userId: string, pagination: Pagination }) {
  }
}

export class LoadUnboxingsSuccess implements Action {
  readonly type: string = LOAD_UNBOXINGS_SUCCESS;
  constructor(public payload: CaseUnboxingModel[]) {
  }
}

export class LoadUnboxingsFail implements Action {
  readonly type: string = LOAD_UNBOXINGS_FAIL;
  constructor(public payload: any) {
  }
}

export const UNBOXING_ID = '[History] Unboxing Id';

export class UnboxingId implements Action {
  readonly type: string = UNBOXING_ID;
  constructor(public payload: string) {
  }
}

export const LOAD_WITHDRAWALS = '[History] Load Withdrawals';
export const LOAD_WITHDRAWALS_SUCCESS = '[History] Load Withdrawals Success';
export const LOAD_WITHDRAWALS_FAIL = '[History] Load Withdrawals Fail';

export class LoadWithdrawals implements Action {
  readonly type: string = LOAD_WITHDRAWALS;
  constructor(public payload: { pagination: Pagination }) {
  }
}

export class LoadWithdrawalsSuccess implements Action {
  readonly type: string = LOAD_WITHDRAWALS_SUCCESS;
  constructor(public payload: WithdrawalsModel[]) {
  }
}

export class LoadWithdrawalsFail implements Action {
  readonly type: string = LOAD_WITHDRAWALS_FAIL;
  constructor(public payload: any) {
  }
}

export const LOAD_DEPOSITS = '[History] Load Deposits';
export const LOAD_DEPOSITS_SUCCESS = '[History] Load Deposits Success';
export const LOAD_DEPOSITS_FAIL = '[History] Load Deposits Fail';

export class LoadDeposits implements Action {
  readonly type: string = LOAD_DEPOSITS;
  constructor(public payload: { transactionType?: string; pagination: Pagination }) {
  }
}

export class LoadDepositsSuccess implements Action {
  readonly type: string = LOAD_DEPOSITS_SUCCESS;
  constructor(public payload: DepositModel[]) {
  }
}

export class LoadDepositsFail implements Action {
  readonly type: string = LOAD_DEPOSITS_FAIL;
  constructor(public payload: any) {
  }
}

export const LOAD_LATEST_DROPS = '[History] Load Latest Drops';
export const LOAD_LATEST_DROPS_SUCCESS = '[History] Load Latest Drops Success';
export const LOAD_LATEST_DROPS_FAIL = '[History] Load Latest Drops Fail';

export class LoadLatestDrops implements Action {
  readonly type: string = LOAD_LATEST_DROPS;
}

export class LoadLatestDropsSuccess implements Action {
  readonly type: string = LOAD_LATEST_DROPS_SUCCESS;
  constructor(public payload: CaseUnboxingHisoryModel[]) { }
}

export class LoadLatestDropsFail implements Action {
  readonly type: string = LOAD_LATEST_DROPS_FAIL;
  constructor(public payload: any) { }
}

export const ADD_LATEST_DROP = '[History] Add Latest Drop';

export class AddLatestDrop implements Action {
  readonly type: string = ADD_LATEST_DROP;
  constructor(public payload: CaseUnboxingHisoryModel) { }
}

export const LOAD_TAGS = '[History] Load Tags';
export const LOAD_TAGS_SUCCESS = '[History] Load Tags Success';
export const LOAD_TAGS_FAIL = '[History] Load Tags Fail';

export class LoadTags implements Action {
  readonly type: string = LOAD_TAGS;
}

export class LoadTagsSuccess implements Action {
  readonly type: string = LOAD_TAGS_SUCCESS;
  constructor(public payload: string[]) { }
}

export class LoadTagsFail implements Action {
  readonly type: string = LOAD_TAGS_FAIL;
  constructor(public payload: any) { }
}

export type HistoryActions = LoadUpgrades
  | LoadUpgradesSuccess
  | LoadUpgradesFail
  | LoadUnboxings
  | LoadUnboxingsSuccess
  | LoadUnboxingsFail
  | UnboxingId
  | LoadWithdrawals
  | LoadWithdrawalsSuccess
  | LoadWithdrawalsFail
  | LoadDeposits
  | LoadDepositsSuccess
  | LoadDepositsFail
  | LoadLatestDrops
  | LoadLatestDropsSuccess
  | LoadLatestDropsFail
  | AddLatestDrop
  | LoadTags
  | LoadTagsSuccess
  | LoadTagsFail;
