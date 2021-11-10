import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromChat from './chat.reducer';
import * as fromRoot from 'src/app/@store';
import * as fromChatReducer from '../reducer';


export const getChatState: MemoizedSelector<fromRoot.State, fromChat.ChatState> = createSelector(
  fromChatReducer.getChatFeatureState,
  (state: fromChatReducer.ChatFeatureState) => state.chat
);

export const selectChatOpened: MemoizedSelector<fromRoot.State, boolean> = createSelector(
  getChatState,
  fromChat.getChatOpenedState
);

export const selectNewMessagesCount: MemoizedSelector<fromRoot.State, number> = createSelector(
  getChatState,
  fromChat.getNewMessagesCountState
);

export const selectMessages: MemoizedSelector<fromRoot.State, any[]> = createSelector(
  getChatState,
  fromChat.getMessages
);
export const selectOnlineUsers: MemoizedSelector<fromRoot.State, number> = createSelector(
  getChatState,
  fromChat.getOnlineUsers
);
