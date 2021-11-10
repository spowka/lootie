import { Action } from '@ngrx/store';
import { Pagination, LeaderBoardModel } from 'src/app/shared/models';

export const LOAD_LEADER_BOARD_MONTHLY_TOP_DROP = '[Leader Board] Load Leader Board Monthly Top Drop';
export const LOAD_LEADER_BOARD_MONTHLY_TOP_DROP_SUCCESS = '[Leader Board] Load Leader Board Monthly Top Drop Success';
export const LOAD_LEADER_BOARD_MONTHLY_TOP_DROP_FAIL = '[Leader Board] Load Leader Board Monthly Top Drop Fail';

export const LOAD_LEADER_BOARD_TOP_DROP_HISTORY = '[Leader Board] Load Leader Board Top Drop History';
export const LOAD_LEADER_BOARD_TOP_DROP_HISTORY_SUCCESS = '[Leader Board] Load Leader Board Top Drop History Success';
export const LOAD_LEADER_BOARD_TOP_DROP_HISTORY_FAIL = '[Leader Board] Load Leader Board Top Drop History Fail';

export class LoadLeaderBoardMonthlyTopDrop implements Action {
  readonly type: string = LOAD_LEADER_BOARD_MONTHLY_TOP_DROP;
  constructor(public payload: { pagination: Pagination }) {}
}

export class LoadLeaderBoardMonthlyTopDropSuccess implements Action {
  readonly type: string = LOAD_LEADER_BOARD_MONTHLY_TOP_DROP_SUCCESS;
  constructor(public payload: LeaderBoardModel) {}
}

export class LoadLeaderBoardMonthlyTopDropFail implements Action {
  readonly type: string = LOAD_LEADER_BOARD_MONTHLY_TOP_DROP_FAIL;
  constructor(public payload: any) {}
}

export class LoadLeaderBoardTopDropHistory implements Action {
  readonly type: string = LOAD_LEADER_BOARD_TOP_DROP_HISTORY;
  constructor(public payload: { pagination: Pagination }) {}
}

export class LoadLeaderBoardTopDropHistorySuccess implements Action {
  readonly type: string = LOAD_LEADER_BOARD_TOP_DROP_HISTORY_SUCCESS;
  constructor(public payload: LeaderBoardModel) {}
}

export class LoadLeaderBoardTopDropHistoryFail implements Action {
  readonly type: string = LOAD_LEADER_BOARD_TOP_DROP_HISTORY_FAIL;
  constructor(public payload: any) {}
}


export type LeaderBoardActions =
  | LoadLeaderBoardMonthlyTopDrop
  | LoadLeaderBoardMonthlyTopDropSuccess
  | LoadLeaderBoardMonthlyTopDropFail
  | LoadLeaderBoardTopDropHistory
  | LoadLeaderBoardTopDropHistorySuccess
  | LoadLeaderBoardTopDropHistoryFail;
