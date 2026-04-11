export enum Winner {
  PlayerOne = 'Player One',
  PlayerTwo = 'Player Two',
  Draw = 'Draw',
  NoOne = 'No one',
}

export interface MakeMoveResponse {
  success: boolean;
  winner: Winner;
  currentPlayer: 'X' | 'O';
}
