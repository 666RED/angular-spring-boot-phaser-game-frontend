import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { TicTacToeService } from '../../services/tic-tac-toe/tic-tac-toe.service';

export const ticTacToeGuard: CanActivateFn = (route, _) => {
  const ticTacToeService = inject(TicTacToeService);
  const router = inject(Router);

  const gameId = route.paramMap.get('id');
  if (!gameId) {
    return of(router.createUrlTree(['/'])); // return to lobby
  }

  return ticTacToeService.getGame(gameId).pipe(
    tap((data) => {
      if (data) {
        ticTacToeService.ticTacToeGameRoom.set(data);
      }
    }),
    map((game) => (game ? true : router.createUrlTree(['/']))),
    catchError(() => of(router.createUrlTree(['/']))),
  );
};
