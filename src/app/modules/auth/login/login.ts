import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { LoginData } from '../../../shared/models/auth.model';
import { AuthService } from '../../../core/services/auth/auth-service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user/user-service';
import { MatListModule } from '@angular/material/list';
import { WebsocketService } from '../../../core/services/websocket/websocket.service';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormField, MatListModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly wsServcie = inject(WebsocketService);

  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, {
      message: 'Email is required',
    });

    email(schemaPath.email, {
      message: 'Invalid email',
    });

    required(schemaPath.password, {
      message: 'Password is required',
    });
    minLength(schemaPath.password, 8, {
      message: 'Password length must greater than 8',
    });
  });

  handleLogin(event: Event) {
    event.preventDefault();
    const { email, password } = this.loginModel();

    this.authService
      .login(email, password)
      .pipe(
        tap((user) => {
          if (user == null) return;

          this.wsServcie.connect();
          this.userService.user.set(user);
          this.router.navigate(['/']);
        }),
      )
      .subscribe();
  }
}
