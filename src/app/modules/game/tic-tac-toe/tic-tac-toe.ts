import { Component } from '@angular/core';
import { PhaserGame } from '../phaser-game.component';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [PhaserGame],
  templateUrl: './tic-tac-toe.html',
  styleUrl: './tic-tac-toe.scss',
})
export class TicTacToe {}
