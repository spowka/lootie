import { Action } from '@ngrx/store';

import { BattleModel, BattleUser, BattleRoundModel, BattleDice } from 'src/app/battle/models';
import { CasesType, CaseModel } from 'src/app/cases/models';
import { Pagination, Filters } from 'src/app/shared/models';

export const OPEN_BATTLE_BOX_MODAL = '[Battle] Open Battle Box Modal';
export const CLOSE_BATTLE_BOX_MODAL = '[Battle] Close Battle Box Modal';

export class OpenBattleBoxModal implements Action {
  readonly type: string = OPEN_BATTLE_BOX_MODAL;
}

export class CloseBattleBoxModal implements Action {
  readonly type: string = CLOSE_BATTLE_BOX_MODAL;
}

export const LOAD_BATTLES = '[Battle] Load Battles';
export const LOAD_BATTLES_SUCCESS = '[Battle] Load Battles Success';
export const LOAD_BATTLES_FAIL = '[Battle] Load Battles Fail';

export class LoadBattles implements Action {
  readonly type: string = LOAD_BATTLES;
  constructor(public payload: { type: string, pagination?: Pagination }) { }
}

export class LoadBattlesSuccess implements Action {
  readonly type: string = LOAD_BATTLES_SUCCESS;
  constructor(public payload: BattleModel[]) { }
}

export class LoadBattlesFail implements Action {
  readonly type: string = LOAD_BATTLES_FAIL;
  constructor(public payload: any) { }
}

export const LOAD_BATTLE = '[Battle] Load Battle';
export const LOAD_BATTLE_SUCCESS = '[Battle] Load Battle Success';
export const LOAD_BATTLE_FAIL = '[Battle] Load Battle Fail';

export class LoadBattle implements Action {
  readonly type: string = LOAD_BATTLE;
  constructor(public payload: string) { }
}

export class LoadBattleSuccess implements Action {
  readonly type: string = LOAD_BATTLE_SUCCESS;
  constructor(public payload: BattleModel) { }
}

export class LoadBattleFail implements Action {
  readonly type: string = LOAD_BATTLE_FAIL;
  constructor(public payload: any) { }
}

export const JOIN_BATTLE = '[Battle] Join Battle';
export const JOIN_BATTLE_SUCCESS = '[Battle] Join Battle Success';
export const JOIN_BATTLE_FAIL = '[Battle] Join Battle Fail';

export class JoinBattle implements Action {
  readonly type: string = JOIN_BATTLE;
  constructor(public payload: { id: string; seed: string }) { }
}

export class JoinBattleSuccess implements Action {
  readonly type: string = JOIN_BATTLE_SUCCESS;
}

export class JoinBattleFail implements Action {
  readonly type: string = JOIN_BATTLE_FAIL;
  constructor(public payload: any) { }
}

export const QUIT_BATTLE = '[Battle] Quit Battle';
export const QUIT_BATTLE_SUCCESS = '[Battle] Quit Battle Success';
export const QUIT_BATTLE_FAIL = '[Battle] Quit Battle Fail';

export class QuitBattle implements Action {
  readonly type: string = QUIT_BATTLE;
  constructor(public payload: { id: string; seed: string }) { }
}

export class QuitBattleSuccess implements Action {
  readonly type: string = QUIT_BATTLE_SUCCESS;
  constructor(public payload: any) { }
}

export class QuitBattleFail implements Action {
  readonly type: string = QUIT_BATTLE_FAIL;
  constructor(public payload: any) { }
}

export const START_BATTLE_NOW = '[Battle] Start Battle Now';
export const START_BATTLE_NOW_SUCCESS = '[Battle] Start Battle Now Success';
export const START_BATTLE_NOW_FAIL = '[Battle] Start Battle Now Fail';
export const SET_READY_PLAYER = '[Battle] Set Ready Player';

export class StartBattleNow implements Action {
  readonly type: string = START_BATTLE_NOW;
  constructor(public payload: string) { }
}

export class StartBattleNowSuccess implements Action {
  readonly type: string = START_BATTLE_NOW_SUCCESS;
}

export class StartBattleNowFail implements Action {
  readonly type: string = START_BATTLE_NOW_FAIL;
  constructor(public payload: any) { }
}

export class SetReadyPlayer implements Action {
  readonly type: string = SET_READY_PLAYER;
  constructor(public payload: { user: string, battle: BattleModel }) { }
}

export const LOAD_BOXES = '[Cases] Load Boxes';
export const LOAD_BOXES_SUCCESS = '[Cases] Load Boxes Success';
export const LOAD_BOXES_FAIL = '[Cases] Load Boxes Fail';

export class LoadBoxes implements Action {
  readonly type: string = LOAD_BOXES;
  constructor(
    public payload: {
      caseType: CasesType;
      name?: string;
      pagination?: Pagination;
      filters?: Filters;
    }
  ) { }
}

