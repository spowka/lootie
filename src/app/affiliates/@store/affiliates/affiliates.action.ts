import { Action } from '@ngrx/store';
import { ReferralInfoModel } from 'src/app/affiliates/models';

export const LOAD_REFERRAL_INFO = '[Affiliates] Load Referral Info';
export const LOAD_REFERRAL_INFO_SUCCESS = '[Affiliates] Load Referral Info Success';
export const LOAD_REFERRAL_INFO_FAIL = '[Affiliates] Load Referral Info Fail';

export class LoadReferralInfo implements Action {
  readonly type: string = LOAD_REFERRAL_INFO;
}

export class LoadReferralInfoSuccess implements Action {
  readonly type: string = LOAD_REFERRAL_INFO_SUCCESS;
  constructor(public payload: ReferralInfoModel) { }
}

export class LoadReferralInfoFail implements Action {
  readonly type: string = LOAD_REFERRAL_INFO_FAIL;
  constructor(public payload: any) { }
}

export const CREATE_REFERRAL_CODE = '[Affiliates] Create Referral Code';
export const CREATE_REFERRAL_CODE_FAIL = '[Affiliates] Create Referral Code Fail';

export class CreateReferralCode implements Action {
  readonly type: string = CREATE_REFERRAL_CODE;
  constructor(public payload: string) { }
}

export class CreateReferralCodeFail implements Action {
  readonly type: string = CREATE_REFERRAL_CODE_FAIL;
  constructor(public payload: any) { }
}

export const SEND_INVITE = '[Affiliates] Send Invite';
export const SEND_INVITE_SUCCESS = '[Affiliates] Send Invite Success';
export const SEND_INVITE_FAIL = '[Affiliates] Send Invite Fail';

export class SendInvite implements Action {
  readonly type: string = SEND_INVITE;
  constructor(public payload: string) { }
}

export class SendInviteSuccess implements Action {
  readonly type: string = SEND_INVITE_SUCCESS;
  constructor(public payload: string) { }
}

export class SendInviteFail implements Action {
  readonly type: string = SEND_INVITE_FAIL;
  constructor(public payload: any) { }
}

export const CLAIM_EARNINGS = '[Affiliates] Claim Earnings';
export const CLAIM_EARNINGS_SUCCESS = '[Affiliates] Claim Earnings Success';
export const CLAIM_EARNINGS_FAIL = '[Affiliates] Claim Earnings Fail';

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

export type AffiliatesActions =
  | LoadReferralInfo
  | LoadReferralInfoSuccess
  | LoadReferralInfoFail
  | CreateReferralCode
  | CreateReferralCodeFail
  | SendInvite
  | SendInviteSuccess
  | SendInviteFail
  | ClaimEarnings
  | ClaimEarningsSuccess
  | ClaimEarningsFail;
