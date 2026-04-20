import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api-service';
import { User } from '../../../shared/models/user.model';
import { AUTH_SERVICE_ENDPOINTS } from './auth-service-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiService = inject(ApiService);

  login(email: string, password: string) {
    return this.apiService.post<User>(AUTH_SERVICE_ENDPOINTS.LOGIN, {
      email,
      password,
    });
  }

  register(name: string, email: string, password: string) {
    return this.apiService.post<User>(AUTH_SERVICE_ENDPOINTS.REGISTER, {
      name,
      email,
      password,
    });
  }

  logout() {
    return this.apiService.post<void>(AUTH_SERVICE_ENDPOINTS.LOGOUT, {});
  }
}
