import * as fromActions from './layout.action';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { LanguageType } from 'src/app/shared/models';

export const MOBILE_WIDTH = 767;
export const TABLET_WIDTH = 1024;
export const LAPTOP_WIDTH = 1366;

export class LayoutState {
  userSidebarOpened: boolean;
  headerNavbarOpened: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
  isScrollDisabled: boolean;
  windowHeight: number;
  windowWidth: number;
  theme: string;
  language: LanguageType;
  loginModalOpened: boolean;
  signUpModalOpened: boolean;
  forgotModalOpened: boolean;
  verifyModalOpened: boolean;
  chatOpened: boolean;
  latestUpgradesOpened: boolean;
  newChatMessagesCount: number;
  activeUrl: string;
  isLiveFeed: boolean;
}

const initialState: LayoutState = {
  userSidebarOpened: false,
  headerNavbarOpened: false,
  isMobile: window.innerWidth <= MOBILE_WIDTH,
  isTablet: window.innerWidth > MOBILE_WIDTH && window.innerWidth <= TABLET_WIDTH,
  isLaptop: window.innerWidth > TABLET_WIDTH && window.innerWidth <= LAPTOP_WIDTH,
  isDesktop: window.innerWidth > LAPTOP_WIDTH,
  isLandscape: window.innerWidth < TABLET_WIDTH && window.innerWidth > window.innerHeight,
  isScrollDisabled: false,
  windowHeight: window.innerHeight,
  windowWidth: window.innerWidth,
  theme: 'dark',
  language: 'en',
  loginModalOpened: false,
  signUpModalOpened: false,
  forgotModalOpened: false,
  verifyModalOpened: false,
  chatOpened: false,
  latestUpgradesOpened: false,
  newChatMessagesCount: 0,
  activeUrl: '/',
  isLiveFeed: true,
};

export function layoutReducer(
  state: LayoutState = initialState,
  action: fromActions.LayoutActions
): LayoutState {
  switch (action.type) {
    case ROUTER_NAVIGATION: {
      const url: string = action['payload']['routerState']['url'];

      return {
        ...state,
        isScrollDisabled: false,
        userSidebarOpened: false,
        activeUrl: url,
      };
    }

    case fromActions.RESIZE_WINDOW: {
      const height: number = action['payload']['height'];
      const width: number = action['payload']['width'];
      const url: string = state.activeUrl;

      const isMobile = width <= MOBILE_WIDTH;
      const isTablet = width > MOBILE_WIDTH && width <= TABLET_WIDTH;
      const isLaptop = width > TABLET_WIDTH && width <= LAPTOP_WIDTH;
      const isDesktop = width > LAPTOP_WIDTH;
      const isLandscape = width < TABLET_WIDTH && width > height;

      return {
        ...state,
        windowHeight: height,
        windowWidth: width,
        isMobile,
        isTablet,
        isLaptop,
        isDesktop,
        isLandscape,
      };
    }

    case fromActions.ENABLE_LAYOUT_SCROLL: {
      return {
        ...state,
        isScrollDisabled: false,
      };
    }

    case fromActions.DISABLE_LAYOUT_SCROLL: {
      return {
        ...state,
        isScrollDisabled: true,
      };
    }

    case fromActions.ENABLE_LIVE_FEED: {
      return {
        ...state,
        isLiveFeed: action['payload'],
      };
    }

    case fromActions.OPEN_HEADER_NAVBAR: {
      return {
        ...state,
        headerNavbarOpened: true,
      };
    }

    case fromActions.CLOSE_HEADER_NAVBAR: {
      return {
        ...state,
        headerNavbarOpened: false,
      };
    }

    case fromActions.TOGGLE_HEADER_NAVBAR: {
      return {
        ...state,
        headerNavbarOpened: !state.headerNavbarOpened,
      };
    }

    case fromActions.OPEN_USER_SIDEBAR: {
      return {
        ...state,
        userSidebarOpened: true,
      };
    }

    case fromActions.CLOSE_USER_SIDEBAR: {
      return {
        ...state,
        userSidebarOpened: false,
      };
    }

    case fromActions.TOGGLE_USER_SIDEBAR: {
      return {
        ...state,
        userSidebarOpened: !state.userSidebarOpened,
      };
    }

    case fromActions.CHANGE_THEME: {
      return {
        ...state,
        theme: action['payload'],
      };
    }

    case fromActions.CHANGE_LANGUAGE: {
      return {
        ...state,
        language: action['payload'],
      };
    }

    case fromActions.OPEN_LOGIN_MODAL: {
      return {
        ...state,
        loginModalOpened: true,
      };
    }

    case fromActions.CLOSE_LOGIN_MODAL: {
      return {
        ...state,
        loginModalOpened: false,
      };
    }

    case fromActions.OPEN_SIGN_UP_MODAL: {
      return {
        ...state,
        signUpModalOpened: true,
      };
    }

    case fromActions.CLOSE_SIGN_UP_MODAL: {
      return {
        ...state,
        signUpModalOpened: false,
      };
    }

    case fromActions.OPEN_FORGOT_MODAL: {
      return {
        ...state,
        forgotModalOpened: true,
      };
    }

    case fromActions.CLOSE_FORGOT_MODAL: {
      return {
        ...state,
        forgotModalOpened: false,
      };
    }

    case fromActions.OPEN_VERIFY_MODAL: {
      return {
        ...state,
        verifyModalOpened: true,
      };
    }

    case fromActions.CLOSE_VERIFY_MODAL: {
      return {
        ...state,
        verifyModalOpened: false,
      };
    }

    case fromActions.OPEN_CHAT: {
      return {
        ...state,
        chatOpened: true,
      };
    }

    case fromActions.CLOSE_CHAT: {
      return {
        ...state,
        chatOpened: false,
      };
    }

    case fromActions.TOGGLE_CHAT: {
      return {
        ...state,
        chatOpened: !state.chatOpened,
      };
    }

    case fromActions.TOGGLE_LATEST_UPGRADES: {
      return {
        ...state,
        latestUpgradesOpened: !state.latestUpgradesOpened,
      };
    }

    case fromActions.THEME_CHECK_SUCCESS: {
      return {
        ...state,
        theme: action['payload'],
      };
    }

    case fromActions.LANGUAGE_CHECK_SUCCESS: {
      return {
        ...state,
        language: action['payload'],
      };
    }

    default:
      return state;
  }
}

