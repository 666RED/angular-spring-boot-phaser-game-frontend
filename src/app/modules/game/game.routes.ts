import { Routes } from '@angular/router';
import { TicTacToe } from './tic-tac-toe/tic-tac-toe';
import { ticTacToeGuard } from '../../core/guards/tic-tac-toe-guard/tic-tac-toe-guard';

export const routes: Routes = [
  {
    path: 'tic-tac-toe/:id',
    canActivate: [ticTacToeGuard],
    component: TicTacToe,
  },
];
