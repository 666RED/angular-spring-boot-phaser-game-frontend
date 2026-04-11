import { GameObjects, Scene } from 'phaser';
import { SceneKeys } from '../game-scenes';
import { TicTacToeService } from '../../app/core/services/tic-tac-toe/tic-tac-toe.service';
import { Winner } from '../../app/shared/models/tic-tac-toe.model';

export class TicTacToeGameBoard extends Scene {
  background: GameObjects.Image;
  tiles: GameObjects.Rectangle[] = [];
  resetButton: GameObjects.Container;
  isGameOver: boolean = false;
  tileGraphics: Phaser.GameObjects.Graphics;
  ticTacToeService: TicTacToeService;

  private static TILE_SIZE = 90;
  private static GAP = 10;
  private static START_X = 190; // Starting X coordinate
  private static START_Y = 190; // Starting Y coordinate

  init(data: { service: TicTacToeService }) {
    this.ticTacToeService = data.service;
  }

  constructor() {
    super(SceneKeys.TicTacToeGameBoard);
  }

  create() {
    this.drawBoard();

    this.tileGraphics = this.add.graphics();
    this.tileGraphics.lineStyle(4, 0xffff00, 1);

    this.createResetButton();
  }

  handleTileClick(row: number, column: number, tile: Phaser.GameObjects.Rectangle) {
    const result = this.ticTacToeService.makeMove(row, column);

    const { success, winner, currentPlayer } = result;

    if (!success) {
      console.log('tile has been taken');
      return;
    }

    const startX = TicTacToeGameBoard.START_X;
    const startY = TicTacToeGameBoard.START_Y;
    const gap = TicTacToeGameBoard.GAP;
    const tileSize = TicTacToeGameBoard.TILE_SIZE;
    const padding = 10;

    if (currentPlayer === 'O') {
      // for circle
      const centerX = startX + column * (tileSize + gap);
      const centerY = startY + row * (tileSize + gap);
      const radius = tileSize / 2 - 10;
      this.tileGraphics.strokeCircle(centerX, centerY, radius);
    } else {
      // for X
      const left = tile.x - tileSize / 2 + padding;
      const right = tile.x + tileSize / 2 - padding;
      const top = tile.y - tileSize / 2 + padding;
      const bottom = tile.y + tileSize / 2 - padding;

      this.tileGraphics.lineBetween(left, top, right, bottom);
      this.tileGraphics.lineBetween(right, top, left, bottom);
    }

    if (winner === Winner.Draw) {
      console.log('Draw');
      this.resetButton.setVisible(true);
      this.isGameOver = true;
    } else if (winner !== Winner.NoOne) {
      console.log(`Winner is ${winner} `);
      this.resetButton.setVisible(true);
      this.isGameOver = true;
    }
  }

  drawBoard() {
    const startX = TicTacToeGameBoard.START_X;
    const startY = TicTacToeGameBoard.START_Y;
    const gap = TicTacToeGameBoard.GAP;
    const tileSize = TicTacToeGameBoard.TILE_SIZE;

    const graphics = this.add.graphics();
    graphics.lineStyle(10, 0xffff66);

    // Vertical lines
    graphics.lineBetween(240, 145, 240, 435);
    graphics.lineBetween(340, 145, 340, 435);

    // Horizontal lines
    graphics.lineBetween(145, 240, 435, 240);
    graphics.lineBetween(145, 340, 435, 340);

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const x = startX + col * (tileSize + gap);
        const y = startY + row * (tileSize + gap);

        const tile = this.add.rectangle(x, y, tileSize, tileSize, 0x333333);
        tile.setInteractive({ useHandCursor: true });

        tile.on('pointerdown', () => {
          if (this.isGameOver) return;

          this.handleTileClick(row, col, tile);
        });

        this.tiles.push(tile);
      }
    }
  }

  createResetButton() {
    const BUTTON_WIDTH = 150;
    const BUTTON_HEIGHT = 30;

    const button = this.add.rectangle(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT, 0x123456, 1);
    const label = this.add
      .text(0, 0, 'Play again', {
        fontSize: '16px',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5);

    this.resetButton = this.add
      .container(300, 500, [button, label])
      .setSize(BUTTON_WIDTH, BUTTON_HEIGHT)
      .setInteractive()
      .setVisible(false)
      .on('pointerdown', () => {
        this.resetBoard();
      });
  }

  resetBoard() {
    this.ticTacToeService.resetBoard();

    this.isGameOver = false;
    this.tileGraphics.clear();
    this.tileGraphics.lineStyle(4, 0xffff00, 1);
    this.resetButton.setVisible(false);
  }

  preload() {}
}
