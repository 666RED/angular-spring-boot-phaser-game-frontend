import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthHeader } from '../components/auth-header/auth-header';

@Component({
  selector: 'app-landing',
  imports: [RouterOutlet, AuthHeader ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {}
