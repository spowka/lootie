import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Languages } from 'src/app/shared/models';

@Injectable()
export class SocketService {
  private host: string = environment.socket.baseUrl;
  private socket: any;

  constructor() {
    this.socket = {};
  }

  connect() {
    this.socket = io.connect(this.host, {
      query: { token: localStorage.getItem('token') },
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });
    this.socket.on('connect', () => this.connected());
    this.socket.on('disconnect', () => this.disconnected());
    this.socket.on('error', (error: string) => {
      console.log(`ERROR: "${error}" (${this.host})`);
    });
  }

  disconnect() {
    if (this.socket && this.socket.socket) { this.socket.disconnect(); }
  }

  emit(chanel, message) {
    this.socket.emit(chanel, message);
  }

  on(event_name) {
    return new Observable<any>(observer => {
      this.socket.off(event_name);
      this.socket.on(event_name, (data) => {
        observer.next(data);
      });
    });
  }

  private connected() {
    console.log('Socket Connected');
  }

  private disconnected() {
    console.log('Socket Disconnected');
  }
}
