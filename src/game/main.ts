import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { TicTacToeGameBoard } from './scenes/TicTacToeGameBoard';
import { SceneKeys } from './game-scenes';
import { TicTacToeService } from '../app/core/services/tic-tac-toe/tic-tac-toe.service';
import { UserService } from '../app/core/services/user/user-service';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 600,
  height: 600,
  backgroundColor: '#028af8',
  scene: [Boot, Preloader, MainMenu, MainGame, GameOver, TicTacToeGameBoard],
};

const StartGame = (
  parent: string,
  ticTacToeService: TicTacToeService,
  userService: UserService,
) => {
  return new Game({
    ...config,
    parent,
    callbacks: {
      postBoot: (game) => {
        game.scene.start(SceneKeys.TicTacToeGameBoard, { ticTacToeService, userService });
      },
    },
  });
};

export default StartGame;
