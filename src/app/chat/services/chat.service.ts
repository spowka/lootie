import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const urlPrefix = 'assets/images/emojy';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient,
  ) {
  }

  getEmoji() {
    const emoji = [];
    for (let index = 1; index < 22; index++) {
      emoji.push({
        small: `/${urlPrefix}/${index}_18.png`,
        large: `/${urlPrefix}/${index}_36.png`,
        name: `${index}`,
      });
    }
    return emoji;
  }

  getLoadMessages(roomId: string) {
    return this.http.get(`${environment.apiUrl}/rooms/${roomId}/messages`);
  }

  muteUser(userId: string, duration: number) {
    return this.http.get(`${environment.apiUrl}/users/${userId}/block?duration=${duration}`);
  }

  removeMessage(messageId: string, roomId: string) {
    return this.http.delete(`${environment.apiUrl}/rooms/${roomId}/messages/${messageId}`);
  }
}
