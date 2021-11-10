import { Action } from '@ngrx/store';
import { User } from '../../../auth/models/user-profile';
import { ChatMessage } from '../../models/chat-message';

export const OPEN_CHAT = '[Chat] Open chat';
export const CLOSE_CHAT = '[Chat] Close chat';
export const TOGGLE_CHAT = '[Chat] Toggle chat';

export class OpenChat implements Action {
  readonly type: string = OPEN_CHAT;
}

export class CloseChat implements Action {
  readonly type: string = CLOSE_CHAT;
}

export class ToggleChat implements Action {
  readonly type: string = TOGGLE_CHAT;
}

export const SEND_MESSAGE = '[Chat] Send message';
export const RECEIVE_MESSAGE = '[Chat] Receive message';

export class SendMessage implements Action {
  readonly type: string = SEND_MESSAGE;
  constructor(public payload: { sender: string, text: string, room: string }) { }
}

export class ReceiveMessage implements Action {
  readonly type: string = RECEIVE_MESSAGE;
  constructor(public payload: { sender: User, text: string, time: Date }) { }
}

export const LOAD_RECENT_MESSAGES = '[Chat] Load recent messages';
export const LOAD_RECENT_MESSAGES_SUCCESS = '[Chat] Load recent messages';
export const LOAD_RECENT_MESSAGES_FAIL = '[Chat] Load recent messages';

export class LoadRecentMessages implements Action {
  readonly type: string = LOAD_RECENT_MESSAGES;
  constructor(public payload: { roomId: string }) { }
}

export class LoadRecentMessagesSuccess implements Action {
  readonly type: string = LOAD_RECENT_MESSAGES_SUCCESS;
  constructor(public payload: { messages: ChatMessage[] }) { }
}

export class LoadRecentMessagesFail implements Action {
  readonly type: string = LOAD_RECENT_MESSAGES_FAIL;
  constructor(public payload: string) { }
}

export const REMOVE_MESSAGES = '[Chat] Remove messages';
export const REMOVE_MESSAGES_SUCCESS = '[Chat] Remove messages Success';
export const REMOVE_MESSAGES_FAIL = '[Chat] Remove messages Fail';
export class RemoveMessages implements Action {
  readonly type: string = REMOVE_MESSAGES;
  constructor(public payload: { messageId: string, roomId: string }) { }
}
export class RemoveMessagesSuccess implements Action {
  readonly type: string = REMOVE_MESSAGES_SUCCESS;
  constructor(public payload: string) { }
}
export class RemoveMessagesFail implements Action {
  readonly type: string = REMOVE_MESSAGES_FAIL;
  constructor(public payload: any) { }
}

export const MUTE_USER = '[Chat] Mute user';
export const MUTE_USER_SUCCESS = '[Chat] Mute user success';
export const MUTE_USER_FAIL = '[Chat] Mute user fail';

export class MuteUser implements Action {
  readonly type: string = MUTE_USER;
  constructor(public payload: { userId: string, duration: number }) { }
}

export class MuteUserSuccess implements Action {
  readonly type: string = MUTE_USER_SUCCESS;
  constructor(public payload: any) { }
}

export class MuteUserFail implements Action {
  readonly type: string = MUTE_USER_FAIL;
  constructor(public payload: any) { }
}

export const UPDATE_ONLINE_USERS = '[Chat] Update Online Users';

export class UpdateOnlineUsers implements Action {
  readonly type: string = UPDATE_ONLINE_USERS;
  constructor(public payload: string) { }
}

export type ChatAction = OpenChat
  | CloseChat
  | ToggleChat
  | SendMessage
  | ReceiveMessage
  | LoadRecentMessages
  | LoadRecentMessagesSuccess
  | LoadRecentMessagesFail
  | RemoveMessages
  | RemoveMessagesSuccess
  | RemoveMessagesFail
  | UpdateOnlineUsers
  | MuteUser
  | MuteUserSuccess
  | MuteUserFail;
