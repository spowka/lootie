import * as fromActions from './chat.action';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { ChatMessage } from '../../models/chat-message';
import { State } from '@ngrx/store';

export class ChatState {
  messages: ChatMessage[];
  opened: boolean;
  newMessagesCount: number;
  onlineUsers: number;
  loading: boolean;
  loaded: boolean;
  error: string;
}

const initialState: ChatState = {
  messages: [],
  opened: false,
  newMessagesCount: 0,
  onlineUsers: 0,
  loading: false,
  loaded: false,
  error: null,
};

export function chatReducer(
  state: ChatState = initialState,
  action: fromActions.ChatAction
): ChatState {
  switch (action.type) {

    case ROUTER_NAVIGATION: {
      return {
        ...state,
        opened: false
      };
    }

    case fromActions.OPEN_CHAT: {
      return {
        ...state,
        opened: true
      };
    }
    case fromActions.CLOSE_CHAT: {
      return {
        ...state,
        opened: false
      };
    }
    case fromActions.TOGGLE_CHAT: {
      return {
        ...state,
        opened: !state.opened
      };
    }

    // case fromActions.LOAD_RECENT_MESSAGES: {
    //     return {
    //         ...state,
    //         loading: true,
    //         loaded: false
    //     };
    // }
    //
    // case fromActions.LOAD_RECENT_MESSAGES_FAIL: {
    //     return {
    //         ...state,
    //         loading: false,
    //         loaded: true,
    //         error: action['payload']
    //     };
    // }

    case fromActions.LOAD_RECENT_MESSAGES_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        messages: action['payload'].messages || [],
        error: ''
      };
    }

    case fromActions.REMOVE_MESSAGES: {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }

    case fromActions.REMOVE_MESSAGES_SUCCESS: {
      return {
        ...state,
        messages: state.messages.filter(message => message._id !== action['payload']),
        loaded: true,
        loading: false,
      };
    }

    case fromActions.REMOVE_MESSAGES_FAIL: {
      return {
        ...state,
        error: action['payload'],
        loaded: true,
        loading: false,
      };
    }

    case fromActions.RECEIVE_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action['payload']]
      };
    }

    case fromActions.UPDATE_ONLINE_USERS: {
      return {
        ...state,
        onlineUsers: action['payload'],
      };
    }

    default: {
      return state;
    }
  }
}

// export const getChatState: any = (state: ChatState): ChatState => state;

export const getChatOpenedState: any = (state: ChatState): boolean => state.opened;
export const getNewMessagesCountState: any = (state: ChatState): number => state.newMessagesCount;
export const getMessages: any = (state: ChatState): any[] => state.messages;
export const getOnlineUsers: any = (state: ChatState): number => state.onlineUsers;
