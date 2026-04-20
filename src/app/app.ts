import { Component, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PhaserGame } from './phaser-game.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, PhaserGame, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // New way to get the component instance
  phaserRef = viewChild.required(PhaserGame);

  constructor() {
    /* empty */
  }

  // send() {
  //   this.wsService.sendMessage({ text: 'hello world' }, WS_DESTINATIONS.JOIN_GAME);
  // }

  // public changeScene() {
  //   const scene = this.phaserRef().scene as MainMenu;
  //   if (scene) {
  //     scene.changeScene();
  //   }
  // }
  //
  // public moveSprite() {
  //   const scene = this.phaserRef().scene as MainMenu;
  //   if (scene) {
  //     scene.moveLogo(({ x, y }) => {
  //       this.spritePosition = { x, y };
  //     });
  //   }
  // }
}
