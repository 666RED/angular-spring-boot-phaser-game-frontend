import { Injectable } from '@angular/core';
import { Task } from '../../../shared/models/task.model';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

export type ListenerCallBack = (message: Task) => void;

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private client: Client;

  connect() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/websocket'),
      reconnectDelay: 5000,
    });

    this.client.onConnect = () => {
      console.log('Connected');

      // subscribe
      this.client.subscribe('/topic/messages', (message) => {
        console.log(JSON.parse(message.body as any).data);

        console.log('Received: ' + JSON.parse(message.body));
      });
    };

    this.client.activate();
  }

  sendMessage(msg: any, destination: string) {
    this.client.publish({
      destination: `/app/${destination}`,
      body: JSON.stringify(msg),
    });
  }
}
