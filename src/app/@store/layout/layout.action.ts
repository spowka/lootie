import { Action } from '@ngrx/store';
import { LanguageType } from 'src/app/shared/models';

export const RESIZE_WINDOW = '[Layout] Resize window';

export const ENABLE_LAYOUT_SCROLL = '[Layout] Enable scroll on app wrapper';
export const DISABLE_LAYOUT_SCROLL = '[Layout] Disable scroll on app wrapper';

export const OPEN_HEADER_NAVBAR = '[Layout] Open HeaderNavbar';
export const CLOSE_HEADER_NAVBAR = '[Layout] Close HeaderNavbar';
export const TOGGLE_HEADER_NAVBAR = '[Layout] Toggle HeaderNavbar';

export const OPEN_USER_SIDEBAR = '[Layout] Open UserSidebar';
export const CLOSE_USER_SIDEBAR = '[Layout] Close UserSidebar';
export const TOGGLE_USER_SIDEBAR = '[Layout] Toggle UserSidebar';

export const OPEN_FILTER_SIDEBAR = '[Layout] Open FilterSidebar';
export const CLOSE_FILTER_SIDEBAR = '[Layout] Close FilterSidebar';

export const OPEN_LOGIN_MODAL = '[Layout] Open Login Modal';
export const CLOSE_LOGIN_MODAL = '[Layout] Close Login Modal';
export const OPEN_SIGN_UP_MODAL = '[Layout] Open Sign Up Modal';
export const CLOSE_SIGN_UP_MODAL = '[Layout] Close Sign Up Modal';
export const OPEN_FORGOT_MODAL = '[Layout] Open Forgot password Modal';
export const CLOSE_FORGOT_MODAL = '[Layout] Close Forgot password Modal';
export const OPEN_VERIFY_MODAL = '[Layout] Open Verify Modal';
export const CLOSE_VERIFY_MODAL = '[Layout] Close Verify Modal';

export const OPEN_CHAT = '[Layout] Open chat';
export const CLOSE_CHAT = '[Layout] Close chat';
export const TOGGLE_CHAT = '[Layout] Toggle chat';

export const TOGGLE_LATEST_UPGRADES = '[Layout] Toggle Latest Upgrages';

export const THEME_CHECK = '[Layout] Theme Check';
export const THEME_CHECK_SUCCESS = '[Layout] Theme Check Success';
export const THEME_CHECK_FAIL = '[Layout] Theme Check Fail';

export const CHANGE_THEME = '[Layout] Change Theme';

export const LANGUAGE_CHECK = '[Layout] Language Check';
export const LANGUAGE_CHECK_SUCCESS = '[Layout] Language Check Success';
export const LANGUAGE_CHECK_FAIL = '[Layout] Language Check Fail';

export const CHANGE_LANGUAGE = '[Layout] Change Language';

export const CHECK_STATUS = '[Layout] Check Status';

export class CheckStatus implements Action {
  readonly type: string = CHECK_STATUS;
}

export class ResizeWindow implements Action {
  readonly type: string = RESIZE_WINDOW;

  constructor(public payload: { width: number, height: number }) {
  }
}

export class EnableLayoutScroll implements Action {
  readonly type: string = ENABLE_LAYOUT_SCROLL;
}

export class DisableLayoutScroll implements Action {
  readonly type: string = DISABLE_LAYOUT_SCROLL;
}

export const ENABLE_LIVE_FEED = '[Layout] Enable Live Feed';

export class EnableLiveFeed implements Action {
  readonly type: string = ENABLE_LIVE_FEED;
  constructor(public payload: boolean) { }
}

export class OpenHeaderNavbar implements Action {
  readonly type: string = OPEN_HEADER_NAVBAR;
}

export class CloseHeaderNavbar implements Action {
  readonly type: string = CLOSE_HEADER_NAVBAR;
}

