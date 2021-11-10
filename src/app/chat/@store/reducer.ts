import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';

import * as chatReducer from './chat/chat.reducer';

export interface ChatFeatureState {
    chat: chatReducer.ChatState;
}

export const reducers: ActionReducerMap<ChatFeatureState> = {
    chat: chatReducer.chatReducer
};

export const getChatFeatureState: any = createFeatureSelector('chat');
