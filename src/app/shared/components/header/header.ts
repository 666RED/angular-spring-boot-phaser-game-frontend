import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../core/services/auth/auth-service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatFormFieldModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  handleLogout(event: Event) {
    event.preventDefault();

    this.authService
      .logout()
      .pipe(
        tap(() => {
          this.router.navigate(['/auth/login']);
        }),
      )
      .subscribe();
  }
}
