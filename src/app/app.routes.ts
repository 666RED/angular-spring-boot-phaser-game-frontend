import { Routes } from '@angular/router';
import { NotFound } from './shared/components/not-found/not-found';
import { authGuard } from './core/guards/auth-guard/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/lobby/lobby.routes').then((m) => m.routes),
    // component: TicTacToe,'./modules/lobby/lobby.routes.ts').then((m) => m.routes),
  },
  {
    path: '**',
    component: NotFound,
  },
];
