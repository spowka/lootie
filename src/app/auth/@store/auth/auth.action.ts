import { Action } from '@ngrx/store';

import {
  ResetPassword,
  ForgotPassword,
  LoginContext,
  LoginProvider,
  User,
  ShippingInfo,
  ShippingCountry
} from 'src/app/auth/models';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';

export const RESET = '[Auth] Reset password';
export const RESET_FAIL = '[Auth] Reset password Fail';

export const VERIFY_EMAIL = '[Auth] Verify email';
export const VERIFY_EMAIL_SUCCESS = '[Auth] Verify email Success';
export const VERIFY_EMAIL_FAIL = '[Auth] Verify email Fail';

export const FORGOT = '[Auth] Forgot password';
export const FORGOT_SUCCESS = '[Auth] Forgot password Success';
export const FORGOT_FAIL = '[Auth] Forgot password Fail';

export class Login implements Action {
  readonly type: string = LOGIN;
  constructor(
    public payload: { loginContext: LoginContext; provider: LoginProvider; remember?: boolean }
  ) {}
}

export class LoginSuccess implements Action {
  readonly type: string = LOGIN_SUCCESS;
  constructor(public payload: { user: User; token: string }) {}
}

export class LoginFail implements Action {
  readonly type: string = LOGIN_FAIL;
  constructor(public payload: any = {}) {}
}

export class ResetPasswordAction implements Action {
  readonly type: string = RESET;
  constructor(public payload: { context: ResetPassword }) {}
}

export class ResetPasswordFail implements Action {
  readonly type: string = RESET_FAIL;
  constructor(public payload: any = {}) {}
}

export class ForgotPasswordAction implements Action {
  readonly type: string = FORGOT;
  constructor(public payload: { context: ForgotPassword }) {}
}

export class ForgotPasswordSuccess implements Action {
  readonly type: string = FORGOT_SUCCESS;
  constructor(public payload: boolean) {}
}

export class ForgotPasswordFail implements Action {
  readonly type: string = FORGOT_FAIL;
  constructor(public payload: any = {}) {}
}

export class VerifyEmailAction implements Action {
  readonly type: string = VERIFY_EMAIL;
  constructor(public payload: { email: string, token: string }) { }
}

export class VerifyEmailSuccess implements Action {
  readonly type: string = VERIFY_EMAIL_SUCCESS;
  constructor(public payload: boolean) { }
}

export class VerifyEmailFail implements Action {
  readonly type: string = VERIFY_EMAIL_FAIL;
  constructor(public payload: any = {}) { }
}

export const GOOGLE_SIGN_IN = '[Auth] Google Sign In';
export const GOOGLE_SIGN_IN_SUCCESS = '[Auth] Google Sign In Success';

export class GoogleSignIn implements Action {
  readonly type: string = GOOGLE_SIGN_IN;
}

export class GoogleSignInSuccess implements Action {
  readonly type: string = GOOGLE_SIGN_IN_SUCCESS;
  constructor(
    public payload: { loginContext: LoginContext; provider: LoginProvider }
  ) {}
}

export const STEAM_AUTH = '[Auth] Steam Authentication';

export class SteamAuth implements Action {
  readonly type: string = STEAM_AUTH;
  constructor(
    public payload: { loginContext: LoginContext; provider: LoginProvider }
  ) {}
}

export const OPSKINS_AUTH = '[Auth] Opskins Authentication';

export class OpskinsAuth implements Action {
  readonly type: string = OPSKINS_AUTH;
  constructor(
    public payload: { loginContext: LoginContext; provider: LoginProvider }
  ) {}
}

export const SIGN_UP = '[Auth] Sign Up';
export const SIGN_UP_SUCCESS = '[Auth] Sign Up Success';
export const SIGN_UP_FAIL = '[Auth] Sign Up Fail';

export class SignUp implements Action {
  readonly type: string = SIGN_UP;
  constructor(
    public payload: { user: User; subscribeToNewsletter?: boolean }
  ) {}
}

export class SignUpSuccess implements Action {
  readonly type: string = SIGN_UP_SUCCESS;
  constructor(public payload: { user: User }) {}
}

export class SignUpFail implements Action {
  readonly type: string = SIGN_UP_FAIL;
  constructor(public payload: any = {}) {}
}

export const AUTH_CHECK = '[Auth] Check auth';
export const AUTH_CHECK_SUCCESS = '[Auth] Check auth success';
export const AUTH_CHECK_FAIL = '[Auth] Check auth fail';

export class AuthCheck implements Action {
  readonly type: string = AUTH_CHECK;
}

