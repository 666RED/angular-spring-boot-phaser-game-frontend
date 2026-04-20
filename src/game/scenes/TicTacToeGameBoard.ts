import { GameObjects, Scene } from 'phaser';
import { SceneKeys } from '../game-scenes';
import { TicTacToeService } from '../../app/core/services/tic-tac-toe/tic-tac-toe.service';
import { MakeMoveResponse } from '../../app/shared/models/tic-tac-toe.model';
import { UserService } from '../../app/core/services/user/user-service';
import { Subscription } from 'rxjs';

export class TicTacToeGameBoard extends Scene {
  background: GameObjects.Image;
  tiles: GameObjects.Rectangle[] = [];
  newGameButton: GameObjects.Container;
  yourTurnText: GameObjects.Text;
  resultText: GameObjects.Text;
  isGameOver = false;
  tileGraphics: Phaser.GameObjects.Graphics;
  ticTacToeService: TicTacToeService;
  userService: UserService;

  private static TILE_SIZE = 90;
  private static GAP = 10;
  private static START_X = 190; // Starting X coordinate
  private static START_Y = 190; // Starting Y coordinate

  private moveSubscription: Subscription;
  private newGameSubscription: Subscription;

  constructor() {
    super(SceneKeys.TicTacToeGameBoard);
  }

  init(data: { ticTacToeService: TicTacToeService; userService: UserService }) {
    this.ticTacToeService = data.ticTacToeService;
    this.userService = data.userService;
  }

  create() {
    // note: handle the realtime logic here (from websocket)
    this.moveSubscription = this.ticTacToeService.moveUpdate$.subscribe((data) => {
      this.applyBoardState(data);

      this.yourTurnText.setVisible(data.currentTurnPlayerId === this.userService.user().id);

      this.handleWinner(data.winnerId);
    });

    this.newGameSubscription = this.ticTacToeService.newGame$.subscribe((data) => {
      this.resetBoard();
    });

    this.createAllObjects();

    this.tileGraphics = this.add.graphics();
    this.tileGraphics.lineStyle(4, 0xffff00, 1);

    const gameState = this.ticTacToeService.ticTacToeGameRoom().gameState;
    const currentBoard = gameState.currentBoard;

    // on going game (some tiles already been taken)
    if (currentBoard.some((tile) => tile !== '')) {
      currentBoard.forEach((value, index) => {
        if (!value) return;

        const row = Math.floor(index / 3);
        const column = index % 3;

        const tile = this.getTile(row, column);
        this.drawSymbol(column, row, tile, value);
      });
    }

    // game is waiting
    if (gameState.status === 'WAITING') {
      this.newGameButton.setVisible(true);
    }
  }

  preload() {
    /* empty */
  }

  shutdown() {
    this.moveSubscription.unsubscribe();
    this.newGameSubscription.unsubscribe();
  }

  // note: SERVICES
  private handleTileClick(row: number, column: number) {
    this.ticTacToeService.makeMove(row, column).subscribe();
  }

  private startNewGame() {
    this.ticTacToeService.newGame().subscribe();
  }

  // note: CREATE OBJECTS
  createAllObjects() {
    this.drawBoard();
    this.createResultText();
    this.createYourTurnText();
    this.createNewGameButton();
  }

  private createNewGameButton() {
    const BUTTON_WIDTH = 150;
    const BUTTON_HEIGHT = 30;

    const button = this.add.rectangle(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT, 0x123456, 1);
    const label = this.add
      .text(0, 0, 'Play again', {
        fontSize: '16px',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5);

    this.newGameButton = this.add
      .container(300, 500, [button, label])
      .setSize(BUTTON_WIDTH, BUTTON_HEIGHT)
      .setInteractive()
      .setVisible(false)
      .on('pointerdown', () => {
        this.startNewGame();
      });
  }

  private createYourTurnText() {
    const text = `Your turn (${this.ticTacToeService.ticTacToeGameRoom().gameState.firstTurnPlayerId === this.userService.user().id ? 'O' : 'X'})`;

    this.yourTurnText = this.add
      .text(this.scale.width / 2, 70, text, {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: '32px',
      })
      .setOrigin(0.5);

    this.yourTurnText.setVisible(
      this.ticTacToeService.ticTacToeGameRoom().gameState.status === 'PLAYING' &&
        this.ticTacToeService.ticTacToeGameRoom().gameState.currentTurnPlayerId ===
          this.userService.user().id,
    );
  }

  private createResultText() {
    this.resultText = this.add
      .text(this.scale.width / 2, 70, '', {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: '32px',
      })
      .setOrigin(0.5)
      .setVisible(false);

    const gameState = this.ticTacToeService.ticTacToeGameRoom().gameState;

    if (gameState.status !== 'PLAYING') {
      this.resultText.setVisible(true);
      this.setResultText(gameState.winnerId);
    }
  }

  private drawBoard() {
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

        tile.setData('row', row);
        tile.setData('column', col);

        tile.on('pointerdown', () => {
          if (this.isGameOver) return;

          this.handleTileClick(row, col);
        });

        this.tiles.push(tile);
      }
    }
  }

  private drawSymbol(column: number, row: number, tile: GameObjects.Rectangle, value: string) {
    const startX = TicTacToeGameBoard.START_X;
    const startY = TicTacToeGameBoard.START_Y;
    const gap = TicTacToeGameBoard.GAP;
    const tileSize = TicTacToeGameBoard.TILE_SIZE;
    const padding = 10;
    const game = this.ticTacToeService.ticTacToeGameRoom;
    const gameState = game().gameState;
    const firstTurnPlayerId = gameState.firstTurnPlayerId;

    // even number is O, odd number is X
    if (value === firstTurnPlayerId.toString()) {
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
  }

  // note: UPDATE OBJECT
  private setResultText(winnerId: number) {
    if (winnerId !== null) {
      if (winnerId === this.userService.user().id) {
        this.resultText.setText('You win');
      } else {
        this.resultText.setText('You lose');
      }
    } else {
      this.resultText.setText('Draw');
    }
  }

  private resetBoard() {
    this.tileGraphics.clear();
    this.tileGraphics.lineStyle(4, 0xffff00, 1);

    this.isGameOver = false;

    this.newGameButton.setVisible(false);
    this.yourTurnText.setVisible(
      this.ticTacToeService.ticTacToeGameRoom().gameState.currentTurnPlayerId ===
        this.userService.user().id,
    );
    this.resultText.setVisible(false);
  }

  private applyBoardState(data: MakeMoveResponse) {
    data.currentBoard.forEach((value, index) => {
      if (!value) return;

      const row = Math.floor(index / 3);
      const column = index % 3;
      const tile = this.getTile(row, column);

      this.drawSymbol(column, row, tile, value);
    });
  }

  // note: HELPER FUNCTIONS
  private getTile(row: number, column: number) {
    return this.tiles.find((t) => t.getData('row') === row && t.getData('column') === column);
  }

  private handleWinner(winner: number) {
    const currentBoard = this.ticTacToeService.ticTacToeGameRoom().gameState.currentBoard;

    if (winner === null && currentBoard.some((tile) => tile === '')) return;

    this.setResultText(winner);

    this.isGameOver = true;
    this.newGameButton.setVisible(true);
    this.yourTurnText.setVisible(false);
    this.resultText.setVisible(true);
  }
}
