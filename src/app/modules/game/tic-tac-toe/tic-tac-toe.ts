import { Component } from '@angular/core';
import { PhaserGame } from '../../../phaser-game.component';
import { Header } from '../../../shared/components/header/header';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [PhaserGame, Header],
  templateUrl: './tic-tac-toe.html',
  styleUrl: './tic-tac-toe.css',
})
export class TicTacToe {}
