import { inject, Injectable, signal } from '@angular/core';
import { MakeMoveResponse, TicTacToeGameRoom } from '../../../shared/models/tic-tac-toe.model';
import { ApiService } from '../api/api-service';
import { TICTACTOE_SERVICE_ENDPOINTS } from './tic-tac-toe-service-endpoints';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeService {
  private readonly apiService = inject(ApiService);

  readonly ticTacToeGameRoom = signal<TicTacToeGameRoom>(null);
  readonly moveUpdate$ = new Subject<MakeMoveResponse>();
  readonly newGame$ = new Subject<TicTacToeGameRoom>();

  findOpponent() {
    return this.apiService.post<string>(TICTACTOE_SERVICE_ENDPOINTS.FIND_OPPONENT, {});
  }

  getGame(gameId: string) {
    return this.apiService.get<TicTacToeGameRoom>(TICTACTOE_SERVICE_ENDPOINTS.GET_GAME(gameId));
  }

  makeMove(row: number, column: number) {
    return this.apiService.post<void>(TICTACTOE_SERVICE_ENDPOINTS.MAKE_MOVE, {
      gameId: this.ticTacToeGameRoom().id,
      row,
      column,
    });
  }

  newGame() {
    return this.apiService.post(
      TICTACTOE_SERVICE_ENDPOINTS.NEW_GAME(this.ticTacToeGameRoom().id),
      {},
    );
  }
}
