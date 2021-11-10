import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChatComponent,
  SanitizeHtmlPipe,
  SetEmojyPipe,
} from './containers/chat/chat.component';

import { reducers, effects } from './@store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { EmojiMenuComponent } from './components/emoji-menu/emoji-menu.component';
import { ChatRulesComponent } from './components/chat-rules/chat-rules.component';
import { MatIconModule, MatMenuModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatMenuModule,
    StoreModule.forFeature('chat', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    ChatComponent,
    SanitizeHtmlPipe,
    SetEmojyPipe,
    EmojiMenuComponent,
    ChatRulesComponent,
  ],
  entryComponents: [ChatRulesComponent],
  exports: [ChatComponent],
})
export class ChatModule {}
