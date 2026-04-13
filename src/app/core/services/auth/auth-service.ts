import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api-service';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiService = inject(ApiService);

  login(email: string, password: string) {
    return this.apiService.post<User>('/auth/login', {
      email,
      password,
    });
  }

  register(name: string, email: string, password: string) {
    return this.apiService.post<User>('/auth/register', {
      name,
      email,
      password,
    });
  }

  logout() {
    return this.apiService.post<void>('/auth/logout', {});
  }
}