export class ToggleHeaderNavbar implements Action {
  readonly type: string = TOGGLE_HEADER_NAVBAR;
}


export class OpenUserSidebar implements Action {
  readonly type: string = OPEN_USER_SIDEBAR;
}

export class CloseUserSidebar implements Action {
  readonly type: string = CLOSE_USER_SIDEBAR;
}

export class ToggleUserSidebar implements Action {
  readonly type: string = TOGGLE_USER_SIDEBAR;
}

export class OpenFilterSidebar implements Action {
  readonly type: string = OPEN_FILTER_SIDEBAR;
}

export class CloseFilterSidebar implements Action {
  readonly type: string = CLOSE_FILTER_SIDEBAR;
}

export class ChangeTheme implements Action {
  readonly type: string = CHANGE_THEME;
  constructor(public payload: string) { }
}

export class OpenLoginModal implements Action {
  readonly type: string = OPEN_LOGIN_MODAL;
}

export class CloseLoginModal implements Action {
  readonly type: string = CLOSE_LOGIN_MODAL;
}

export class OpenSignUpModal implements Action {
  readonly type: string = OPEN_SIGN_UP_MODAL;
}

export class CloseSignUpModal implements Action {
  readonly type: string = CLOSE_SIGN_UP_MODAL;
}

export class OpenForgotModal implements Action {
  readonly type: string = OPEN_FORGOT_MODAL;
}

export class CloseForgotModal implements Action {
  readonly type: string = CLOSE_FORGOT_MODAL;
}

export class OpenChat implements Action {
  readonly type: string = OPEN_CHAT;
}

export class CloseChat implements Action {
  readonly type: string = CLOSE_CHAT;
}

export class ToggleChat implements Action {
  readonly type: string = TOGGLE_CHAT;
}

export class ToggleLatestUpgrades implements Action {
  readonly type: string = TOGGLE_LATEST_UPGRADES;
}

export class ThemeCheck implements Action {
  readonly type: string = THEME_CHECK;
}

export class ThemeCheckSuccess implements Action {
  readonly type: string = THEME_CHECK_SUCCESS;
  constructor(public payload: string) { }
}

export class ThemeCheckFail implements Action {
  readonly type: string = THEME_CHECK_FAIL;
}

export class LanguageCheck implements Action {
  readonly type: string = LANGUAGE_CHECK;
}

export class LanguageCheckSuccess implements Action {
  readonly type: string = LANGUAGE_CHECK_SUCCESS;
  constructor(public payload: LanguageType) { }
}

export class LanguageCheckFail implements Action {
  readonly type: string = LANGUAGE_CHECK_FAIL;
}

export class ChangeLanguage implements Action {
  readonly type: string = CHANGE_LANGUAGE;
  constructor(public payload: LanguageType) { }
}

export class OpenVerifyModal implements Action {
  readonly type: string = OPEN_VERIFY_MODAL;
}

export class CloseVerifyModal implements Action {
  readonly type: string = CLOSE_VERIFY_MODAL;
}

export type LayoutActions = OpenHeaderNavbar
  | CloseHeaderNavbar
  | ToggleHeaderNavbar
  | OpenUserSidebar
  | CloseUserSidebar
  | ToggleUserSidebar
  | ResizeWindow
  | EnableLayoutScroll
  | DisableLayoutScroll
  | ChangeTheme
  | OpenLoginModal
  | CloseLoginModal
  | OpenSignUpModal
  | CloseSignUpModal
  | OpenForgotModal
  | CloseForgotModal
  | OpenVerifyModal
  | CloseVerifyModal
  | OpenChat
  | CloseChat
  | ToggleChat
  | ToggleLatestUpgrades
  | ThemeCheck
  | ThemeCheckSuccess
  | ThemeCheckFail
  | LanguageCheck
  | LanguageCheckSuccess
  | LanguageCheckFail
  | ChangeLanguage
  | EnableLiveFeed
  | CheckStatus;
