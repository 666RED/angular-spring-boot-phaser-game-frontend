export const TICTACTOE_SERVICE_ENDPOINTS = {
  FIND_OPPONENT: '/tic-tac-toe',
  GET_GAME: (gameId: string) => `/tic-tac-toe/${gameId}`,
  MAKE_MOVE: '/tic-tac-toe/make-move',
  NEW_GAME: (gameId: string) => `/tic-tac-toe/${gameId}/rounds`,
  TESTING: '/tic-tac-toe/testing',
};
