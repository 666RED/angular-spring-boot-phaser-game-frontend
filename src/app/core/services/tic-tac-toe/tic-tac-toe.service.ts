import { Injectable, signal, WritableSignal } from '@angular/core';
import { MakeMoveResponse, Winner } from '../../../shared/models/tic-tac-toe.model';

@Injectable({
  providedIn: 'root',
})
export class TicTacToeService {
  private readonly currentPlayer: WritableSignal<'X' | 'O'> = signal('X');

  private readonly board = signal([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  makeMove(row: number, column: number): MakeMoveResponse {
    if (this.board()[row][column] === '') {
      this.board()[row][column] = this.currentPlayer();
      const winner = this.checkWinner(row, column);

      // All tiles are filled
      if (!winner && this.board().every((row) => row.every((r) => r !== ''))) {
        return { success: true, winner: Winner.Draw, currentPlayer: this.currentPlayer() };
      }

      const result = {
        success: true,
        winner: winner
          ? this.currentPlayer() === 'X'
            ? Winner.PlayerOne
            : Winner.PlayerTwo
          : Winner.NoOne,
        currentPlayer: this.currentPlayer(),
      };

      this.currentPlayer.update((prev) => (prev === 'X' ? 'O' : 'X'));

      return result;
    }

    return { success: false, winner: Winner.NoOne, currentPlayer: this.currentPlayer() };
  }

  resetBoard(): void {
    this.board.set([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);

    this.currentPlayer.set('X');
  }

  private checkWinner(row: number, column: number, gridSize = 3): boolean {
    // Check horizontal
    if (this.board()[row].every((cell) => cell === this.currentPlayer())) {
      return true;
    }

    // Check vertical
    if (this.board().every((row) => row[column] === this.currentPlayer())) {
      return true;
    }

    // Check main diagonal (top left -> right bottom)
    if (row === column) {
      if (this.board().every((_, i) => this.board()[i][i] === this.currentPlayer())) {
        return true;
      }
    }

    // Check Anti-diagonal (right top -> left bottom)
    if (row + column === gridSize - 1) {
      if (
        this.board().every((_, i) => this.board()[i][gridSize - 1 - i] === this.currentPlayer())
      ) {
        return true;
      }
    }

    return null;
  }
}
