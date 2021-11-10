import { Component, OnInit } from '@angular/core';


import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromLayout from 'src/app/@store/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-toggler',
  templateUrl: './chat-toggler.component.html',
  styleUrls: ['./chat-toggler.component.scss']
})
export class ChatTogglerComponent implements OnInit {

  newMessagesCount$: Observable<number>;
  isMobile$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.isMobile$ = this.store.pipe(select(fromRoot.selectIsMobile));
    this.newMessagesCount$ = this.store.pipe(select(fromLayout.selectNewChatMessagesCount));
  }

  ngOnInit() {
  }

  toggleChat() {
    this.store.dispatch(new fromLayout.ToggleChat());
  }

}
