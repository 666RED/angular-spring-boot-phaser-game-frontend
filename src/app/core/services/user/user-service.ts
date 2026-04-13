import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { ApiService } from '../api/api-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiService = inject(ApiService);
  readonly user = signal<null | User>(null);

  getUser() {
    return this.apiService.get<User>('/users/me', { observe: 'body', withCredentials: true });
  }
}
