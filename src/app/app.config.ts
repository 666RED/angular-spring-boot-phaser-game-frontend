import {
  ApplicationConfig,
  ErrorHandler,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import { UserService } from './core/services/user/user-service';
import { User } from './shared/models/user.model';
import { credentialsInterceptor } from './core/interceptors/credentials-interceptor/credentials-interceptor';
import { WebsocketService } from './core/services/websocket/websocket.service';
import { GlobalErrorHandler } from './core/handlers/global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([credentialsInterceptor])),
    provideAppInitializer(() => {
      const userService = inject(UserService);
      const wsService = inject(WebsocketService);

      return firstValueFrom(
        userService.getUser().pipe(
          catchError(() => of(null)),
          tap((user: User | null) => {
            if (!user) return;

            userService.user.set(user);
            wsService.connect();
          }),
        ),
      );
    }),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
};
