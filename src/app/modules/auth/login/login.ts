import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { form, FormField } from '@angular/forms/signals';
import { LoginData } from '../../../shared/models/auth.model';
import { AuthService } from '../../../core/services/auth/auth-service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user/user-service';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel);

  handleLogin(event: Event) {
    event.preventDefault();
    const { email, password } = this.loginModel();

    this.authService
      .login(email, password)
      .pipe(
        tap((user) => {
          if (user == null) return;

          this.userService.user.set(user);
          this.router.navigate(['/']);
        }),
      )
      .subscribe();
  }
}
