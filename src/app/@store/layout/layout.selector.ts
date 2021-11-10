import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromRoot from '../reducer';
import * as fromLayout from './layout.reducer';

import { LanguageType } from 'src/app/shared/models';

export const selectUserSidebarOpened: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getUserSidebarOpened
);

export const selectHeaderNavbarOpened: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getHeaderNavbarOpened
);

export const selectIsMobile: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getIsMobile
);

export const selectIsTablet: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getIsTablet
);

export const selectIsLaptop: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getIsLaptop
);

export const selectIsDesktop: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getIsDesktop
);

export const selectIsLandscape: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getIsLandscape
);

export const selectIsScrollDisabled: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getIsScrollDisabled
);

export const selectTheme: MemoizedSelector<fromRoot.State, string> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getTheme
);

export const selectLanguage: MemoizedSelector<fromRoot.State, LanguageType> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getLanguage
);

export const selectLoginModalOpened: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getLoginModalOpened
);

export const selectForgotModalOpened: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getForgotModalOpened
);

export const selectSignUpModalOpened: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getSignUpModalOpened
);

export const selectVerifyModalOpened: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getVerifyModalOpened
);

export const selectChatOpened: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getChatStateOpened
);

export const selectLatestUpgradesOpened: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getLatestUpgradesOpened
);

export const selectNewChatMessagesCount: MemoizedSelector<fromRoot.State, number> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getNewChatMessagesCountState
);

export const selectWindowSize: MemoizedSelector<fromRoot.State, any> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getWindowSize
);

export const selectgetActiveUrl: MemoizedSelector<fromRoot.State, any> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getActiveUrl
);

export const selectIsLiveFeed: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  (state: fromRoot.State) => state.layout,
  fromLayout.getisLiveFeed
);
