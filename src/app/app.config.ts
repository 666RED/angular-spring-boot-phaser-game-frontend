import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import { UserService } from './core/services/user/user-service';
import { User } from './shared/models/user.model';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(() => {
      const http = inject(HttpClient);
      const userService = inject(UserService);

      return firstValueFrom(
        http.get('http://localhost:8080/api/v1/users').pipe(
          catchError((err) => {
            console.log(err);
            return of(null);
          }),
          tap((user: User | null) => {
            userService.user.set(user);
          }),
        ),
      );
    }),
  ],
};