export class LoadBoxesSuccess implements Action {
  readonly type: string = LOAD_BOXES_SUCCESS;
  constructor(public payload: CaseModel[]) { }
}

export class LoadBoxesFail implements Action {
  readonly type: string = LOAD_BOXES_FAIL;
  constructor(public payload: any) { }
}

export const SELECT_BOXES = '[Cases] Select Boxes';

export class SelectBoxes implements Action {
  readonly type: string = SELECT_BOXES;
  constructor(public payload: CaseModel[]) { }
}

export const CREATE_BATTLE = '[Cases] Create Battle';
export const CREATE_BATTLE_SUCCESS = '[Cases] Create Battle Success';
export const CREATE_BATTLE_FAIL = '[Cases] Create Battle Fail';

export class CreateBattle implements Action {
  readonly type: string = CREATE_BATTLE;
  constructor(public payload: { seed: string; userCount: number; cases: any[], private: boolean }) { }
}

export class CreateBattleSuccess implements Action {
  readonly type: string = CREATE_BATTLE_SUCCESS;
  constructor(public payload: CaseModel) { }
}

export class CreateBattleFail implements Action {
  readonly type: string = CREATE_BATTLE_FAIL;
  constructor(public payload: any) { }
}

export const UPDATE_BATTLE = '[Cases] Update Battle';
export class UpdateBattle implements Action {
  readonly type: string = UPDATE_BATTLE;
  constructor(public payload: { battle: BattleModel; seed: string; user: BattleUser }) { }
}

export const SET_BATTLE_ROUND = '[Cases] Set Battle Round';
export class SetBattleRound implements Action {
  readonly type: string = SET_BATTLE_ROUND;
  constructor(public payload: BattleRoundModel) { }
}

export const ADD_BATTLE_SUCCESS = '[Cases] Add Battle';
export class AddBattleSuccess implements Action {
  readonly type: string = ADD_BATTLE_SUCCESS;
  constructor(public payload: CaseModel) { }
}

export const CANCEL_BATTLE = '[Cases] Cancel Battle';
export const CANCEL_BATTLE_SUCCESS = '[Cases] Cancel Battle Success';
export const CANCEL_BATTLE_FAIL = '[Cases] Cancel Battle Fail';

export class CancelBattle implements Action {
  readonly type: string = CANCEL_BATTLE;
  constructor(public payload: string) { }
}

export class CancelBattleSuccess implements Action {
  readonly type: string = CANCEL_BATTLE_SUCCESS;
  constructor(public payload: string) { }
}

export class CancelBattleFail implements Action {
  readonly type: string = CANCEL_BATTLE_FAIL;
  constructor(public payload: any) { }
}

export const START_BATTLE = '[Cases] Start Battle';
export class StartBattle implements Action {
  readonly type: string = START_BATTLE;
  constructor(public payload: string) { }
}

export const END_BATTLE = '[Cases] End Battle';
export class EndBattle implements Action {
  readonly type: string = END_BATTLE;
  constructor(public payload: string) { }
}

export const SET_BATTLE_SORT = '[Cases] Set Battle Sort';
export class SetBattleSort implements Action {
  readonly type: string = SET_BATTLE_SORT;
  constructor(public payload: string) { }
}

export const UPDATE_SERVER_SEED = '[Battle] Update Server Seed';
export class UpdateServerSeed implements Action {
  readonly type: string = UPDATE_SERVER_SEED;
  constructor(public payload: BattleDice) { }
}

export const LEAVE_BATTLE = '[Battle] Leave Battle';
export class LeaveBattle implements Action {
  readonly type: string = LEAVE_BATTLE;
  constructor(public payload: any) { }
}

export const SET_URL_FROM = '[Battle] Set Url From';
export class SetUrlFrom implements Action {
  readonly type: string = SET_URL_FROM;
  constructor(public payload: string) { }
}

export type BattleActions =
  | OpenBattleBoxModal
  | CloseBattleBoxModal
  | LoadBattles
  | LoadBattlesSuccess
  | LoadBattlesFail
  | LoadBattle
  | LoadBattleSuccess
  | LoadBattleFail
  | JoinBattle
  | JoinBattleSuccess
  | JoinBattleFail
  | QuitBattle
  | QuitBattleSuccess
  | QuitBattleFail
  | StartBattleNow
  | StartBattleNowSuccess
  | StartBattleNowFail
  | SetReadyPlayer
  | LoadBoxes
  | LoadBoxesSuccess
  | LoadBoxesFail
  | SelectBoxes
  | CreateBattle
  | CreateBattleSuccess
  | CreateBattleFail
  | UpdateBattle
  | SetBattleRound
  | AddBattleSuccess
  | CancelBattle
  | CancelBattleFail
  | CancelBattleSuccess
  | StartBattle
  | EndBattle
  | SetBattleSort
  | SetUrlFrom;
