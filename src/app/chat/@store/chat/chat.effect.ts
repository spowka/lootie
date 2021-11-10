import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from './chat.action';

import { SocketService } from 'src/app/core/socket/services/socket.service';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message';

@Injectable()
export class ChatEffects {

  constructor(
    private actions$: Actions,
    private socketService: SocketService,
    private chatService: ChatService,
    private toast: ToastrService,
  ) {
  }

  @Effect({ dispatch: false })
  sendMessage$ = this.actions$
    .pipe(
      ofType(fromActions.SEND_MESSAGE),
      tap(action => {
        this.socketService.emit('messages', { ...(action['payload'] as any) });
      })
    );

  @Effect({ dispatch: true })
  getRecentMessages$: Observable<fromActions.LoadRecentMessagesSuccess | fromActions.LoadRecentMessagesFail> = this.actions$
    .pipe(
      ofType(fromActions.LOAD_RECENT_MESSAGES),
      exhaustMap(action => {
        const { roomId } = action['payload'] as any;
        return this.chatService.getLoadMessages(roomId).pipe(
          map((res: ChatMessage[]) => {
            return new fromActions.LoadRecentMessagesSuccess({ messages: res['data'] });
          }),

          catchError((error: Error) => {
            return of(new fromActions.LoadRecentMessagesFail(error.message));
          })
        );
      })
    );

  @Effect()
  muteUser$: Observable<fromActions.MuteUser | fromActions.MuteUserFail> = this.actions$
    .pipe(
      ofType(fromActions.MUTE_USER),
      exhaustMap(action => {
        const { userId, duration } = action['payload'];

        return this.chatService.muteUser(userId, duration).pipe(
          map((res) => {
            this.toast.success('User succesfully muted');
            return new fromActions.MuteUserSuccess(res);
          }),

          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromActions.MuteUserFail(res));
          })
        );
      })
    );

  @Effect()
  removeMessage$: Observable<fromActions.RemoveMessagesSuccess | fromActions.RemoveMessagesFail> = this.actions$
    .pipe(
      ofType(fromActions.REMOVE_MESSAGES),
      exhaustMap(action => {
        const { messageId, roomId } = action['payload'];

        return this.chatService.removeMessage(messageId, roomId).pipe(
          map((res) => {
            return new fromActions.RemoveMessagesSuccess(messageId);
          }),

          catchError((res: Error) => {
            const error = res['error'];
            this.toast.error(error && error.message ? error.message : 'Something went wrong');
            return of(new fromActions.RemoveMessagesFail(res));
          })
        );
      })
    );
}
