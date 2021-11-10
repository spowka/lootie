import { Action } from '@ngrx/store';
import { ServerSeed, PreviousSeeds } from '../../provably-fair/models';
import { DiceModel } from 'src/app/cases/models';

export const OPEN_LOOKUP_MODAL = '[Provably Fair] Open Lookup Modal';
export const CLOSE_LOOKUP_MODAL = '[Provably Fair] Close Lookup Modal';

export class OpenLookupModal implements Action {
  readonly type: string = OPEN_LOOKUP_MODAL;
}

export class CloseLookupModal implements Action {
  readonly type: string = CLOSE_LOOKUP_MODAL;
}

export const SET_HASHED_SERVER_SEED = '[Provably Fair] Set Hashed Server Seed';

export class SetHashedServerSeed implements Action {
  readonly type: string = SET_HASHED_SERVER_SEED;
  constructor(public payload: ServerSeed[]) { }
}

export const SET_ID = '[Provably Fair] Set Id';

export class SetId implements Action {
  readonly type: string = SET_ID;
  constructor(public payload: string) { }
}

export const SET_PREVIOUS_SEEDS = '[Provably Fair] Set Previous Seeds';

export class SetPreviousSeeds implements Action {
  readonly type: string = SET_PREVIOUS_SEEDS;
  constructor(public payload: PreviousSeeds) { }
}

export const SET_URL_FROM = '[Provably Fair] Set Url From';

export class SetUrlFrom implements Action {
  readonly type: string = SET_URL_FROM;
  constructor(public payload: string) { }
}

export const SET_CLIENT_SEED = '[Provably Fair] Set Client Seed';
export const CHANGE_CLIENT_SEED = '[Provably Fair] Change Client Seed';
export const CHANGE_CLIENT_SEED_FAIL = '[Provably Fair] Change Client Seed Fail';
export const CHANGE_CLIENT_SEED_SUCCESS = '[Provably Fair] Change Client Seed Success';

export class SetClientSeed implements Action {
  readonly type: string = SET_CLIENT_SEED;
}

export class ChangeClientSeed implements Action {
  readonly type: string = CHANGE_CLIENT_SEED;
  constructor(public payload: { id: string, seed: string }) { }
}

export class ChangeClientSeedSuccess implements Action {
  readonly type: string = CHANGE_CLIENT_SEED_SUCCESS;
  constructor(public payload: string) { }
}

export class ChangeClientSeedFail implements Action {
  readonly type: string = CHANGE_CLIENT_SEED_FAIL;
  constructor(public payload: any) { }
}

export const UPDATE_SERVER_SEED = '[Provably Fair] Update Server Seed';
export const UPDATE_SERVER_SEED_FAIL = '[Provably Fair] Update Server Seed Fail';
export const UPDATE_SERVER_SEED_SUCCESS = '[Provably Fair] Update Server Seed Success';

export class UpdateServerSeed implements Action {
  readonly type: string = UPDATE_SERVER_SEED;
  constructor(public payload: { id: string, diceId: string, isBattle?: boolean }) { }
}

export class UpdateServerSeedFail implements Action {
  readonly type: string = UPDATE_SERVER_SEED_FAIL;
  constructor(public payload: any) { }
}

export class UpdateServerSeedSuccess implements Action {
  readonly type: string = UPDATE_SERVER_SEED_SUCCESS;
  constructor(public payload: DiceModel) { }
}

export const GET_PROVABLY_FAIR = '[Provably Fair] Get Provably Fair';
export const GET_PROVABLY_FAIR_FAIL = '[Provably Fair] Get Provably Fair Fail';
export const GET_PROVABLY_FAIR_SUCCESS = '[Provably Fair] Get Provably Fair Success';

export class GetProvablyFair implements Action {
  readonly type: string = GET_PROVABLY_FAIR;
  constructor(public payload: number) { }
}

export class GetProvablyFairSuccess implements Action {
  readonly type: string = GET_PROVABLY_FAIR_SUCCESS;
  constructor(public payload: any) { }
}

export class GetProvablyFairFail implements Action {
  readonly type: string = GET_PROVABLY_FAIR_FAIL;
  constructor(public payload: any) { }
}

export type ProvablyFairActions =
  | OpenLookupModal
  | CloseLookupModal
  | SetPreviousSeeds
  | SetHashedServerSeed
  | SetUrlFrom
  | SetId
  | UpdateServerSeed
  | UpdateServerSeedFail
  | UpdateServerSeedSuccess
  | GetProvablyFair
  | GetProvablyFairSuccess
  | GetProvablyFairFail
  | SetClientSeed
  | ChangeClientSeed
  | ChangeClientSeedSuccess
  | ChangeClientSeedFail;
