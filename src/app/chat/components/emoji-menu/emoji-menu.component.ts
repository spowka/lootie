import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmojyListItem } from '../../models/emojy-list-item';
import { ChatService } from '../../services/chat.service';

const urlPrefix = 'assets/images/emojy';

@Component({
  selector: 'app-emoji-menu',
  templateUrl: './emoji-menu.component.html',
  styleUrls: ['./emoji-menu.component.scss']
})
export class EmojiMenuComponent implements OnInit {

  emoji: EmojyListItem[] = [];
  @Output() select = new EventEmitter();

  constructor(private chat: ChatService) {
    this.emoji = chat.getEmoji();
  }

  click(name) {
    this.select.emit(name);
  }

  ngOnInit() {
  }

}