export class AuthCheckSuccess implements Action {
  readonly type: string = AUTH_CHECK_SUCCESS;
  constructor(public payload: any) {}
}

export class AuthCheckFail implements Action {
  readonly type: string = AUTH_CHECK_FAIL;
  constructor(public payload: string) {}
}

export const LOGOUT = '[Auth] Logout';

export class Logout implements Action {
  readonly type: string = LOGOUT;
}

export const UPDATE_USER_BALANCE = '[Auth] Update User Balance';

export class UpdateUserBalance implements Action {
  readonly type: string = UPDATE_USER_BALANCE;
  constructor(public payload: any) {}
}

export const UPDATE_USER_UNBOXED_CASES =
  '[Auth] Update User Unboxed Cases';

export class UpdateUserUnboxedCases implements Action {
  readonly type: string = UPDATE_USER_UNBOXED_CASES;
  constructor(public payload: any) {}
}

export const UPDATE_REFERRAL_INFO = '[Auth] Update Referral Info';

export class UpdateReferralInfo implements Action {
  readonly type: string = UPDATE_REFERRAL_INFO;
  constructor(public payload: any) {}
}

export const UPDATE_REFERRAL_CODE = '[Auth] Update Referral Code';

export class UpdateReferralCode implements Action {
  readonly type: string = UPDATE_REFERRAL_CODE;
  constructor(public payload: string) {}
}

export const UPDATE_USER_INFO = '[Auth] Load User Info';
export const UPDATE_USER_INFO_SUCCESS = '[Auth] Load User Info Success';
export const UPDATE_USER_INFO_FAIL = '[Auth] Load User Info Fail';

export class UpdateUserInfo implements Action {
  readonly type: string = UPDATE_USER_INFO;
}

export class UpdateUserInfoSuccess implements Action {
  readonly type: string = UPDATE_USER_INFO_SUCCESS;
  constructor(public payload: User) {}
}

export class UpdateUserInfoFail implements Action {
  readonly type: string = UPDATE_USER_INFO_FAIL;
  constructor(public payload: any) {}
}

export const APPROVE_TOS = '[Auth] Approve TOS';
export const APPROVE_TOS_FAIL = '[Auth] Approve TOS Fail';

export class ApproveTos implements Action {
  readonly type: string = APPROVE_TOS;
  constructor(public payload: boolean) {}
}

export class ApproveTosFail implements Action {
  readonly type: string = APPROVE_TOS_FAIL;
  constructor(public payload: any) {}
}

export const APPLY_REFERRAL_CODE = '[Auth] Apply Referral Code';
export const APPLY_REFERRAL_CODE_SUCCESS = '[Auth] Apply Referral Code Success';
export const APPLY_REFERRAL_CODE_FAIL = '[Auth] Apply Referral Code Fail';

export class ApplyReferralCode implements Action {
  readonly type: string = APPLY_REFERRAL_CODE;
  constructor(public payload: string) {}
}

export class ApplyReferralCodeSuccess implements Action {
  readonly type: string = APPLY_REFERRAL_CODE_SUCCESS;
  constructor(public payload: { code: string, codeType: string }) {}
}

export class ApplyReferralCodeFail implements Action {
  readonly type: string = APPLY_REFERRAL_CODE_FAIL;
  constructor(public payload: any) {}
}

export const UPDATE_SHIPPING_ADDRESS = '[Auth] Update Shipping Address';
export const UPDATE_SHIPPING_ADDRESS_SUCCESS =
  '[Auth] Update Shipping Address Success';
export const UPDATE_SHIPPING_ADDRESS_FAIL =
  '[Auth] Update Shipping Address Fail';

export class UpdateShippingAddress implements Action {
  readonly type: string = UPDATE_SHIPPING_ADDRESS;
  constructor(public payload: ShippingInfo) {}
}

export class UpdateShippingAddressSuccess implements Action {
  readonly type: string = UPDATE_SHIPPING_ADDRESS_SUCCESS;
  constructor(public payload: User) {}
}

export class UpdateShippingAddressFail implements Action {
  readonly type: string = UPDATE_SHIPPING_ADDRESS_FAIL;
  constructor(public payload: any) {}
}

export const UPDATE_TRADE_URL = '[Auth] Update Trade Url';
export const UPDATE_TRADE_URL_SUCCESS = '[Auth] Update Trade Url Success';
export const UPDATE_TRADE_URL_FAIL = '[Auth] Update Trade Url Fail';

