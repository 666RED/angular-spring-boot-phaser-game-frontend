import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Header } from '../../../shared/components/header/header';
import { TicTacToeService } from '../../../core/services/tic-tac-toe/tic-tac-toe.service';

@Component({
  selector: 'app-lobby-landing',
  imports: [MatButtonModule, Header],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  private readonly gameService = inject(TicTacToeService);

  handleFindOpponent(event: Event) {
    event.preventDefault();

    this.gameService.findOpponent().subscribe();
  }
}
