import { CommonModule } from '@angular/common';
import { Component, inject, Injectable, OnInit, signal, viewChild } from '@angular/core';
import { EventBus } from '../game/EventBus';
import { MainMenu } from '../game/scenes/MainMenu';
import { WebsocketService } from './core/services/websocket/websocket.service';
import { WS_DESTINATIONS } from './shared/models/websocket-destinations.model';
import { RouterModule } from '@angular/router';
import { PhaserGame } from './phaser-game.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  // New way to get the component instance
  phaserRef = viewChild.required(PhaserGame);
  private readonly wsService: WebsocketService = inject(WebsocketService);

  constructor() {}

  ngOnInit(): void {
    this.wsService.connect();
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

  public addSprite() {
    const scene = this.phaserRef().scene;
    if (scene) {
      const x = Phaser.Math.Between(64, scene.scale.width - 64);
      const y = Phaser.Math.Between(64, scene.scale.height - 64);

      const star = scene.add.sprite(x, y, 'star');

      scene.add.tweenchain({
        targets: star,
        duration: 500 + Math.random() * 1000,
        alpha: 0,
        yoyo: true,
        repeat: -1,
      });
    }
  }
}