export class UpdateTradeUrl implements Action {
  readonly type: string = UPDATE_TRADE_URL;
  constructor(public payload: ShippingInfo) {}
}

export class UpdateTradeUrlSuccess implements Action {
  readonly type: string = UPDATE_TRADE_URL_SUCCESS;
  constructor(public payload: User) {}
}

export class UpdateTradeUrlFail implements Action {
  readonly type: string = UPDATE_TRADE_URL_FAIL;
  constructor(public payload: any) {}
}

export const UPDATE_USER_AVATAR = '[Auth] Update User Avatar';
export const UPDATE_USER_AVATAR_SUCCESS = '[Auth] Update User Avatar Success';
export const UPDATE_USER_AVATAR_FAIL = '[Auth] Update User Avatar Fail';

export class UpdateUserAvatar implements Action {
  readonly type: string = UPDATE_USER_AVATAR;
  constructor(public payload: string) {}
}

export class UpdateUserAvatarSuccess implements Action {
  readonly type: string = UPDATE_USER_AVATAR_SUCCESS;
  constructor(public payload: User) {}
}

export class UpdateUserAvatarFail implements Action {
  readonly type: string = UPDATE_USER_AVATAR_FAIL;
  constructor(public payload: any) {}
}

export const GET_SHIPPING_COUNTRIES = '[Auth] Get Shipping Countries';
export const GET_SHIPPING_COUNTRIES_SUCCESS =
  '[Auth] Get Shipping Countries Success';
export const GET_SHIPPING_COUNTRIES_FAIL = '[Auth] Get Shipping Countries Fail';

export class GetShippingCountries implements Action {
  readonly type: string = GET_SHIPPING_COUNTRIES;
}

export class GetShippingCountriesSuccess implements Action {
  readonly type: string = GET_SHIPPING_COUNTRIES_SUCCESS;
  constructor(public payload: any) {}
}

export class GetShippingCountriesFail implements Action {
  readonly type: string = GET_SHIPPING_COUNTRIES_FAIL;
  constructor(public payload: any) {}
}

export const MUTE_USER = '[Auth] Mute user';
export const UNMUTE_USER = '[Auth] Unmute user';

export class MuteUser implements Action {
  readonly type: string = MUTE_USER;
  constructor(public payload: { minute: number; timestamp: string }) {}
}

export class UnmuteUser implements Action {
  readonly type: string = UNMUTE_USER;
}

export const CASE_OPENED = '[Auth] Case opened';

export class CaseOpened implements Action {
  readonly type: string = CASE_OPENED;
  constructor(public payload: number) {}
}

export const CHECK_REMEMBER = '[Auth] Check Remember';

export class CheckRemember implements Action {
  readonly type: string = CHECK_REMEMBER;
  constructor(public payload: boolean) {}
}

export const UPDATE_HAS_FREEBOX_OPENED = '[Auth] Update hasFreeBoxOpened';

export class UpdateHasFreeBoxOpened implements Action {
  readonly type: string = UPDATE_HAS_FREEBOX_OPENED;
  constructor(public payload: boolean) {}
}

export type AuthAction =
  | Login
  | LoginFail
  | LoginSuccess
  | Logout
  | SignUp
  | SignUpSuccess
  | SignUpFail
  | GoogleSignIn
  | GoogleSignInSuccess
  | SteamAuth
  | OpskinsAuth
  | ResetPasswordAction
  | ResetPasswordFail
  | ForgotPasswordAction
  | ForgotPasswordSuccess
  | ForgotPasswordFail
  | VerifyEmailAction
  | VerifyEmailSuccess
  | VerifyEmailFail
  | AuthCheck
  | AuthCheckSuccess
  | AuthCheckFail
  | UpdateUserBalance
  | UpdateReferralCode
  | UpdateUserInfo
  | UpdateUserInfoSuccess
  | UpdateUserInfoFail
  | ApproveTos
  | ApproveTosFail
  | ApplyReferralCode
  | ApplyReferralCodeSuccess
  | ApplyReferralCodeFail
  | UpdateShippingAddress
  | UpdateShippingAddressSuccess
  | UpdateShippingAddressFail
  | UpdateTradeUrl
  | UpdateTradeUrlSuccess
  | UpdateTradeUrlFail
  | UpdateUserAvatar
  | UpdateUserAvatarSuccess
  | UpdateUserAvatarFail
  | GetShippingCountries
  | GetShippingCountriesSuccess
  | GetShippingCountriesFail
  | MuteUser
  | UnmuteUser
  | CaseOpened
  | CheckRemember
  | UpdateHasFreeBoxOpened;
