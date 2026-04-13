import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import Phaser from 'phaser';
import StartGame from '../game/main';
import { EventBus } from '../game/EventBus';
import { TicTacToeService } from './core/services/tic-tac-toe/tic-tac-toe.service';

@Component({
  selector: 'app-phaser-game',
  template: '<div id="game-container"></div>',
  standalone: true,
})
export class PhaserGame implements OnInit, OnDestroy {
  scene: Phaser.Scene;
  game: Phaser.Game;
  sceneCallback: (scene: Phaser.Scene) => void;

  private readonly ticTacToeService = inject(TicTacToeService);

  ngOnInit() {
    this.game = StartGame('game-container', this.ticTacToeService);

    EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {
      this.scene = scene;

      if (this.sceneCallback) {
        this.sceneCallback(scene);
      }
    });
  }

  ngOnDestroy() {
    if (this.game) {
      this.game.destroy(true);
    }
  }
}
