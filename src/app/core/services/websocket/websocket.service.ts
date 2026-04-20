import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../../../shared/models/task.model';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { Router } from '@angular/router';
import { WS_CHANNELS } from '../../../shared/models/websocket.model';
import {
  MakeMoveResponse,
  TicTacToeGameRoom,
  TicTacToeGameState,
  TicTacToeGameStatus,
} from '../../../shared/models/tic-tac-toe.model';
import { TicTacToeService } from '../tic-tac-toe/tic-tac-toe.service';

export type ListenerCallBack = (message: Task) => void;

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private client: Client;
  private readonly router = inject(Router);
  private connected = signal(false);
  private ticTacToeService = inject(TicTacToeService);

  connect() {
    if (this.connected() || this.client) return;

    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/websocket'),
      reconnectDelay: 5000,
      onConnect: (data) => {
        this.connected.set(true);
        console.log('Connected:', data);
        this.registerSubscriptions();
      },
      onDisconnect: () => {
        this.connected.set(false);
        console.log('Disconnected');
      },
      onStompError: (frame) => {
        console.log('STOMP error: ', frame);
      },
    });

    this.client.activate();
  }

  private registerSubscriptions() {
    this.client.subscribe(WS_CHANNELS.USER_MATCH, (message) => {
      const gameId: string = JSON.parse(message.body);

      if (!gameId) return;

      this.router.navigate([`/games/tic-tac-toe/${gameId}`]);
    });

    this.client.subscribe(WS_CHANNELS.USER_MOVE, (message) => {
      const data: MakeMoveResponse = JSON.parse(message.body);

      const { currentBoard, currentTurnPlayerId, turnCount } = data;
      const room = this.ticTacToeService.ticTacToeGameRoom();

      let winnerId: number = room.gameState.winnerId;
      let winRounds: Record<number, number> = room.winRounds;
      let status: TicTacToeGameStatus = room.gameState.status;

      if (data.winnerId !== null) {
        winnerId = data.winnerId;
      }

      if (data.winRounds !== null) {
        winRounds = data.winRounds;
      }

      if (data.status !== null) {
        status = data.status;
      }

      this.ticTacToeService.ticTacToeGameRoom.update((prev) => ({
        ...prev,
        winRounds,
        gameState: {
          ...prev.gameState,
          status,
          currentTurnPlayerId,
          turnCount,
          winnerId,
          currentBoard,
        },
      }));

      this.ticTacToeService.moveUpdate$.next(data);
    });

    this.client.subscribe(WS_CHANNELS.USER_NEW_GAME, (message) => {
      const data: TicTacToeGameRoom = JSON.parse(message.body);

      this.ticTacToeService.ticTacToeGameRoom.set(data);

      this.ticTacToeService.newGame$.next(data);
    });
  }

  sendMessage(msg: any, destination: string) {
    this.client.publish({
      destination: `/app/${destination}`,
      body: JSON.stringify(msg),
    });
  }
}
