import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { modalAnimation } from 'src/app/shared/utils/animations';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import * as fromChat from 'src/app/chat/@store';
import * as fromAuth from 'src/app/auth/@store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../auth/models/user-profile';
import { EmojyListItem } from '../../models/emojy-list-item';
import { ChatService } from '../../services/chat.service';
import { ChatRulesComponent } from '../../components/chat-rules/chat-rules.component';
import { MatDialog } from '@angular/material';
import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

@Pipe({ name: 'sanitizeHtml' })
export class SanitizeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Pipe({ name: 'setEmojy' })
export class SetEmojyPipe implements PipeTransform {
  transform(text: string): string {
    return text.replace(/(emojy\/\d{1,2})/g, '<img src="/assets/images/$1_18.png" alt="$1">');
  }
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [modalAnimation]
})
export class ChatComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject();
  @ViewChild('text', { static: false }) text: ElementRef;

  isFocus = false;
  isEmojiMenu = false;

  isOpened$: Observable<boolean>;
  isMobile$: Observable<boolean>;
  isDesktop$: Observable<boolean>;
  messages$: Observable<any[]>;
  onlineUsers$: Observable<number>;
  user$: Observable<User>;

  isNoScrollMobileMode$: Observable<any>;

  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  muteOptions = [
    { duration: 5, label: '5 minutes' },
    { duration: 60, label: '1 hour' },
    { duration: 1440, label: '1 day' },
    { duration: -1, label: 'Permanent' },
  ];

  user: User;
  roomId = '5c3ee57440e88275fe841af7';
  emoji: EmojyListItem[];
  mute = { timer: null, text: '' };

  constructor(public dialog: MatDialog,
    private store: Store<fromRoot.State>,
    private chatService: ChatService,
    private _ngxZendeskWebwidgetService: NgxZendeskWebwidgetService) {

    this.isMobile$ = this.store.pipe(select(fromRoot.selectIsMobile));
    this.isDesktop$ = this.store.pipe(select(fromRoot.selectIsDesktop));
    this.isOpened$ = this.store.pipe(select(fromLayout.selectChatOpened));
    this.messages$ = this.store.pipe(select(fromChat.selectMessages));
    this.onlineUsers$ = this.store.pipe(select(fromChat.selectOnlineUsers));

    this.emoji = chatService.getEmoji();
  }

  ngOnInit() {
    this.subscribeToLayoutChanges();
    this.subscribeToUserInfo();

    this.store.dispatch(new fromChat.LoadRecentMessages({ roomId: this.roomId }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    clearInterval(this.mute.timer);
  }

  // Add noscroll to body on mobile when chat opened
  private subscribeToLayoutChanges() {
    this.isNoScrollMobileMode$ = combineLatest(this.isOpened$, this.isMobile$);

    this.isNoScrollMobileMode$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([isOpened, isMobile]: [boolean, boolean]) => {
        if (isOpened && isMobile) {
          this.store.dispatch(new fromRoot.DisableLayoutScroll());
          this._ngxZendeskWebwidgetService.zE('webWidget', 'hide');
          return;
        }
        if (!isOpened) {
          this.store.dispatch(new fromRoot.EnableLayoutScroll());
          this._ngxZendeskWebwidgetService.zE('webWidget', 'show');
        }
      });
  }

  private subscribeToUserInfo() {
    this.user$ = this.store.pipe(select(fromAuth.selectUser));

    this.user$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User) => {
        this.user = user;

        if (user && user.chatMuteInfo) {
          const { minute, timestamp } = user.chatMuteInfo;

          const mutedDate = new Date(timestamp);
          const currentDate = new Date();

          if (+currentDate - +mutedDate >= minute * 60 * 1000) {
            if (this.mute.timer) {
              clearInterval(this.mute.timer);
            }

            this.mute = { timer: null, text: '' };
            return this.store.dispatch(new fromAuth.UnmuteUser());
          }

          const remain = minute - Math.floor((+currentDate - +mutedDate) / 60000);
          if (remain === -1) {
            this.mute.text = 'You are banned';
          } else {
            this.mute.text = `You are banned for the next ${remain} minutes`;
            this.mute.timer = setInterval(() => {
              const diffMins = Math.floor((+new Date() - +mutedDate) / 60000);
              if (diffMins === minute) {
                clearInterval(this.mute.timer);
                this.mute = { timer: null, text: '' };
                return this.store.dispatch(new fromAuth.UnmuteUser());
              }
              this.mute.text = `You are banned for the next ${minute - diffMins} minutes`;
            }, 30000);
          }
        }
      });
  }

  openChat() {
    this.store.dispatch(new fromLayout.OpenChat());
  }

  closeChat() {
    this.store.dispatch(new fromLayout.CloseChat());
  }

  typing() {
    let text = this.text.nativeElement.innerHTML;
    text = text.replace(/<img[^>]*alt="([^"]*)"[^>]*>/ig, '$1');
    this.chatForm.controls.message.setValue(text);
  }

  insertEmoji(name) {
    const e: EmojyListItem = this.emoji.find((i) => i.name === name);
    this.focus();
    this.insertTextAtCursor(e);
    this.typing();
  }

  focus() {
    if (window.getSelection) {
      const child = this.text.nativeElement.childNodes;
      const sel = window.getSelection();
      if (!child.length) {
        return this.text.nativeElement.focus();
      }
      if (!this.closest(sel.focusNode, 'textarea')) {
        const range = document.createRange();
        range.setStartAfter(child[child.length - 1]);
        range.setEndAfter(child[child.length - 1]);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }

  closest(target, className) {
    if (!target.parentElement || target.parentElement === 'undefined') {
      return null;
    }
    if (target.className && target.className.indexOf(className) > -1) {
      return target.parentElement;
    }
    if (target.parentElement.className && target.parentElement.className.indexOf(className) > -1) {
      return target.parentElement;
    }
    return this.closest(target.parentElement, className);
  }

  insertTextAtCursor(e: EmojyListItem) {
    let sel, range;
    const img = document.createElement('img');
    img.src = e.small;
    img.alt = `emojy/${e.name}`;


    const old = this.saveSelection();

    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(img);
      }
    } else if (document['selection'] && document['selection'].createRange) {
      document['selection'].createRange().text = img;
    }

    this.restoreSelection(old, img);
  }

  saveSelection() {
    let sel;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0);
      }
    } else if (document['selection'] && document['selection'].createRange) {
      return document['selection'].createRange();
    }
    return null;
  }

  restoreSelection(range, img) {
    let sel;
    if (range) {
      if (window.getSelection) {
        sel = window.getSelection();
        sel.removeAllRanges();
        range.setStartAfter(img);
        range.setEndAfter(img);
        sel.addRange(range);
      } else if (document['selection'] && range.select) {
        range.select();
      }
    }
  }

  sendMessage(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    const message = this.chatForm.get('message').value;

    if (!message || message.trim() === '') {
      return;
    }

    this.store.dispatch(new fromChat.SendMessage({
      sender: this.user._id,
      text: message,
      room: this.roomId
    }));

    this.chatForm.reset();
    this.text.nativeElement.innerHTML = '';
  }

  removeMessage(messageId: string) {
    if (!this.user || this.user && this.user.type !== 'ADMIN') {
      return;
    }

    this.store.dispatch(new fromChat.RemoveMessages({
      messageId,
      roomId: this.roomId,
    }));
  }

  muteUser(userId: string, duration: number) {
    this.store.dispatch(new fromChat.MuteUser({ userId, duration }));
  }

  chatRules() {
    ChatRulesComponent.show(this.dialog);
  }

}
