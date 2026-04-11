import { Injectable, signal } from '@angular/core';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly user = signal<null | User>(null);
}
