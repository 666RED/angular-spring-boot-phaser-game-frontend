import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { ApiService } from '../api/api-service';
import { USER_SERVICE_ENDPOINTS } from './user-service-endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiService = inject(ApiService);
  readonly user = signal<null | User>(null);

  getUser() {
    return this.apiService.get<User>(USER_SERVICE_ENDPOINTS.GET_ME, {
      observe: 'body',
      withCredentials: true,
    });
  }
}