export const getUserSidebarOpened: any = (state: LayoutState): boolean => state.userSidebarOpened;
export const getHeaderNavbarOpened: any = (state: LayoutState): boolean => state.headerNavbarOpened;
export const getIsMobile: any = (state: LayoutState): boolean => state.isMobile;
export const getIsTablet: any = (state: LayoutState): boolean => state.isTablet;
export const getIsLaptop: any = (state: LayoutState): boolean => state.isLaptop;
export const getIsDesktop: any = (state: LayoutState): boolean => state.isDesktop;
export const getIsScrollDisabled: any = (state: LayoutState): boolean => state.isScrollDisabled;
export const getTheme: any = (state: LayoutState): string => state.theme;
export const getLanguage: any = (state: LayoutState): LanguageType => state.language;
export const getLoginModalOpened: any = (state: LayoutState): boolean => state.loginModalOpened;
export const getSignUpModalOpened: any = (state: LayoutState): boolean => state.signUpModalOpened;
export const getForgotModalOpened: any = (state: LayoutState): boolean => state.forgotModalOpened;
export const getVerifyModalOpened: any = (state: LayoutState): boolean => state.verifyModalOpened;
export const getChatStateOpened: any = (state: LayoutState): boolean => state.chatOpened;
export const getisLiveFeed: any = (state: LayoutState): boolean => state.isLiveFeed;
export const getLatestUpgradesOpened: any = (state: LayoutState): boolean =>
  state.latestUpgradesOpened;
export const getNewChatMessagesCountState: any = (state: LayoutState): number =>
  state.newChatMessagesCount;
export const getIsLandscape: any = (state: LayoutState): boolean => state.isLandscape;
export const getWindowSize: any = (state: LayoutState): any => ({
  width: state.windowWidth,
  height: state.windowHeight,
});
export const getActiveUrl: any = (state: LayoutState): any => state.activeUrl;
