import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { PasswordRecovery } from './password-recovery/password-recovery';
import { Landing } from './landing/landing';

export const routes: Routes = [
  {
    path: '',
    component: Landing,
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
      {
        path: 'password-recovery',
        component: PasswordRecovery,
      },
    ],
  },
];
