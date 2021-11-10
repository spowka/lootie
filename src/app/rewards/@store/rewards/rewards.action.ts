import { Action } from '@ngrx/store';

export const CLAIM_EMAIL = '[Rewards] Claim Email';
export const CLAIM_EMAIL_SUCCESS = '[Rewards] Claim Email Success';
export const CLAIM_EMAIL_FAIL = '[Rewards] Claim Email Fail';

export class ClaimEmail implements Action {
  readonly type: string = CLAIM_EMAIL;
}

export class ClaimEmailSuccess implements Action {
  readonly type: string = CLAIM_EMAIL_SUCCESS;
  constructor(public payload: string) { }
}

export class ClaimEmailFail implements Action {
  readonly type: string = CLAIM_EMAIL_FAIL;
  constructor(public payload: any) { }
}

export const CLAIM_DISCORD = '[Rewards] Claim Discord';
export const CLAIM_DISCORD_SUCCESS = '[Rewards] Claim Discord Success';
export const CLAIM_DISCORD_FAIL = '[Rewards] Claim Discord Fail';

export class ClaimDiscord implements Action {
  readonly type: string = CLAIM_DISCORD;
  constructor(public payload: string) { }
}

export class ClaimDiscordSuccess implements Action {
  readonly type: string = CLAIM_DISCORD_SUCCESS;
  constructor(public payload: string) { }
}

export class ClaimDiscordFail implements Action {
  readonly type: string = CLAIM_DISCORD_FAIL;
  constructor(public payload: any) { }
}

export const CLAIM_FACEBOOK = '[Rewards] Claim Facebook';
export const CLAIM_FACEBOOK_SUCCESS = '[Rewards] Claim Facebook Success';
export const CLAIM_FACEBOOK_FAIL = '[Rewards] Claim Facebook Fail';

export class ClaimFacebook implements Action {
  readonly type: string = CLAIM_FACEBOOK;
}

export class ClaimFacebookSuccess implements Action {
  readonly type: string = CLAIM_FACEBOOK_SUCCESS;
  constructor(public payload: string) { }
}

export class ClaimFacebookFail implements Action {
  readonly type: string = CLAIM_FACEBOOK_FAIL;
  constructor(public payload: any) { }
}

export const CLAIM_TWITTER = '[Rewards] Claim Twitter';
export const CLAIM_TWITTER_SUCCESS = '[Rewards] Claim Twitter Success';
export const CLAIM_TWITTER_FAIL = '[Rewards] Claim Twitter Fail';

export class ClaimTwitter implements Action {
  readonly type: string = CLAIM_TWITTER;
}

export class ClaimTwitterSuccess implements Action {
  readonly type: string = CLAIM_TWITTER_SUCCESS;
  constructor(public payload: string) { }
}

export class ClaimTwitterFail implements Action {
  readonly type: string = CLAIM_TWITTER_FAIL;
  constructor(public payload: any) { }
}

export type RewardsActions =
  | ClaimEmail
  | ClaimEmailSuccess
  | ClaimEmailFail
  | ClaimDiscord
  | ClaimDiscordSuccess
  | ClaimDiscordFail
  | ClaimFacebook
  | ClaimFacebookSuccess
  | ClaimFacebookFail
  | ClaimTwitter
  | ClaimTwitterSuccess
  | ClaimTwitterFail;
