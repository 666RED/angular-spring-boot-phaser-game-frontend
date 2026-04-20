import { Component, computed, inject } from '@angular/core';
import { PhaserGame } from '../../../phaser-game.component';
import { Header } from '../../../shared/components/header/header';
import { TicTacToeService } from '../../../core/services/tic-tac-toe/tic-tac-toe.service';
import { KeyValuePipe, SlicePipe } from '@angular/common';
import { UserService } from '../../../core/services/user/user-service';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [PhaserGame, Header, SlicePipe, KeyValuePipe],
  templateUrl: './tic-tac-toe.html',
  styleUrl: './tic-tac-toe.css',
})
export class TicTacToe {
  private readonly gameService = inject(TicTacToeService);
  private readonly userService = inject(UserService);

  readonly game = this.gameService.ticTacToeGameRoom;

  readonly winRound = computed(() => this.game().winRounds[this.userService.user().id]);
  readonly loseRound = computed(() => this.getOpponentScore());
  readonly drawRound = computed(() => {
    const status = this.game().gameState.status;
    console.log(status);

    const round = this.game().round;
    const adjustment = status === 'PLAYING' ? 1 : 0;
    return round - this.winRound() - this.loseRound() - adjustment;
  });

  getOpponentScore(): number {
    const myId = this.userService.user().id;

    const entry = Object.entries(this.game().winRounds).find(([key]) => Number(key) !== myId);

    return entry ? entry[1] : 0;
  }
}
