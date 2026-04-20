export interface TicTacToeGameRoom {
  id: string;
  round: number;
  winRounds: Record<number, number>;
  gameState: TicTacToeGameState;
  playerIds: number[];
}

export interface TicTacToeGameState {
  currentBoard: string[];
  turnCount: number;
  status: TicTacToeGameStatus;
  firstTurnPlayerId: number;
  currentTurnPlayerId: number;
  winnerId: number;
  lastMoveTimestamp: number;
}

export type TicTacToeGameStatus = 'WAITING' | 'PLAYING' | 'FINISHED';

export interface MakeMoveResponse {
  status: TicTacToeGameStatus;
  currentBoard: string[];
  currentTurnPlayerId: number;
  turnCount: number;
  winnerId: number | null;
  winRounds: Record<number, number>;
}
