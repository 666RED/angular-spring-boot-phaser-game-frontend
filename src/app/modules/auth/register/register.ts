import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RegisterData } from '../../../shared/models/auth.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/services/auth/auth-service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [FormField, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly authService = inject(AuthService);

  registerModel = signal<RegisterData>({
    name: '',
    email: '',
    password: '',
  });

  registerForm = form(this.registerModel);

  handleRegister(event: Event) {
    event.preventDefault();
    const { name, email, password } = this.registerModel();

    this.authService
      .register(name, email, password)
      .pipe(tap((data) => console.log(data)))
      .subscribe();
  }
}
